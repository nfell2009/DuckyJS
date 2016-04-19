var Ducky = require('../Ducky.js');
var Discord = require('discord.js');

var jsonfile = require('jsonfile')
 
var file = '/root/ducky/data/notify.json';
 
var fs = require('fs');

try {
    fs.accessSync(file, fs.F_OK);
} catch (e) {
    fs.closeSync(fs.openSync(file, 'w'));
}

exports.addNotifyUser = function(author) {
	var id = author.id;
	var obj = {id: id};
	jsonfile.writeFileSync(file, obj, {spaces: 2});
}
