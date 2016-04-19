var Ducky = require('../Ducky.js');
var Discord = require('discord.js');

Ducky.registerCommand("test me ducky", function(bot, message, msg) {
	bot.sendMessage(message, "Repeat: " + msg + ". Data: " + message.author);
});

Ducky.registerCommand("hi ducky", function(bot, message, msg) {
	bot.sendMessage(message, "Hi there " + message.author + "!");
});

Ducky.registerCommand("bye ducky", function(bot, message, msg) {
	if(Ducky.contains(msg, "/")) {
		if(Ducky.isMaster(message.author.id)) {
			bot.sendMessage(message, "Cya later aligator :'(");
			bot.logout();
		} else {
			bot.sendMessage(message, "You're not my master...");
		}
	} else {
		bot.sendMessage(message, "You're going?! Cya :(");
	}
});

Ducky.registerCommand("/restart ducky", function(bot, message, msg) {
	if(Ducky.isMaster(message.author.id)) {
		/*bot.sendMessage(message, "back online!");
		bot.logout();
		require('child_process').exec('cmd /c Ducky.bat', function(){
				// …you callback code may run here…
		});
		bot.sendMessage(message, "brb");*/
		throw new Error("Oh shit");
	} else {
		bot.sendMessage(message, "You're not my master...");
	}
});