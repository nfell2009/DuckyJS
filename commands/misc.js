var Ducky = require('../Ducky.js');
var Discord = require('discord.js');

Ducky.registerCommand("thanks ducky", function(bot, message, msg) {
	bot.sendMessage(message, "No problem!");
});

Ducky.registerCommand("what time is it?", function(bot, message, msg) {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	bot.sendMessage(message, "It's currently: " + h + ":" + m + ":" + s + " (BST)");
});

Ducky.registerCommand("whats a duck look like?", function(bot, message, msg) {
	bot.sendMessage(message, "http://nfell2009.uk/files/duck.jpg");
});

Ducky.registerCommand("say goodbye", function(bot, message, msg) {
	bot.sendMessage(message, "Goodbye everyone! See you all later :)");
});

Ducky.registerCommand("/help", function(bot, message, msg) {
	bot.sendMessage(message, "I'll PM you my trigger phrases in a second " + message.author);
	var help = Ducky.triggers.join("\n- ");
	help = "- " + help;
	bot.sendMessage(message.author, help);
});

Ducky.registerCommand("penis length of %mention%", function(bot, message, msg) {
	bot.sendMessage(message, "Coming soon");
});

Ducky.registerCommand("monitor me", function(bot, message, msg) {
	bot.sendMessage(message, "Sorry " + message.author + ", but this command is currently locked");
	return;
	var data = require("../util/notify_writer.js");
	data.addNotifyUser(message.author)
	Ducky.notifyusers.push(message.author);
	bot.sendMessage(message, "Congrats " + message.author + "! I've added your to my notify list! You'll get a message from me when I see you're notified somewhere");
});

Ducky.registerCommand("attempt user", function(bot, message, msg) {
	var userjs = require('../util/user.js');
	var u = userjs.resolveUser(message, message.author.id);
	bot.sendMessage(u, "Testing123");
});

