﻿/*
*
* Copyright (c) 2015- Ladislav Vegh, Komarno, Slovakia
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*
*/

var inalan = inalan || {};

inalan.Scrollbar = function (name, label, width, min, max, position, onChange) {
    // create subclass Scrollbar from VisuData - set properties
    inalan.VisuData.call(this, name);
    // set new properties
    this.label = label;
    if (width < 30) {
        width = 30;
    }
    this.width = width;
    this.enabled = true;
    this.dragging = false;
    this.min = min;
    this.max = max;
    if (position < min) { position = min; }
    if (position > max) { position = max; }
    this.position = position;
    this.color = "#FE6";
    // color constants
    this.defaultColor = "#FE6";
    this.overColor = "#FB3";
    this.disabledColor = "#EEE";
    // onchange event handler
    this.onChange = onChange;
}

// create subclass Scrollbar from VisuData - set methods
inalan.Scrollbar.prototype = Object.create(inalan.VisuData.prototype);
inalan.Scrollbar.prototype.constructor = inalan.Scrollbar;

inalan.Scrollbar.prototype.render = function () {
    // draw the Scrollbar
    this.ctx.strokeStyle = "#000";
    this.ctx.beginPath();
    this.ctx.moveTo(this.x - this.width / 2 - 0.5, this.y + 0.5);
    this.ctx.lineTo(this.x + this.width / 2 + 0.5, this.y + 0.5);
    this.ctx.moveTo(this.x - this.width / 2 - 0.5, this.y);
    this.ctx.lineTo(this.x + this.width / 2 + 0.5, this.y);
    this.ctx.stroke();
    if (this.enabled) {
        this.ctx.fillStyle = this.color;
    } else {
        this.ctx.fillStyle = this.disabledColor;
    }
    this.ctx.beginPath();
    var circleX = (this.x-this.width/2+10) + (this.position-this.min)*(this.width-20)/(this.max-this.min+1);
    var circleY = this.y;
    this.ctx.arc(circleX , circleY, 10, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.fillStyle = "#000";
    this.ctx.font = "13px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.label, this.x, this.y - 20);
}

inalan.Scrollbar.prototype.isOver = function (x, y) {
    var circleX = (this.x-this.width/2+10) + (this.position-this.min)*(this.width-20)/(this.max-this.min+1);
    var circleY = this.y;
    if (Math.sqrt(Math.pow(circleX-x,2)+Math.pow(circleY-y,2))<=10) {
        return true;
    }
    return false
}