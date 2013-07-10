if (Meteor.isClient) {
  Template.container.loggedin = true;
  Template.header.greeting = function () {
    return "Welcome to scoreboard.";
  };

  Template.header.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      alert("You pressed the button");
    }
  });
  Template.gamehistory.rendered = function(){
  	$("#nameselect").typeahead({
  		source: ['James','Dan','Rick']
  	})
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log('We are up and running!')
  });
}