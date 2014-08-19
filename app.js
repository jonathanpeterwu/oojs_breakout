
// OOJS VERSION

// MODEL
var User = function(name, username, gravatar, email, repos){
 this.name = name;
 this.username = username;
 this.gravatar = gravatar;
 this.email = email;
 this.repos = repos
}

// COLLECTION
var Users = []


// VIEW
function renderUser(){
 var i = Users.length - 1
 var userTemplate = "<div id='"+ Users[i].name +"'><h1>" + Users[i].name + "</h1><p>" + Users[i].username +"</p><p>" +Users[i].email+ "</p><p>Repos: " + Users[i].repos+ "</p><img src='"+ Users[i].gravatar +"' alt='github image' height='300' width='300'</img> </div>"
 $('.jumbotron').append(userTemplate)
}


// CONTROLLER

document.addEventListener("DOMContentLoaded", function() {
 $('.form').on('submit', queryUser)
});

function queryUser(event) {
  event.preventDefault()
  var username = $(this).serialize().split('=')[1]
   startGithub(username)
}
function startGithub(username){
 var githubUrl = 'https://api.github.com/users/' + username
 $.ajax({
     url: githubUrl,
     type: 'GET',
     dataType: 'json',
     data: {}
 }).done(function(result) {
     initializeUser(result)
     console.log("success", result);
 }).fail(function() {
     console.log("error");
 }).always(function() {
     console.log("complete");
 });
}


function initializeUser(result){
 user = new User(result.name, result.login, result.avatar_url, result.email, result.public_repos)
 Users.push(user)
 renderUser()
}


