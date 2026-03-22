/*
 * Dependencies:
 *
 * This library requires something like https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js to
 * ensure that the random numbers work properly.
 */
export class CircIdenticon {
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
        this.petals = [];
    }
    buildSVG() {
        let result = '<svg version="1.1" id="identicon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">';
        result += this.createIdenticon() + "</svg>";
        return result;
    }
    getPoint(angle, r = 50) {
        return {
            x: 50 + r * Math.cos(angle),
            y: 50 + r * Math.sin(angle)
        };
    }
    selColor(rng, colors) {
        const index = Math.floor(rng() * colors.length);
        return colors[index];
    }
    drawItem(item) {
        return `<path d="M 50,50 Q ${item.leftP.x},${item.leftP.y} ${item.mainP.x},${item.mainP.y} z M 50,50 Q ${item.rightP.x},${item.rightP.y} ${item.mainP.x},${item.mainP.y} z" fill="${item.color}" stroke="${item.color}" stroke-width="1"/>`;
    }
    createIdenticon() {
        const radius = 48;
        const rng = new Math.seedrandom(this.name);
        const count = Math.round(rng() * 4) + 3;
        this.petals = [];
        for (let i = 0; i < count; ++i) {
            const item = {};
            const mainAngle = rng() * Math.PI * 2;
            let leftAngle = 0;
            let rightAngle = 0;
            if (this.symmetrical) {
                const delta = (Math.PI / 8) * rng();
                leftAngle = mainAngle - Math.PI / 8 - delta;
                rightAngle = mainAngle + Math.PI / 8 + delta;
                item.delta = delta;
            }
            else {
                leftAngle = mainAngle - Math.PI / 8 - (Math.PI / 8) * rng();
                rightAngle = mainAngle + Math.PI / 8 + (Math.PI / 8) * rng();
            }
            item.leftRad = rng() * radius;
            item.rightRad = this.symmetrical ? item.leftRad : rng() * radius;
            item.mainP = this.getPoint(mainAngle, rng() * (radius / 2) + radius / 2);
            item.leftP = this.getPoint(leftAngle, item.leftRad);
            item.rightP = this.getPoint(rightAngle, item.rightRad);
            item.color = this.selColor(rng, this.colors);
            item.mainAngle = mainAngle;
            item.leftAngle = leftAngle;
            item.rightAngle = rightAngle;
            this.petals.push(item);
        }
        const bgColor = this.selColor(rng, this.bgColors);
        let strokeColor = "Black";
        if (rng() > 0.5) {
            strokeColor = bgColor;
        }
        let html = `<circle cx="50" cy="50" r="${radius}" fill="${bgColor}" stroke="${strokeColor}" stroke-width="2.5" />`;
        if (rng() > 0.25) {
            const cent = rng() * ((radius - 6) / 1.6);
            const delta = rng() * Math.min(cent, radius - cent);
            let bandColor = bgColor;
            while (bandColor === bgColor) {
                bandColor = this.selColor(rng, this.bgColors);
            }
            let band = `<circle cx="50" cy="50" r="${cent + delta + 6}" fill="${bandColor}" />`;
            band += `<circle cx="50" cy="50" r="${cent - delta + 6}" fill="${bgColor}" />`;
            html += band;
        }
        let curve = "";
        for (let i = 0; i < count; ++i) {
            curve += this.drawItem(this.petals[i]);
        }
        return html + curve + `<circle cx="50" cy="50" r="${radius / 8}" fill="${strokeColor}" />`;
    }
}
export default CircIdenticon;
