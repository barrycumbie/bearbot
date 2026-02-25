document.addEventListener('DOMContentLoaded', function () {

  console.log("password is: lasagna");
});

//when button clicked, get username and password. 
const login = document.getElementById('login-button');

//pass an Immediately Invoked Function Expression: IIFE.
login.addEventListener('click', function (event) {
  console.log('clicked');


  // todo: verify user name is required. 
  // eyeball ain't working. 

  // Get form values from the DOM 
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log("username + pwd:", username + ", " + password);

  if (password === 'lasagna') {
    console.log('user is authenticated');
    // Store in session storage
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('isAuthN', 'true');

    window.location.assign("../index.html"); 
  }
  if (password != 'lasagna') {
    console.log('user is NOT authenticated'); 
    sessionStorage.setItem('isAuthN', 'false');
  }



  // sessionStorage.setItem('loginTimestamp', new Date().toISOString());
  // sessionStorage.setItem('loginAttempts', (parseInt(sessionStorage.getItem('loginAttempts') || '0') + 1).toString());

  // Log to console
  console.log('session username:', username);
  console.log('session password:', password);
  console.log('session authN', sessionStorage.getItem('isAuthN')); 

});


