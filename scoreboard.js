if (Meteor.isClient) {
	Template.scoreboard.players = function () {
    	return Players.find({}, {sort: {score: -1, name: 1}});
  	};
Template.scoreboard.selected_name = function (attr) {
  var player = Players.findOne(Session.get(attr));
  return player && player.name;
};
}
