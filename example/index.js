"use strict";
var Ractive = require("ractive");
var fs = require("fs");
require("../");

window.Ractive = Ractive;

console.log("Ractive components", Ractive.components);

var template = fs.readFileSync(__dirname + "/template.html", "utf8");

new Ractive({
	el: document.querySelector("main"),
	template: template,
	data: {
		rows: 3,
		columns: 3,
		scrolling: false,
		items: [{
			name: "Alice"
		}, {
			name: "Bob"
		}, {
			name: "Carol"
		}, {
			name: "Dave"
		}, {
			name: "Eve"
		}, {
			name: "Faythe"
		}, {
			name: "Alice"
		}, {
			name: "Bob"
		}, {
			name: "Carol"
		}, {
			name: "Dave"
		}, {
			name: "Eve"
		}, {
			name: "Faythe"
		}, {
			name: "Alice"
		}, {
			name: "Bob"
		}, {
			name: "Carol"
		}, {
			name: "Dave"
		}, {
			name: "Eve"
		}, {
			name: "Faythe"
		}, {
			name: "Alice"
		}, {
			name: "Bob"
		}, {
			name: "Carol"
		}, {
			name: "Dave"
		}, {
			name: "Eve"
		}, {
			name: "Faythe"
		}]
	}
});
