exports.resolveUser = function(msgContext,usertxt){
	var userid = usertxt;
	if(usertxt.startsWith('<@')){
		userid = usertxt.substr(2,usertxt.length-3);
	}
	var user = msgContext.channel.server.members.get("id",userid);
	if(!user){
		var users = msgContext.channel.server.members.getAll("username",usertxt);
		if(users.length == 1){
			user = users[0];
		}
	}
	return user;
}
