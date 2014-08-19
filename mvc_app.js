// =============DOM Initialization================
document.addEventListener("DOMContentLoaded", function() {
  initializeApp();
});

function initializeApp(){
  var model = new Model()
  var view = new View(model)
  var controller = new Controller(view, model)
  controller.view.setListeners(controller)
}


// =============Model=============================
var User = function(name, username, gravatar, email, repos){
 this.name = name;
 this.username = username;
 this.gravatar = gravatar;
 this.email = email;
 this.repos = repos
}

var Model = function(){
  this.collection = []
}

Model.prototype = {
  createUser : function(name, username, gravatar, email, repos) {
    user = new User(name, username, gravatar, email, repos);
    this.collection.push(user);
  }
}

// =============Controller=============================
var Controller = function(view, model){
  this.view = view;
  this.model = model;
}

Controller.prototype = {
  startGithubAjax: function(username, controller){
    "use strict";

    var githubUrl = 'https://api.github.com/users/' + username

    $.ajax({
       url: githubUrl,
       type: 'GET',
       dataType: 'json',
       data: {}
    }).done(function(result) {
       controller.initializeUser(result);
       console.log("success", result);
    }).fail(function() {
       console.log("error");
    }).always(function() {
       console.log("complete");
    });
  },
  initializeUser: function(result){
    "use strict";

    this.model.createUser(result.name, result.login, result.avatar_url, result.email, result.public_repos)
    this.view.renderUser()
  },
  queryUser: function(event) {
    "use strict";

    event.preventDefault()
    var username = $('.form').serialize().split('=')[1];
    console.log(username)
    return username
  }
}



//=======================View===================================
var View = function(model){
  this.model = model;
}

View.prototype = {
  setListeners: function(controller) {
    "use strict";

    var callback = controller.startGithubAjax;
    var queryUserFunction = controller.queryUser;

    $('.form').on('submit', function(event){
      var username = queryUserFunction(event);
      callback(username, controller);
    })
  },
  renderUser: function () {
    "use strict";

    var i = this.model.collection.length - 1;
    var userTemplate = "<div id='"+ this.model.collection[i].name +"'><h1>" + this.model.collection[i].name + "</h1><p>" + this.model.collection[i].username +"</p><p>" + this.model.collection[i].email+ "</p><p>Repos: " + this.model.collection[i].repos+ "</p><img src='"+ this.model.collection[i].gravatar +"' alt='github image' height='300' width='300'</img> </div>";

    $('.jumbotron').append(userTemplate)
  }
}




















