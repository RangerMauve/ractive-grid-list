"use strict";
var fs = require("fs");
var insert = require("insert-css");

var Ractive = require("ractive");

var getSize = require("bounding-client-rect");
var getScrollbarWidth = require("scrollbar-width");
var hasScrollbar = require("has-scrollbar");
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
	// Get raw information about the state
	var container = this.find(".rm-grid-container");
	var size = getSize(container);
	var gridRows = this.get("gridRows");
	var gridColumns = this.get("gridColumns");
	var isScrolling = gridRows === "scroll";

	// Get certain dimensions
	var containerWidth = size.width;
	var containerHeight = size.height;
	var itemWidth = containerWidth / +(gridColumns);
	var itemHeight = containerHeight / +(gridRows);

	if (isScrolling) {
		// Calculate for vertical scrolling
		var gridSize = itemWidth;
		if (hasScrollbar(container))
			gridSize = itemWidth - (getScrollbarWidth() / gridColumns);

		this.set({
			gridSize: gridSize + "px",
			gridMarginX: "0px",
			gridMarginY: "0px"
		});
	} else {
		// Calculate for fitting perfectly
		var padding = "0px";
		if (gridRows === "scroll") {} else if (itemWidth > itemHeight) {
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
	component.observe("gridItems", listener);
}
