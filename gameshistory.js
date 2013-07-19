if (Meteor.isClient) {
  Session.setDefault('p1score',0);
  Session.setDefault('p2score',0);
  Template.game.getGame = function () {
    return Session.get('currentGame');
  }; 
/*
Template.game.p1 = function(){
    return Session.get('p1');
}
Template.game.p2 = function(){
    return Session.get('p2');
}
*/

Template.game.p1score = function(){
    return Session.get('p1score');
}
Template.game.p2score = function(){
    return Session.get('p2score');
}
Template.game.checkWin = function(attr){
  
 if (Session.get(attr)===10){
    //update player score
    Players.update({"name": /James/},{$set: {score: 10}})
    //end game
    Session.set('currentGame',null);
  }
  else {
    return;
  }
}
Template.game.incrementScore = function(e) {
  var attr=$(e.target).attr('data-attr');
  val = Session.get(attr) + 1
  Session.set(attr, val);
  var obj = {};
  obj[attr] = val
  console.log(obj);
  Games.update(Session.get('currentGame'), {$set: obj})
  Template.game.checkWin(attr);
}
  Template.game.events({
    'click #startGame' : function () {
      var timestamp = new Date();
      Games.insert({p1: 'James', p2: 'Dan', p1score: 0, p2score: 0, live: true, gamestart: timestamp},function(err, _id){
        if(err)
          alert('could not insert new line ' + err);
        else{
          Session.set('currentGame',_id);
        }
        });	  
   },
	'blur input': function(e){
	  var attr=$(e.target).attr('data-attr');
	  this[attr]=e.target.value;
	},
	'click .inc': Template.game.incrementScore
  });
  Template.players = function () {
    	return Players.find({}, {sort: {score: -1, name: 1}});
  };
  Template.game.rendered = function(){

    $(".nameselect").typeahead({
      source: ['James','Dan','Andrew'],
      minLength:1
    })

  }
  Template.gamehistory.games = function () {
    return Games.find({}, {sort: {gamestart: -1}});
  };
Template.gamehistory.events ({
  'click .gameline': function(e){
     $(e.currentTarget).toggleClass('selected');
  }
})
}
