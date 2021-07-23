// JavaScript Document

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAV9lSzlAZiBHd0T5vuvE2WS8aZwVnD07s",
    authDomain: "air-technology-meet-web.firebaseapp.com",
    projectId: "air-technology-meet-web",
    storageBucket: "air-technology-meet-web.appspot.com",
    messagingSenderId: "1041820142974",
    appId: "1:1041820142974:web:01c6864e5e5fda8599372f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
  const database = firebase.database();


 
   function login(){
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
	
    auth.signInWithEmailAndPassword(email, pass)
    .then(async()=>{

      var user = auth.currentUser;
      var database_ref = database.ref()
      var user_data = {
        last_login : Date.now()
      }

      database_ref.child('users/' + user.uid).update(user_data);


      //window.location = 'meet.html';
	console.log(user.uid);
		var plan;
		await database_ref.child('users/'+ user.uid +"/").update({
			plan:"gold"
		})
		await database_ref.child('users/'+ user.uid +"/phone/").on("value",function(data)
		{
			plan=data.val();
		})
		//console.log(window.location);
		var main = document.getElementById('main');
		var none = document.getElementById('none');
		console.log(plan);
	/*	if(plan==='none')
		{
			none.style.display = 'block';
		}
		else
		{
			main.style.display = 'block';
		}*/
     })

    .catch(function(error){
      var error_code = error.code
      var error_message = error.message

      alert(error_message);
    })

  }

function createUser(){
	var email = document.getElementById('cemail').value;
	var pass = document.getElementById('cpass').value;
	var name = document.getElementById('name').value;
	var phone = document.getElementById('phone').value;
	var compass = document.getElementById('ccpass').value;
	
	if(pass !== compass){
		alert('Your Passwords Do Not Match!')
	}
	else{
		
		
		auth.createUserWithEmailAndPassword(email,pass)
		
		.then(function(){
			var user = auth.currentUser;
		var database_ref = database.ref();
		var userData = {
			email: email,
			name: name,
			phone: phone,
			plan: 'none',
			last_login: Date.now(),
		}
		
		database_ref.child('users/' + user.uid).update(userData);
			
			alert('User Created');
			
			window.location = 'login';
		})
		
		.catch(function(error){
			var error_code = error.code
			var error_message = error.message
			
			alert(error_message)
		})
		
	}
}

function forgotPassword(){
	var email = document.getElementById('femail').value;
	
	if(email.value === ''){
		alert('The Email Slot Can Not Be left Emty!')
	}
	else{
		
		auth.sendPasswordResetEmail(email)
		.then(function(){
		var user = auth.currentUser;
		var database_ref = database.ref();
		var userData = {
			last_login: Date.now()
		}
		
		database_ref.child('users/' + user.uid).update(userData);
		
		alert('Password Rest Link Sent To Entered Email')
		
		window.location = 'login';
			
		})
		
		.catch(function(error){
			var error_code = error.code
			var error_message = error.message
			
			alert(error_message)
		})
	}
}

function cswitch(){
	var page1 = document.getElementById('loginPage');
	var page2 = document.getElementById('createPage');
	
	if(page2.style.display === 'none'){
		page1.style.display = 'none';
		page2.style.display = 'block';
	}
	else{
		page2.style.display = 'none';
		page1.style.display = 'block';
	}
}

function fswitch(){
	var page1 = document.getElementById('loginPage');
	var page2 = document.getElementById('forgotPage');
	
	if(page2.style.display === 'none'){
		page1.style.display = 'none';
		page2.style.display = 'block';
	}
	else{
		page2.style.display = 'none';
		page1.style.display = 'block';
	}
}

