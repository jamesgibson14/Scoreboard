if (Meteor.isClient) {
	Template.scoreboard.players = function () {
    	return Players.find({}, {sort: {score: -1, name: 1}});
  	};
}