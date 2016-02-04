"use strict";
var fs = require("fs");
var insert = require("insert-css");

var Ractive = require("ractive");

var getSize = require("bounding-client-rect");
var debounce = require("debounce");

var template = fs.readFileSync(__dirname + "/template.html", "utf8");
var style = fs.readFileSync(__dirname + "/style.css", "utf8");

insert(style);

module.exports = Ractive.extend({
	isolated: false,
	template: template,
	data: {
		gridClass: "",
		gridItems: [],
		gridRows: 1,
		gridColumns: 1,

		gridSize: "0px",
		gridMarginX: "0px",
		gridMarginY: "0px",
	},
	oncomplete: oncomplete,

	recalculate: recalculate,
});

function recalculate() {
	var size = getSize(this.find(".rm-grid-container"));
	var itemWidth = size.width / +(this.get("gridColumns"));
	var itemHeight = size.height / +(this.get("gridRows"));
	var padding = "0px";

	if (itemWidth > itemHeight) {
		// Will pad on the sides
		padding = (itemWidth - itemHeight) / 2;
		this.set({
			gridSize: itemHeight + "px",
			gridMarginY: "0px",
			gridMarginX: padding + "px"
		});
	} else {
		// Will pad on top/bottom
		padding = (itemHeight - itemWidth) / 2;
		this.set({
			gridSize: itemWidth + "px",
			gridMarginY: padding + "px",
			gridMarginX: "0px"
		});
	}
}

function oncomplete() {
	listenResize(this);
	this.on("teardown", unlistenResize.bind(null, this));

	this.recalculate();
}

function unlistenResize(component) {
	window.removeEventListener("resize", component._recalculate);
}

function listenResize(component) {
	var listener = component._recalculate = debounce(recalculate.bind(component), 50);
	window.addEventListener("resize", listener);
	component.observe("gridRows", listener);
	component.observe("gridColumns", listener);
	component.observe("gridClass", listener);
}
