 Players = new Meteor.Collection("players");
  Games = new Meteor.Collection("games");

if (Meteor.isClient) {
  Template.container.loggedin = true;

  Template.header.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      alert("You pressed the button");
    }
  });
}

if (Meteor.isServer) {

 

  // Publish complete set of lists to all clients.
  Meteor.publish('players', function () {
    return Players.find();
  });

  // Publish all games
  Meteor.publish('games', function () {
    return Games.find();
  });
  // Publish games in process
  Meteor.publish('livegames', function(game){
    
    return Games.find();
  })
  Meteor.startup(function () {
  	
  	if (Players.find().count() === 0) {
      var names = ["James G",
                   "Dan P",
                   "Adam T",
                   "Nikki Y",
                   "Patrick M",
                   "Brian O"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: 0});      
    }
    if (Games.find().count() === 0) {
      var games = [
	{p1:'James',p2: 'Dan',p1score:8,p2score: 10},
	{p1:'James',p2: 'Dan',p1score:7,p2score: 10},
	{p1:'James',p2: 'Dan',p1score:10,p2score: 5},
	{p1:'James',p2: 'Dan',p1score:10,p2score: 9}];
      for (var i = 0; i < games.length; i++)
        Games.insert(games[i]);
      
    }
    console.log(Players.find().count());
    console.log('We are up and running!')
  });
}
