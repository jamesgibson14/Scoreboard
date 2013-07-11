if (Meteor.isClient) {
	Session.setDefault('newGame',true)
  Template.game.newGame = function () {
    return Session.get('newGame');
  }; 
  
  Template.game.events({
    'click .btn' : function () {
	  // template data, if any, is available in 'this'
	  Session.set('newGame',false)
	    alert(Session.get('newGame'))
	},
	'blur input': function(e){
		alert($(e.target).val())
	}
  });
  Template.game.rendered = function(){
  	setTimeout(function(){
  	$(".nameselect").typeahead({
  		source: Players.find({}).map(function(doc){
  			return doc.name
  		}),
  		minLength:1
  	})
  	},1000)
  }
  Template.gamehistory.games = function () {
    return Games.find();
  };
}