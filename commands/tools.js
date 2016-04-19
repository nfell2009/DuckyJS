var Ducky = require('../Ducky.js');
var Discord = require('discord.js');

Ducky.registerCommand("info me", function(bot, message, msg) {
	var mentionppl = false;
	if(message.mentions.length == 0) {
		var mentions = "No one :(";
	} else {
		mentionppl = true;
		var mentions = message.mentions;
	}
	bot.sendMessage(message, "Info on: " + message.author + 
							 "\nDiscriminator: " + message.author.discriminator +
							 "\nID: " + message.author.id +
							 "\nMentions: " + mentions);
	setTimeout(function(){
		if(mentionppl) {
			for(var i = 0; i < mentions.length; i++) {
				bot.sendMessage(message, "Hi " + mentions[i]);
			}
		} else {
			return;
		}
	}, 1000);
});

Ducky.registerCommand("/spam %arg% %mentions% %args%", function(bot, message, msg) {
	if(message.mentions.length == 0) {
		bot.sendMessage(message, "You must specify users to notify");
		return;
	} else if (Ducky.isMaster(message.author.id)) {
		var args = [];

		var mentions = message.mentions;
		var users = mentions.join(", ");
		msg = message.content;
		for(var i = 0; i < mentions.length; i++) {
			msg = msg.replace(mentions[i], "");
		}
		
		msg = msg.replace("/spam ", "");
		msg.replace("  ", " ")
		args = msg.split(" ");
		msg = msg.replace(args[0], "");
		msg.replace("  ", " ")
		if(args[0] == "pm") {
			for(var i = 0; i < mentions.length; i++) {
				for(var ii = 0; ii < 8; ii++) {
					bot.sendMessage(mentions[i], msg);
				}
			}
		} else {
			var users = mentions.join(", ");
			for(var i = 0; i < 8; i++) {
				bot.sendMessage(message, users + msg);
			}
		}
	} else {
		bot.sendMessage(message, "Only my master can spam people!")
	}
});