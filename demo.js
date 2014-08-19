// V1 - Building our Model (User Model/Collection)


var Model = function(){
	this.users = Users
	this.
}

var User = function(name, username, gravatar, email, repos){
	this.name = name;
	this.username = username;
	this.gravatar = gravatar;
	this.email = email;
	this.repos = repos;
}


// V2 - Building our Controller (Github/AJAX/User Creation)
document.addEventListener("DOMContentLoaded", function() {
	$('.form').on('submit', queryUser)
});

function queryUser(event) {
	event.preventDefault()

	var user = $(this).serialize().split('=')[1]
	ajaxGithub(user)
}

function ajaxGithub(user) {
	var url = 'https://api.github.com/users/' + user
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		data: {}
	})
	.done(function(result) {
		createUser(result)
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

}


function createUser(result){
	var user = new User(result.name, result.login,  result.avatar_url, result.email, result.public_repos)
	Users.push(user)
	renderUser()
}


// VIEW
function renderUser(){

	for(var i=0; i < Users.length; i++){
		var userTemplate = "<div id='"+ Users[i].name +"'><h1>" + Users[i].name + "</h1><p>" + Users[i].username +"</p><p>" +Users[i].email+ "</p><p>Repos: " + Users[i].repos+ "</p><img src='"+ Users[i].gravatar +"' alt='github image' height='300' width='300'</img> </div>"
		$('.jumbotron').append(userTemplate)
	}
}
























var something = function (){


}.bind(this)








// function startGithub(username){
// }

// function initializeUser(result){
// }

// V3 - Building our View (Rendering Users)
// function renderUser(){

// }

	// var userTemplate = "<div id='"+ Users[i].name +"'><h1>" + Users[i].name + "</h1><p>" + Users[i].username +"</p><p>" +Users[i].email+ "</p><p>Repos: " + Users[i].repos+ "</p><img src='"+ Users[i].gravatar +"' alt='github image' height='300' width='300'</img> </div>"
