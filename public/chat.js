

var socket=io.connect("http://localhost:9000")




var btn=document.getElementById('send');
  output=document.getElementById('output'),
  message=document.getElementById('message'),
  feedback=document.getElementById('feedback'),
  tooltip=document.querySelector('.tooltip'),
  tooltiptext=document.querySelector('.tooltiptext'),
  handle=document.getElementById('handle');

  isLoggedIn=function (req,res,next){

    if(req.isAuthenticated()){
      return next();
    }
      
  };
 
 

  btn.addEventListener('click',function(e){
    event.preventDefault();
  	socket.emit('input',{
  		name:handle.value,
        message:message.value

    });
    

     
     message.value='';

    
  });


   

    socket.on("output",function(data){
      if(data.length){
        for(var x=0; x < data.length; x++){
         var message= document.createElement('div');
         message.innerHTML="<p><strong>"+data[x].name +"</strong>" + ': ' + data[x].message+"</p>";
         
         
         
         output.appendChild(message);
         output.insertBefore(message,output.firstChild);


        }
           
     
      }
          
      

  });



    function openForm() {
     
      document.getElementById("mario-chat").style.display = "block";
      document.getElementById('open-button').style.display='none';
    }
    
    function closeForm() {
      document.getElementById("mario-chat").style.display = "none";
      document.getElementById('open-button').style.display='block';


    }
    


    
    
    function doRefresh(){
      $("#chat-window").load("#output");
  
  
  };