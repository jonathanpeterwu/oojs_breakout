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

