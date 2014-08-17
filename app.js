// JQUERY SOUP VERSION

$(document).ready(function(){
    var users = [];
    $('.form').submit(function(event){
        event.preventDefault();
        var username = $(this).serialize().split('=')[1];
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            type: 'get',
            dataType: 'json'
        }).done(function(response){
            var user = { name: response.name,
                         username: response.username,
                         login: response.login,
                         email: response.email,
                         avatar: response.avatar_url,
                         repos: response.public_repos
            };
            users << user;
            $('.jumbotron').append("<div id='"+ user.name +"'><h1>" + user.name + "</h1><p>" + user.username +"</p><p>" +user.email+ "</p><p>Repos: " + user.repos+ "</p><img src='"+ user.avatar +"' alt='github image' height='300' width='300'</img> </div>");
        }).fail(function(response){
            console.log("FAILBOAT, SET SAIL!");
        }).always(function(response){
            console.log("Le Fin.")
        });
    })
});


// OOJS VERSION

// // MODEL
// var User = function(name, username, gravatar, email, repos){
//  this.name = name;
//  this.username = username;
//  this.gravatar = gravatar;
//  this.email = email;
//  this.repos = repos
// }

// // COLLECTION
// var Users = []


// // VIEW
// function renderUser(){
//  var i = Users.length - 1
//  var userTemplate = "<div id='"+ Users[i].name +"'><h1>" + Users[i].name + "</h1><p>" + Users[i].username +"</p><p>" +Users[i].email+ "</p><p>Repos: " + Users[i].repos+ "</p><img src='"+ Users[i].gravatar +"' alt='github image' height='300' width='300'</img> </div>"
//  $('.jumbotron').append(userTemplate)
// }


// // CONTROLLER

// document.addEventListener("DOMContentLoaded", function() {
//  $('.form').on('submit', queryUser)
// });

// function queryUser(event) {
//   event.preventDefault()
//   var username = $(this).serialize().split('=')[1]
//    startGithub(username)
// }
// function startGithub(username){
//  var githubUrl = 'https://api.github.com/users/' + username
//  $.ajax({
//      url: githubUrl,
//      type: 'GET',
//      dataType: 'json',
//      data: {}
//  }).done(function(result) {
//      initializeUser(result)
//      console.log("success", result);
//  }).fail(function() {
//      console.log("error");
//  }).always(function() {
//      console.log("complete");
//  });
// }


// function initializeUser(result){
//  user = new User(result.name, result.login, result.avatar_url, result.email, result.public_repos)
//  Users.push(user)
//  renderUser()
// }



