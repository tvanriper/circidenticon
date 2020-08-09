/*
 * Dependencies:
 *
 * This library requires something like https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js to
 * ensure that the random numbers work properly.
 */

/*
 * Licensing:
 *
 * I, Joseph E. Van Riper III, wrote this, and commit it to the public domain.  Enjoy it freely.  If you like,
 * let me know if you use it... it'd be nice to see if anyone uses this.
 */

/*
 * Usage:
 *
 *  var name = document.getElementById('userName').value;
 *  var icon = new CircIdenticon(name);
 *  document.getElementById('target').innerHTML = icon.buildSVG();
 *
 * Refinements:
 * 
 *  Change available colors by modifying the 'colors' attribute of the CircIdenticon object:
 *    var icon = new CircIdenticon(name);
 *    icon.colors = ["Blue","Red","Green"];
 *
 *  Change available background colors by modifying the 'bgColors' attribute of the CircIdenticon object:
 *    var icon = new CircIdenticon(name);
 *    icon.bgColors = ["Black","DarkGrey","MightnightBlue"];
 *
 *  Make it generate non-symmetrical petals by setting the 'symmetrical' attribute to false:
 *    var icon = new CircIdenticon(name);
 *    icon.symmetrical = false;
 *
 *  Call 'createIdenticon()' instead of 'buildSVG()' to generate the drawing without the SVG container (if you wish to
 *  embed this in a group, or collect multiple identicons in a single SVG for some reason).
 */

class CircIdenticon {
	constructor(name) {
		this.name = name;
		this.colors = [
			"AliceBlue",
			"AntiqueWhite",
			"Aqua",
			"Aquamarine",
			"Azure",
			"Beige",
			"Bisque",
			"BlanchedAlmond",
			"Blue",
			"BlueViolet",
			"Brown",
			"BurlyWood",
			"CadetBlue",
			"Chartreuse",
			"Chocolate",
			"Coral",
			"CornflowerBlue",
			"Cornsilk",
			"Crimson",
			"Cyan",
			"DodgerBlue",
			"FloralWhite",
			"ForestGreen",
			"Fuschia",
			"Gainsboro",
			"GhostWhite",
			"Gold",
			"GoldenRod",
			"Green",
			"GreenYellow",
			"HoneyDew",
			"HotPink",
			"IndianRed",
			"Ivory",
			"Khaki",
			"Lavender",
			"LavenderBlush",
			"LawnGreen",
			"LemonChiffon",
			"LightBlue",
			"LightCoral",
			"LightCyan",
			"LightGoldenRodYellow",
			"LightGray",
			"LightGreen",
			"LightPink",
			"LightSalmon",
			"LightSeaGreen",
			"LightSkyBlue",
			"LightSlateGray",
			"LightYellow",
			"Lime",
			"LimeGreen",
			"Linen",
			"Magenta",
			"Yellow",
			"YellowGreen",
			"Red",
			"Salmon",
			"SandyBrown",
			"SeaGreen",
			"SlateBlue",
			"Teal",
			"Violet",
			"Purple",
			"Plum"
		];
		this.bgColors = [
			"Black",
			"DarkSlateGrey",
			"DarkBlue",
			"DarkSlateBlue",
			"DarkOliveGreen",
			"LightSteeleBlue",
			"DimGray",
			"FireBrick",
			"Indigo",
			"Maroon",
			"Navy",
			"DimGrey",
			"MidnightBlue",
			"DarkGreen"
		];
		this.symmetrical = true;
		this.petals=[];
	}
	buildSVG() {
		var result = `<svg version="1.1" id="identicon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">`;
		result += this.createIdenticon() + "</svg>";
		return result;
	}
	getPoint(angle, r) {
		var result = {};
		if (r == null) {
			r = 50;
		}
		result.x = 50 + (r * Math.cos(angle));
		result.y = 50 + (r * Math.sin(angle));
		return result
	}
	selColor(rng, c) {
		var index = Math.floor(rng() * c.length);
		return c[index];
	};
	drawItem(item) {
		return `<path d="M 50,50 Q ${item.leftP.x},${item.leftP.y} ${item.mainP.x},${item.mainP.y} z M 50,50 Q ${item.rightP.x},${item.rightP.y} ${item.mainP.x},${item.mainP.y} z" fill="${item.color}" stroke="${item.color}" stroke-width="1"/>`;
	};
	createIdenticon() {
		var radius = 48;
		var rng = new Math.seedrandom(this.name);
		var count = Math.round(rng() * 4) + 3;
		this.petals = [];
		for (var i = 0; i < count; ++i) {
			var item = {}
			var mainAngle = rng() * Math.PI * 2;
			var leftAngle = 0;
			var rightAngle = 0;
			if (this.symmetrical) {
				var delta = (Math.PI / 8) * rng();
				leftAngle = mainAngle - (Math.PI / 8) - delta;
				rightAngle = mainAngle + (Math.PI / 8) + delta;
				item.delta = delta;
			} else {
				leftAngle = mainAngle - (Math.PI / 8) - ((Math.PI / 8) * rng());
				rightAngle = mainAngle + (Math.PI / 8) + ((Math.PI / 8) * rng());
			}
			item.leftRad = rng()*radius;
			item.rightRad = (this.symmetrical) ? item.leftRad : rng()*radius;
			item.mainP = this.getPoint(mainAngle, rng()*(radius/2)+(radius/2));
			item.leftP = this.getPoint(leftAngle, item.leftRad);
			item.rightP = this.getPoint(rightAngle, item.rightRad);
			item.color = this.selColor(rng, this.colors);
			item.mainAngle = mainAngle;
			item.leftAngle = leftAngle;
			item.rightAngle = rightAngle;
			this.petals.push(item);
		}
		var bgColor = this.selColor(rng, this.bgColors);
		var strokeColor = "Black";
		if (rng() > 0.5) {
			strokeColor = bgColor
		}
		var html = `<circle cx="50" cy="50" r="${radius}" fill="${bgColor}" stroke="${strokeColor}" stroke-width="2.5" />`;
		if (rng() > 0.25) {
			var cent = rng() * ((radius-6)/1.6);
			var delta = rng() * Math.min(cent, radius - cent);
			var bandColor = bgColor;
			while (bandColor == bgColor) {
				bandColor = this.selColor(rng,this.bgColors);
			}
			var band = `<circle cx="50" cy="50" r="${cent + delta + 6}" fill="${bandColor}" />`;
			band += `<circle cx="50" cy="50" r="${cent - delta + 6}" fill="${bgColor}" />`;
			html += band;
		}
		var curve = "";
		for (var i = 0; i < count; ++i ) {
			curve += this.drawItem(this.petals[i]);
		}
		return html + curve + `<circle cx="50" cy="50" r="${radius / 8}" fill="${strokeColor}" />`;
	};
};
