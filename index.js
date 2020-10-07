var express=require("express"),
    app=express(),
    socket=require("socket.io"),
	bodyParser=require('body-parser'),
	User=require('./models/user'),
	methodOverride=require('method-override'),
	mongoose=require('mongoose'),
	passport=require('passport'),
	LocalStrategy=require('passport-local'),
	passportLocalMongoose=require('passport-local-mongoose'),
	jsdom=require('jsdom-global')();

		mongoose.connect('mongodb+srv://bobweb:<loptata1>@cluster0.4lxii.mongodb.net/<sliki>?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true});

	//mongoose.connect('mongodb://localhost/chat',{useNewUrlParser:true, useUnifiedTopology: true});
app.use(require('express-session')({
	secret:'tirilimbambam',

	resave: false,
	saveUninitialized: false
}))

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));

app.use(function(req,res,next){
	res.locals.currentUser=req.user;

	next();
});


var contentSchema=new mongoose.Schema({
	name: String,
	img: String,
	body: String,
	category: String,
	createdAt: {type: Date, default: Date.now}
});
var Content=mongoose.model('Content',contentSchema);

var chatSchema=new mongoose.Schema({
	name: String,
	message: String
});
var Chat=mongoose.model('Chat',chatSchema);




isLoggedIn=function (req,res,next){

	if(req.isAuthenticated()){
		return next();
	}
		
};




function escapeRegExp(string) {
	return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  };

server=app.listen(9000,function(){
	console.log("server started");
});

app.get('/',function(req,res){
	


	var noMatch='';
	var query=req.query.search;
    

	if(query){
		const regex=new RegExp(escapeRegExp(query),'gi');
		Content.find({name:regex},function(err,allContent){
			if(err){
				console.log(err);
			}else{
				
				if(allContent.length < 1){
                   noMatch='SORRY';
				}
				res.render('content_page',{contents: allContent,noMatch: noMatch});
			}
		})
	}else{
	
	Content.find({},function(err,allContent){
		if(err){
			console.log(err);
		}else{
			res.render('landing',{contents: allContent,noMatch: noMatch,currentUser:req.user});
		}
	});
		
     
	}
	
	
});

app.get('/about',function(req,res){
	res.render('about');
});



app.get('/content_page',function(req,res){
	
	var noMatch='';
	var query=req.query.search;
    

	if(query){
		const regex=new RegExp(escapeRegExp(query),'gi');
		Content.find({name:regex},function(err,allContent){
			if(err){
				console.log(err);
			}else{
				
				if(allContent.length < 1){
                   noMatch='SORRY';
				}
				res.render('content_page',{contents: allContent,noMatch: noMatch,currentUser:req.user});
			}
		})
	}else{
	
	Content.find({},function(err,allContent){
		if(err){
			console.log(err);
		}else{
			res.render('content_page',{contents: allContent,noMatch: noMatch,currentUser:req.user});
		}
	});
		
     
	}
	
});

app.get('/content_page/new',isLoggedIn,function(req,res){
	res.render('new');
});

app.post('/content_page',isLoggedIn,function(req,res){

	Content.create(req.body.cont,function(err,newCreated){
		if(err){
			console.log(err)
		}else{
			res.redirect('/content_page');
		}
	})
	
	
});
app.get('/content_page/:id',function(req,res){
    Content.findById(req.params.id,function(err,foundContent){
		if(err){
			console.log(err);
			res.redirect('/content_page');

		}else{
			res.render('show',{cont: foundContent,currentUser:req.user});
		}
	})
	
})
app.get('/content_page/:id/edit',function(req,res){
	Content.findById(req.params.id,function(err,foundContent){
		if(err){
			console.log(err);
			res.redirect('/content_page');
		}else{
			res.render('edit',{cont: foundContent,currentUser:req.user});
		}
	})
	
});

app.put('/content_page/:id',function(req,res){
	Content.findByIdAndUpdate(req.params.id,req.body.cont,function(err,updateCont){
		if(err){nt
			console.log(err);
			res.redirect('/content_page');
		}else{
           res.redirect('/content_page/' + req.params.id);
		}
	})
});

app.delete('/content_page/:id',function(req,res){
	Content.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect('/content_page');
		}else{
			res.redirect('/content_page');
		}
	})
});
app.get('/vicovi',function(req,res){
	Content.find({category: 'humor'},function(err,allVicovi){
		if(err){
			console.log(err);
			
		}else{
			res.render('vicovi',{contents: allVicovi,currentUser:req.user});
		}
	})

});


app.get('/vicovi/:id',function(req,res){
	Content.findById(req.params.id,function(err,foundVic){
		if (err){
			console.log(err);
			res.redirect('/vicovi');
		}else{
			res.render('show',{cont: foundVic});
		}
	})
});
app.get('/vicovi/:id/edit-vic',function(req,res){
	Content.findById(req.params.id,function(err,editVic){
		if(err){
			console.log(err);
			res.redirect('/vicovi');
		}else{
			res.render('edit',{cont: editVic});
		}
	})
	
});

app.put('/vicovi/:id',function(req,res){
	Content.findByIdAndUpdate(req.params.id,req.body.cont,function(err,updateCont){
		if(err){
			console.log(err);
			res.redirect('/vicovi');
		}else{
           res.redirect('/vicovi/' + req.params.id);
		}
	})
});
app.delete('/vicovi/:id',function(req,res){
	Content.findByIdAndDelete(req.params.id,function(err){
     if(err){
		 res.redirect("/vicovi");
	 }else{
		res.redirect("/vicovi");

	 }
	})
});
app.get('/sport',function(req,res){
	Content.find({category: 'sport'},function(err,allVicovi){
		if(err){
			console.log(err);
			
		}else{
			res.render('sport',{contents: allVicovi,currentUser:req.user});
		}
	})
	
});

app.get('/sport/:id',function(req,res){
	Content.findById(req.params.id,function(err,foundSport){
		if(err){
			console.log(err);
		}else{
			res.render('show',{cont: foundSport});
		}
	})
});
app.get('/sport/:id/edit-sport',function(req,res){
	Content.findById(req.params.id,function(err,editSport){
		if(err){
			console.log(err);
			res.redirect('/sport');
		}else{
			res.render('edit-sport',{cont: editSport});
		}
	})
	
});

app.put('/sport/:id',function(req,res){
	Content.findByIdAndUpdate(req.params.id,req.body.cont,function(err,updateSport){
		if(err){
			console.log(err);
			res.redirect('/sport');
		}else{
           res.redirect('/sport/' + req.params.id);
		}
	})
});
app.delete('/sport/:id',function(req,res){
	Content.findByIdAndDelete(req.params.id,function(err){
		if(err){
			res.redirect('sport');
		}else{
			res.redirect('sport');
		}
	})
})

app.get('/register',function(req,res){
	res.render('register');
});

app.post('/register',function(req,res){
	req.body.username
	req.body.password
	req.body.adminCode
	var newUser=new User({username: req.body.username});
	if(req.body.adminCode ==='fudbalce'){
       newUser.isAdmin=true;
	}

	User.register(newUser, req.body.password, function(err,reg){
		if(err){
			console.log(err);
			return res.render('register');
		}else{
			User.authenticate('local')(req,res,function(){
				res.redirect('/login');
			})
		}
	})
});

app.get('/admin',function(req,res){
	res.render('admin');
});

app.post('/login',passport.authenticate('local',{
	successRedirect: '/content_page',
	failureRedirect: '/'
}),function(req,res){
	
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/content_page");
});






var io=socket(server);

io.sockets.on("connection",function(socket){
	
	console.log("connection made");

	Chat.find({},function(err,res){
		if(err){
			throw err;
		}
		
		socket.emit('output',res);
	});
	

	
		
	
	
	
	socket.on('input',function(data){
		let name=data.name;
		let message=data.message;
		var chatMessage=new Chat({name: name, message: message});
		chatMessage.save();
		


				
   io.sockets.emit('output',data);
		
	});


});

