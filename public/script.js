"use strict";
const WELCOME_SCREEN = document.getElementById("window__welcome");
const LOGIN_SCREEN = document.getElementById("window__logIn");
const REGISTER_SCREEN = document.getElementById("window__register");

function changeToLogin() {
  WELCOME_SCREEN.style.display = "none";
  LOGIN_SCREEN.style.display = "grid";
}

function changeToRegister() {
  WELCOME_SCREEN.style.display = "none";
  REGISTER_SCREEN.style.display = "grid";
}

function logIn() {
  var log = document.getElementById('login')
  var pass = document.getElementById('password').value;
}

