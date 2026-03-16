# Bearbot
> Cumbie's WebDev Knowledge Place.
CIS 376 Spring 2026 Course Page.

[course calendar](https://github.com/barrycumbie/bearbot/wiki/Web-Dev-Course-Calendar)

[source code](https://github.com/barrycumbie/bearbot/)

## User Story (👕/XL)

**As a** web dev student

**I want** to easily find info 

**So that** I don't get lost in Cumbie's non-linear, messy, Agile dump of content. 

## concept of this app.

here's some adjacent dev work: https://codepen.io/barrycumbie/pen/VYKbeYe

<img width="1066" height="898" alt="image" src="https://github.com/user-attachments/assets/6d626fa2-90e1-485c-8338-70312436b9e1" />

## app validity

- all good on [Nu](https://validator.w3.org/nu/?doc=https%3A%2F%2Fbarrycumbie.github.io%2Fbearbot%2F)
  - a few warnings, no errors.  

## code sample

Here's how the login flow works. 

from `pages/login.html` 

```html 
<button id="login-button" class="btn btn-primary btn-lg w-100 fs-3 p-2 border border-rounded-pill" type="button" aria-label="Sign In">
  Sign In
</button>
```

from `scripts/login-script.js` this "listens" for a click event

```js
const login = document.getElementById('login-button');

//pass an Immediately Invoked Function Expression: IIFE.
login.addEventListener('click', function (event) {

  //...(more code here) 
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log("username + pwd:", username + ", " + password);

  //...(more code here) 

});
```



script 


dom 



