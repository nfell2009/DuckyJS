var Discord = require("discord.js");
var bot = new Discord.Client();
var masters = "128194687801622528";
var myself = "171294847033016320";

delete exports.triggers;
delete exports.callbacks;
delete exports.script2trigger;
delete exports.notifyusers;
exports.triggers = [];
exports.callbacks = [];
exports.script2trigger = [];
exports.notifyusers = [];


exports.contains = function(base, input) {
	return contains(base, input);
}
exports.isMaster = function(master) {
	return isMaster(master);
}

function contains(base, input) {
	if(base == null || input == null) {
		return false;
	}
	if(input instanceof Array) {
		for(tocheck in input) {
			if(base.indexOf(tocheck) > -1) {
				return true;
			}
		}
		return false;
	} else {
		if(base.indexOf(input) > -1) {
			return true;
		} else {
			return false;
		}
	}
}

function isMaster(master) {
	if(master == masters) {
		return true;
	} else {
		return false;
	}
}

function stopMyself(id) {
	if(id == myself) {
		return true;
	}
}

var currentCommandScript;
exports.registerCommand = function(trigger, callback) {
	exports.triggers.push(trigger);
	exports.callbacks.push(callback);
	exports.script2trigger.push(currentCommandScript);
}

exports.loadScript = function(path) {
	var def = require(path);
}

/*exports.unloadScript = function(path, full) {
	delete require.cache[path];
}*/

//var commands = require("./loader/commands.js");
var fs = require('fs');
var files = fs.readdirSync('./commands/');
for (var i in files) {
	currentCommandScript = files[i];
  	//var definition = require('./commands/' + files[i]);
  	exports.loadScript('./commands/' + files[i]);
  	console.log('[info] Command script loaded: ' + files[i]);
}

fs.readFile('./data/notify.json', handleFile)

// Write the callback function
function handleFile(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
	exports.notifyusers.push(obj.id);
    console.log('[info][notify] Watching for: ' + obj.id);
}


bot.on("message", function(message) {
	if(stopMyself(message.author.id)) {
		return;
	}
	if(!isMaster(message.author.id)) {
		return;
	}
	// TODO: Notify logger (need to figure out how to not spam users...)
	/*if(message.mentions.length > 0) {
		for(var i = 0; i < message.mentions.length; i++) {
			for(var ii = 0; ii < exports.notifyusers.length; ii++) {
				if(message.mentions[i].id == exports.notifyusers[ii]) {
					bot.sendMessage(message.mentions[i], message.content);
					return;
				}
			}
		}
	}*/
	for (var i in exports.triggers) {
		var trigger = exports.triggers[i];
		bot.sendMessage(message, trigger);
	}
	var msg = message.content.toLowerCase();
	for(var i = 0; i < exports.triggers.length; i++) {
		if(exports.triggers[i] == msg) {
			var callback_function = exports.callbacks[i];
 			callback_function(bot, message, msg);
 			return;
		}
	}
	return;
	



	for(var i = 0; i < exports.triggers.length; i++) {
		var ts = exports.triggers[i].split(" ");
		bot.sendMessage(message, ts[c] + " -> " + ms[c]);
		var ms = msg.split(" ");
		var nm = [];
		var inMentions = false;
		if(message.mentions.length > 0) {
			var mentions = message.mentions.join(", ");
		}
		for(var c = 0; c < ms.length; c++) {

			if(ts[c] == "%arg%") {
				nm.push(ts[c]);
			} else if (ts[c] == "%args%") {
				nm.push(ts[c]);
				break;
			} else if (ts[c] == "%mention%") {
				if(contains(mentions, ms[c])) {
					nm.push(ts[c]);
				} else {
					bot.sendMessage(message, "Parse error! Arg type: \"mention\", got type: \"String\"");
					break;
				}
			} else if (ts[c] == "%mentions%") {
				nm.push("%mentions%")
				inMentions = true;
			} else if (inMentions) {
				if(!ms[c].startsWith("@")) {
					inMentions = false;
				}
			} else {
				nm.push(ms[c]);
			}
		}
		
		msg = nm.join(" ");
		return;
		if(exports.triggers[i] == msg) {
			var callback_function = exports.callbacks[i];
 			callback_function(bot, message, msg);
 			return;
		}
	}
});
var auth = require("./data/auth.json");
bot.login(auth.email, auth.password);