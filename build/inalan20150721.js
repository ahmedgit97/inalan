/*
*
* Copyright (c) 2015- Ladislav Vegh, Komarno, Slovakia
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*
*/
var inalan=inalan||{};inalan.Stage=function(canvasId){document.onselectstart=function(){return false};this.canvas=document.getElementById("myCanvas");this.canvas.parent=this;this.ctx=this.canvas.getContext("2d");this.visuItems={};this.vars={};this.controller=new inalan.Controller();this.controller.x=30;this.controller.y=this.ctx.canvas.height-35;this.controller.ctx=this.ctx;this.canvas.addEventListener("mousemove",this.stageMouseMoveEvent);this.canvas.addEventListener("mousedown",this.stageMouseDownEvent);this.canvas.addEventListener("mouseout",this.stageMouseUpOrOutEvent);this.canvas.addEventListener("mouseup",this.stageMouseUpOrOutEvent);var self=this;this.fps=24;this.render=function(evt){self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);self.controller.render();for(var index in self.visuItems){if(self.visuItems.hasOwnProperty(index)){self.visuItems[index].render()}}for(var index in self.visuItems){if(self.visuItems.hasOwnProperty(index)){if(self.visuItems[index] instanceof inalan.VisuVariable||self.visuItems[index] instanceof inalan.VisuArray){self.visuItems[index].renderCopy()}}}if(self.showArrow.length>0){self.ctx.fillStyle="#055";self.ctx.globalAlpha=0.1;for(var i=0;i<self.showArrow.length/4;i++){var angle=Math.atan2(self.showArrow[i*4+3]-self.showArrow[i*4+1],self.showArrow[i*4+2]-self.showArrow[i*4]);var length=Math.sqrt(Math.pow(self.showArrow[i*4]-self.showArrow[i*4+2],2)+Math.pow(self.showArrow[i*4+1]-self.showArrow[i*4+3],2))+1;self.ctx.save();self.ctx.translate(self.showArrow[i*4+0],self.showArrow[i*4+1]);self.ctx.rotate(Math.PI+angle);self.ctx.beginPath();self.ctx.moveTo(0,-10);self.ctx.lineTo(0,+10);self.ctx.lineTo(-length+20,+10);self.ctx.lineTo(-length+20,+20);self.ctx.lineTo(-length,0);self.ctx.lineTo(-length+20,-20);self.ctx.lineTo(-length+20,-10);self.ctx.lineTo(0,-10);self.ctx.fill();self.ctx.restore()}self.ctx.globalAlpha=1}};setInterval(this.render,1000/this.fps);this.showArrow=[];this.animating=0;this.time=1000};inalan.Stage.prototype.stageMouseMoveEvent=function(evt){var canvasRect=evt.target.getBoundingClientRect();var mouseX=evt.clientX-canvasRect.left;var mouseY=evt.clientY-canvasRect.top;var stage=evt.target.parent;var dragging=false;if(evt.which==1){for(var i in stage.controller){if(stage.controller.hasOwnProperty(i)){var obj2=stage.controller[i];if(obj2 instanceof inalan.VisuScrollbar){if(obj2.dragging){var pos=obj2.min+(mouseX-(obj2.x-obj2.width/2+10))*(obj2.max-obj2.min+1)/(obj2.width-20);if(pos<obj2.min){pos=obj2.min}if(pos>obj2.max){pos=obj2.max}if(obj2.position!=pos){obj2.position=pos;obj2.onChange(pos)}dragging=true}}}}for(var index in stage.visuItems){if(stage.visuItems.hasOwnProperty(index)){var obj=stage.visuItems[index];if(obj instanceof inalan.VisuVariable){if(obj.dragging){if(obj.changable){obj.value=obj.y-mouseY;dragging=true}else{obj.dragging=false}}}if(obj instanceof inalan.VisuArray){for(var i=0;i<obj.items.length;i++){if(obj.items[i].dragging){if(obj.items[i].changable){obj.items[i].value=obj.items[i].y-mouseY;dragging=true}else{obj.items[i].dragging=false}}}}if(obj instanceof inalan.VisuScrollbar){if(obj.dragging){var pos=obj.min+(mouseX-(obj.x-obj.width/2+10))*(obj.max-obj.min+1)/(obj.width-20);if(pos<obj.min){pos=obj.min}if(pos>obj.max){pos=obj.max}if(obj.position!=pos){obj.position=pos;obj.onChange(pos)}dragging=true}}}}}if(!dragging){var mouseCursor="default";for(var i in stage.controller){if(stage.controller.hasOwnProperty(i)){var obj2=stage.controller[i];if(obj2 instanceof inalan.VisuButton){if(obj2.isOver(mouseX,mouseY)&&obj2.enabled){obj2.color=obj2.overColor;mouseCursor="pointer"}else{obj2.color=obj2.defaultColor}}if(obj2 instanceof inalan.VisuScrollbar){if(obj2.isOver(mouseX,mouseY)&&obj2.enabled){obj2.color=obj2.overColor;mouseCursor="pointer"}else{obj2.color=obj2.defaultColor}}}}for(var index in stage.visuItems){if(stage.visuItems.hasOwnProperty(index)){var obj=stage.visuItems[index];if(obj instanceof inalan.VisuVariable){if(obj.changable&&obj.isOver(mouseX,mouseY)){mouseCursor="ns-resize"}}if(obj instanceof inalan.VisuArray){for(var i=0;i<obj.items.length;i++){if(obj.items[i].changable&&obj.items[i].isOver(mouseX,mouseY)){mouseCursor="ns-resize"}}}if(obj instanceof inalan.VisuButton&&obj.enabled){if(obj.isOver(mouseX,mouseY)){obj.color=obj.overColor;mouseCursor="pointer"}else{obj.color=obj.defaultColor}}if(obj instanceof inalan.VisuScrollbar&&obj.enabled){if(obj.isOver(mouseX,mouseY)){obj.color=obj.overColor;mouseCursor="pointer"}else{obj.color=obj.defaultColor}}}}evt.target.style.cursor=mouseCursor}};inalan.Stage.prototype.stageMouseDownEvent=function(evt){if(evt.which==1){var canvasRect=evt.target.getBoundingClientRect();var mouseX=evt.clientX-canvasRect.left;var mouseY=evt.clientY-canvasRect.top;var stage=evt.target.parent;for(var i in stage.controller){if(stage.controller.hasOwnProperty(i)){var obj2=stage.controller[i];if(obj2 instanceof inalan.VisuButton){if(obj2.isOver(mouseX,mouseY)&&obj2.enabled){obj2.pressed=true}}if(obj2 instanceof inalan.VisuScrollbar){if(obj2.isOver(mouseX,mouseY)){obj2.dragging=true}}}}for(var index in stage.visuItems){if(stage.visuItems.hasOwnProperty(index)){var obj=stage.visuItems[index];if(obj instanceof inalan.VisuVariable){if(obj.changable&&obj.isOver(mouseX,mouseY)){obj.dragging=true}}if(obj instanceof inalan.VisuArray){for(var i=0;i<obj.items.length;i++){if(obj.items[i].changable&&obj.items[i].isOver(mouseX,mouseY)){obj.items[i].dragging=true}}}if(obj instanceof inalan.VisuButton&&obj.enabled){if(obj.isOver(mouseX,mouseY)){obj.pressed=true}}if(obj instanceof inalan.VisuScrollbar){if(obj.isOver(mouseX,mouseY)){obj.dragging=true}}}}}};inalan.Stage.prototype.stageMouseUpOrOutEvent=function(evt){if(evt.type=="mouseout"||evt.which==1){var canvasRect=evt.target.getBoundingClientRect();var mouseX=evt.clientX-canvasRect.left;var mouseY=evt.clientY-canvasRect.top;var stage=evt.target.parent;for(var i in stage.controller){if(stage.controller.hasOwnProperty(i)){var obj2=stage.controller[i];if(obj2 instanceof inalan.VisuButton){if(obj2.isOver(mouseX,mouseY)&&obj2.enabled&&obj2.pressed){obj2.onClickFnc()}obj2.pressed=false}if(obj2 instanceof inalan.VisuScrollbar){obj2.dragging=false}}}for(var index in stage.visuItems){if(stage.visuItems.hasOwnProperty(index)){var obj=stage.visuItems[index];if(obj instanceof inalan.VisuVariable){obj.dragging=false}if(obj instanceof inalan.VisuArray){for(var i=0;i<obj.items.length;i++){obj.items[i].dragging=false}}if(obj instanceof inalan.VisuButton){if(obj.isOver(mouseX,mouseY)&&obj.enabled&&obj.pressed){obj.onClickFnc()}obj.pressed=false}if(obj instanceof inalan.VisuScrollbar){obj.dragging=false}}}}};inalan.Stage.prototype.addVisu=function(visuData,id){if(typeof(this.visuItems[id])!="undefined"){throw"- Can not add '"+id+"' to the stage, object with this ID already exists on the stage."}else{if(typeof(visuData.id)!="undefined"){throw"- This object was probably already added to the stage with ID: "+visuData.id+"."}}visuData.ctx=this.ctx;visuData.id=id;this.visuItems[id]=visuData};inalan.Stage.prototype.setSteps=function(stepFunctions){this.controller.setSteps(stepFunctions)};inalan.Stage.prototype.showAllButtons=function(){this.controller.showAllButtons()};inalan.Stage.prototype.get=function(id){return this.visuItems[id]};inalan.Stage.prototype.compare=function(firstObject,secondObject){firstObject.startComparing();secondObject.startComparing();var stage=this};inalan.Stage.prototype.copy=function(firstObject,secondObject){this.animating++;firstObject.changable=false;secondObject.changable=false;var stage=this;var distance=Math.sqrt(Math.pow(firstObject.x-secondObject.x,2)+Math.pow(firstObject.y-secondObject.y,2));var time=distance*this.time/100;var fps=this.fps;var frames=Math.floor(time*fps/1000);var intervalId=setInterval(function(){copyFnc()},1000/fps);var dx=(secondObject.x-firstObject.x)/frames;var dy=(secondObject.y-firstObject.y)/frames;var x=firstObject.x;var y=firstObject.y;var c1=firstObject.strokeColor;var c2=firstObject.fillColor;firstObject.startCopying();firstObject.setLightYellowColor();var copyFnc=function(){frames--;if(frames>0){firstObject.copyx+=dx;firstObject.copyy+=dy}else{if(frames<=0){firstObject.copyx=secondObject.x;firstObject.copyy=secondObject.y;secondObject.value=firstObject.value;secondObject.minValue=firstObject.minValue;secondObject.maxValue=firstObject.maxValue;secondObject.strokeColor=c1;secondObject.fillColor=c2;clearInterval(intervalId);stage.animating--;stage.showArrow=stage.showArrow.concat([firstObject.x,firstObject.y-firstObject.value/2,secondObject.x,secondObject.y-secondObject.value/2])}}}};inalan.Stage.prototype.move=function(firstObject,secondObject){this.animating++;firstObject.changable=false;secondObject.changable=false;var stage=this;var distance=Math.sqrt(Math.pow(firstObject.x-secondObject.x,2)+Math.pow(firstObject.y-secondObject.y,2));var time=distance*this.time/100;var fps=this.fps;var frames=Math.floor(time*fps/1000);var intervalId=setInterval(function(){copyFnc()},1000/fps);var dx=(secondObject.x-firstObject.x)/frames;var dy=(secondObject.y-firstObject.y)/frames;var x=firstObject.x;var y=firstObject.y;var c1=firstObject.strokeColor;var c2=firstObject.fillColor;firstObject.setGrayColor();firstObject.startCopying();var copyFnc=function(){frames--;if(frames>0){firstObject.copyx+=dx;firstObject.copyy+=dy}else{if(frames<=0){firstObject.copyx=secondObject.x;firstObject.copyy=secondObject.y;secondObject.value=firstObject.value;secondObject.minValue=firstObject.minValue;secondObject.maxValue=firstObject.maxValue;secondObject.strokeColor=c1;secondObject.fillColor=c2;clearInterval(intervalId);stage.animating--;stage.showArrow=stage.showArrow.concat([firstObject.x,firstObject.y-firstObject.value/2,secondObject.x,secondObject.y-secondObject.value/2])}}}};inalan.Stage.prototype.exchange=function(firstObject,secondObject){this.animating++;firstObject.changable=false;secondObject.changable=false;var stage=this;var distance=Math.sqrt(Math.pow(firstObject.x-secondObject.x,2)+Math.pow(firstObject.y-secondObject.y,2));var time=distance*this.time/100;var fps=this.fps;var frames=Math.floor(time*fps/1000);var intervalId=setInterval(function(){copyFnc()},1000/fps);var dx=(secondObject.x-firstObject.x)/frames;var dy=(secondObject.y-firstObject.y)/frames;var x1=firstObject.x;var y1=firstObject.y;var x2=secondObject.x;var y2=secondObject.y;var c1=firstObject.strokeColor;var c2=firstObject.fillColor;firstObject.strokeColor=secondObject.strokeColor;firstObject.fillColor=secondObject.fillColor;secondObject.strokeColor=c1;secondObject.fillColor=c2;firstObject.startCopying();secondObject.startCopying();firstObject.setHiddenColor();secondObject.setHiddenColor();var copyFnc=function(){frames--;if(frames>0){firstObject.copyx+=dx;firstObject.copyy+=dy;secondObject.copyx-=dx;secondObject.copyy-=dy}else{if(frames<=0){var x=secondObject.value;secondObject.value=firstObject.value;firstObject.value=x;x=secondObject.minValue;secondObject.minValue=firstObject.minValue;firstObject.minValue=x;x=secondObject.maxValue;secondObject.maxValue=firstObject.maxValue;firstObject.maxValue=x;firstObject.copyx=firstObject.x;firstObject.copyy=firstObject.y;secondObject.copyx=secondObject.x;secondObject.copyy=secondObject.y;clearInterval(intervalId);stage.animating--;if(firstObject!=secondObject){if(secondObject.value>firstObject.value){var middle=secondObject.value/2;stage.showArrow=stage.showArrow.concat([firstObject.x,firstObject.y-middle-16,secondObject.x,secondObject.y-middle-16]);stage.showArrow=stage.showArrow.concat([secondObject.x,secondObject.y-middle+16,firstObject.x,firstObject.y-middle+16])}else{var middle=firstObject.value/2;stage.showArrow=stage.showArrow.concat([firstObject.x,firstObject.y-middle+16,secondObject.x,secondObject.y-middle+16]);stage.showArrow=stage.showArrow.concat([secondObject.x,secondObject.y-middle-16,firstObject.x,firstObject.y-middle-16])}}}}}};inalan.Stage.prototype.add=function(firstObject,secondObject){this.animating++;firstObject.changable=false;secondObject.changable=false;var stage=this;var distance=Math.sqrt(Math.pow(firstObject.x-secondObject.x,2)+Math.pow(firstObject.y-(secondObject.y-secondObject.value),2));var time=distance*this.time/100;var fps=this.fps;var frames=Math.floor(time*fps/1000);var intervalId=setInterval(function(){addFnc()},1000/fps);var dx=(secondObject.x-firstObject.x)/frames;var dy=(secondObject.y-firstObject.y-secondObject.value)/frames;var x=firstObject.x;var y=firstObject.y;firstObject.startCopying();firstObject.setLightYellowColor();var addFnc=function(){frames--;if(frames>0){firstObject.copyx+=dx;firstObject.copyy+=dy}else{if(frames<=0){firstObject.copyx=secondObject.x;firstObject.copyy=secondObject.y-secondObject.value;secondObject.value=secondObject.value+firstObject.value;clearInterval(intervalId);stage.animating--;stage.showArrow=stage.showArrow.concat([firstObject.x,firstObject.y-firstObject.value/2,secondObject.x,(secondObject.y-secondObject.value)+firstObject.value/2])}}}};inalan.Stage.prototype.stopCopyingAndComparing=function(){for(var index in this.visuItems){if(this.visuItems.hasOwnProperty(index)){var obj=this.visuItems[index];if(obj instanceof inalan.VisuVariable){if(obj.copy){obj.stopCopying()}if(obj.compare){obj.stopComparing()}}if(obj instanceof inalan.VisuArray){for(var i=0;i<obj.items.length;i++){if(obj.items[i].copy){obj.items[i].stopCopying()}if(obj.items[i].compare){obj.items[i].stopComparing()}}}}}};var inalan=inalan||{};inalan.Controller=function(){this.x=0;this.y=0;this.fncIndex=[0];this.stepFncsArray=null;this.playingAnimation=false;this.waitingAnimation=false;this.nextStepAuto=-1;this.undo=[];var self=this;this.resetLabel="Reset";this.startLabel="Start";this.stopLabel="Stop";this.prevLabel="Previous step";this.nextLabel="Next step";this.speedLabel="Speed of animation:";var restoreStepFromUndo=function(stepNumber){var stage=self.ctx.canvas.parent;var copyAttributes=function(obj1,obj2){for(var i in obj1){if(typeof(obj1[i])==="object"){if(obj1[i] instanceof Array){obj2[i]=obj1[i]}else{if(!obj2.hasOwnProperty(i)){obj2[i]={}}copyAttributes(obj1[i],obj2[i])}}else{obj2[i]=obj1[i]}}};var deleteAttributes=function(obj1,obj2){for(var i in obj2){if(typeof(obj2[i])==="object"&&obj1.hasOwnProperty(i)){deleteAttributes(obj1[i],obj2[i])}else{if(!obj1.hasOwnProperty(i)){delete obj2[i]}}}};var vars=JSON.parse(self.undo[stepNumber][1]);copyAttributes(vars,stage.vars);deleteAttributes(vars,stage.vars);var visuItems=JSON.parse(self.undo[stepNumber][2]);copyAttributes(visuItems,stage.visuItems);deleteAttributes(visuItems,stage.visuItems);self.fncIndex=JSON.parse(self.undo[stepNumber][3]);stage.showArrow=JSON.parse(self.undo[stepNumber][4])};var resetAnimationWhenPossible=false;var resetAnimation=function(){var stage=self.ctx.canvas.parent;if(stage.animating==0&&!self.waitingAnimation){resetAnimationWhenPossible=false;self.playingAnimation=false;self.nextStepAuto=-1;self.startStop.text=self.startLabel;restoreStepFromUndo(0);self.undo=[];self.reset.enabled=false;self.startStop.enabled=true;self.prevStep.enabled=false;self.nextStep.enabled=true}else{if(stage.animating>0||self.waitingAnimation){resetAnimationWhenPossible=true}}};var prevStepAnimation=function(){var stage=self.ctx.canvas.parent;if(stage.animating==0&&!self.waitingAnimation){var i=self.undo.length-1;restoreStepFromUndo(i);self.undo=self.undo.slice(0,i);if(self.undo.length==0){self.reset.enabled=false;self.prevStep.enabled=false}self.startStop.enabled=true;self.nextStep.enabled=true}};var startStopAnimation=function(){var stage=self.ctx.canvas.parent;if(!self.playingAnimation){self.playingAnimation=true;self.startStop.text=self.stopLabel;self.prevStep.enabled=false;self.nextStep.enabled=false;if(stage.animating==0){nextStepAnimation()}}else{self.playingAnimation=false;self.startStop.text=self.startLabel;if(self.undo.length>0){self.prevStep.enabled=true}self.nextStep.enabled=true}};var waitAnimationDone=function(){self.waitingAnimation=false;if(resetAnimationWhenPossible){resetAnimation()}else{if(self.playingAnimation||self.nextStepAuto>0){nextStepAnimation()}}};var nextStepAnimationDoneID;var nextStepAnimationDone=function(){var stage=self.ctx.canvas.parent;if(stage.animating==0&&!self.waitingAnimation){clearInterval(nextStepAnimationDoneID);if(resetAnimationWhenPossible){resetAnimation()}else{if(self.nextStepAuto==0){nextStepAnimation()}else{if(self.nextStepAuto>0){self.waitingAnimation=true;setTimeout(waitAnimationDone,stage.time/1000*self.nextStepAuto)}else{if(self.playingAnimation){self.waitingAnimation=true;setTimeout(waitAnimationDone,stage.time)}}}}}};var nextStepAnimation=function(){var stage=self.ctx.canvas.parent;if(stage.animating==0&&!self.waitingAnimation&&self.stepFncsArray!=null){if(self.nextStepAuto<0){self.reset.enabled=true;if(!self.playingAnimation){self.prevStep.enabled=true}var i=self.undo.length;self.undo[i]=new Array();self.undo[i][1]=JSON.stringify(stage.vars);self.undo[i][2]=JSON.stringify(stage.visuItems);self.undo[i][3]=JSON.stringify(self.fncIndex);self.undo[i][4]=JSON.stringify(stage.showArrow)}stage.showArrow=[];stage.stopCopyingAndComparing();var i=0;var stepsArray=[self.stepFncsArray];var stepsCheck=[null];while(stepsArray[i][self.fncIndex[i]] instanceof Array){stepsCheck[i+1]=stepsArray[i][self.fncIndex[i]+1];stepsArray[i+1]=stepsArray[i][self.fncIndex[i]];i++;if(i>=self.fncIndex.length){self.fncIndex[i]=0}}self.nextStepAuto=stepsArray[i][self.fncIndex[i]]();if(typeof(self.nextStepAuto)=="undefined"){self.nextStepAuto=-1}var ok;do{ok=true;self.fncIndex[i]++;if(self.fncIndex[i]>=stepsArray[i].length){if(stepsCheck[i]!=null){if(stepsCheck[i]()){self.fncIndex[i]=0}else{i--;self.fncIndex[i]++;self.fncIndex=self.fncIndex.slice(0,i+1);ok=false}}else{self.nextStepAuto=-1;self.playingAnimation=false;if(self.undo.length>0){self.prevStep.enabled=true}self.nextStep.enabled=false;self.startStop.enabled=false;self.startStop.text=self.startLabel}}}while(!ok);nextStepAnimationDoneID=setInterval(nextStepAnimationDone,1)}};var changeSpeedOfAnimation=function(position){var stage=self.ctx.canvas.parent;stage.time=2000-position};this.reset=new inalan.VisuButton(this.resetLabel,80,resetAnimation);this.startStop=new inalan.VisuButton(this.startLabel,0,startStopAnimation);this.prevStep=new inalan.VisuButton(this.prevLabel,120,prevStepAnimation);this.nextStep=new inalan.VisuButton(this.nextLabel,120,nextStepAnimation);this.reset.enabled=false;this.prevStep.enabled=false;this.speed=new inalan.VisuScrollbar(this.speedLabel,150,200,1800,1000,changeSpeedOfAnimation)};inalan.Controller.prototype.showAllButtons=function(){this.reset.width=80;this.startStop.width=80;this.prevStep.width=120;this.nextStep.width=120;this.speed.width=150};inalan.Controller.prototype.render=function(){this.ctx.beginPath();this.ctx.strokeStyle="#000";this.ctx.moveTo(0,this.y-40+0.5);this.ctx.lineTo(this.ctx.canvas.clientWidth,this.y-40+0.5);this.ctx.stroke();var spaceWidth=0;if(this.reset.width>0){this.reset.ctx=this.ctx;this.reset.x=this.x+this.reset.width/2;this.reset.y=this.y;this.reset.render();spaceWidth+=20}if(this.startStop.width>0){this.startStop.ctx=this.ctx;this.startStop.x=this.x+this.reset.width+this.startStop.width/2+spaceWidth;this.startStop.y=this.y;this.startStop.render();spaceWidth+=20}if(this.prevStep.width>0){this.prevStep.ctx=this.ctx;this.prevStep.x=this.x+this.reset.width+this.startStop.width+this.prevStep.width/2+spaceWidth;this.prevStep.y=this.y;this.prevStep.render()}if(this.nextStep.width>0){this.nextStep.ctx=this.ctx;this.nextStep.x=this.x+this.reset.width+this.startStop.width+this.prevStep.width+this.nextStep.width/2+spaceWidth;this.nextStep.y=this.y;this.nextStep.render()}if(this.speed.width>0){spaceWidth+=30;this.speed.ctx=this.ctx;this.speed.x=this.x+this.reset.width+this.startStop.width+this.prevStep.width+this.nextStep.width+this.speed.width/2+spaceWidth;this.speed.y=this.y;this.speed.render()}};inalan.Controller.prototype.setSteps=function(stepsFncsArray){this.stepFncsArray=stepsFncsArray};var inalan=inalan||{};inalan.VisuData=function(){this.x=0;this.y=0};var inalan=inalan||{};inalan.VisuVariable=function(name,value,changable){if(typeof(changable)=="undefined"){changable=false}inalan.VisuData.call(this);this.name=name;if(value<0){throw"- the value of '"+name+"' must be >= 0"}this.value=value;this.minValue=0;this.maxValue=value>180?value:180;this.height=this.maxValue;this.fillColor="#C00";this.strokeColor="#000";this.width=24;this.textRotation=0;this.changable=changable;this.dragging=false;this.copy=false;this.copyx=0;this.copyy=0;this.compare=false;this.defaultColor="#C00";this.yellowColor="#FF2";this.lightYellowColor="#FFD";this.greenColor="#090";this.grayColor="#CCC";this.hiddenColor="#EEE";this.originalFillColor="#C00";this.originalStrokeColor="#000"};inalan.VisuVariable.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuVariable.prototype.constructor=inalan.VisuVariable;inalan.VisuVariable.prototype.randomize=function(min,max){if(typeof(min)=="undefined"||min<this.minValue){min=this.minValue}if(typeof(max)=="undefined"||max>this.maxValue){max=this.maxValue}this.value=Math.floor((Math.random()*(max-min+1))+min)};inalan.VisuVariable.prototype.render=function(){if(this.value>this.maxValue){this.value=this.maxValue}else{if(this.value<this.minValue){this.value=this.minValue}}if(this.maxValue>this.height){this.height=this.maxValue}this.ctx.fillStyle=this.hiddenColor;this.ctx.fillRect(this.x-this.width/2-1,this.y-this.height-1,this.width+1,this.height);this.ctx.fillStyle=this.fillColor;this.ctx.fillRect(this.x-this.width/2-0.5,this.y-this.value-0.5,this.width,this.value);this.ctx.strokeStyle=this.strokeColor;this.ctx.strokeRect(this.x-this.width/2-0.5,this.y-0.5-this.value,this.width,this.value);this.ctx.strokeStyle="#000";this.ctx.beginPath();this.ctx.moveTo(this.x-this.width/2-3,this.y-0.5);this.ctx.lineTo(this.x-this.width/2+this.width+2,this.y-0.5);this.ctx.stroke();if(this.changable){this.ctx.strokeStyle="#BBB";this.ctx.beginPath();this.ctx.moveTo(this.x-this.width/5,this.y-0.5-this.value-3);this.ctx.lineTo(this.x,this.y-0.5-this.value-6);this.ctx.lineTo(this.x+this.width/5,this.y-0.5-this.value-3);this.ctx.moveTo(this.x,this.y-0.5-this.value-6);this.ctx.lineTo(this.x,this.y-0.5-this.value-2);this.ctx.stroke();if(this.value>6){var r=parseInt(this.fillColor.substring(1,2),16)-3;var g=parseInt(this.fillColor.substring(2,3),16)-3;var b=parseInt(this.fillColor.substring(3,4),16)-3;if(r<0){r=0}if(g<0){g=0}if(b<0){b=0}this.ctx.strokeStyle="#"+r.toString(16)+g.toString(16)+b.toString(16);this.ctx.beginPath();this.ctx.moveTo(this.x-this.width/5,this.y-0.5-this.value+3);this.ctx.lineTo(this.x,this.y-0.5-this.value+6);this.ctx.lineTo(this.x+this.width/5,this.y-0.5-this.value+3);this.ctx.moveTo(this.x,this.y-0.5-this.value+6);this.ctx.lineTo(this.x,this.y-0.5-this.value+2);this.ctx.stroke()}}if(this.compare){this.ctx.fillStyle="#055";this.ctx.globalAlpha=0.1;if(this.value>30){this.ctx.font="bold 26px Comic Sans MS"}else{this.ctx.font="bold "+(this.value-4)+"px Comic Sans MS"}this.ctx.textAlign="center";this.ctx.textBaseline="middle";this.ctx.fillText("?",this.x,this.y-this.value/2);this.ctx.globalAlpha=1}this.ctx.fillStyle="#000";this.ctx.font="12px Arial";this.ctx.textBaseline="alphabetic";if(this.textRotation==0){this.ctx.textAlign="center";this.ctx.fillText(this.name,this.x-0.5,this.y+13.5)}else{this.ctx.save();this.ctx.translate(this.x-0.5,this.y+13.5);this.ctx.rotate(-Math.PI/180*this.textRotation);this.ctx.textAlign="right";this.ctx.fillText(this.name,7,3);this.ctx.restore()}};inalan.VisuVariable.prototype.renderCopy=function(){if(this.copy){this.ctx.fillStyle=this.yellowColor;this.ctx.fillRect(this.copyx-this.width/2-0.5,this.copyy-this.value-0.5,this.width,this.value);this.ctx.strokeStyle="#000";this.ctx.strokeRect(this.copyx-this.width/2-0.5,this.copyy-0.5-this.value,this.width,this.value)}};inalan.VisuVariable.prototype.isOver=function(x,y){if(Math.abs(x-this.x)<this.width/2&&Math.abs(y-(this.y-this.value))<=5){return true}return false};inalan.VisuVariable.prototype.startCopying=function(){this.copyx=this.x;this.copyy=this.y;this.originalFillColor=this.fillColor;this.originalStrokeColor=this.strokeColor;this.copy=true};inalan.VisuVariable.prototype.stopCopying=function(){if(this.copy){this.fillColor=this.originalFillColor;this.strokeColor=this.originalStrokeColor;this.copy=false}};inalan.VisuVariable.prototype.startComparing=function(){this.originalFillColor=this.fillColor;this.originalStrokeColor=this.strokeColor;this.fillColor=this.yellowColor;this.strokeColor="#000";this.compare=true};inalan.VisuVariable.prototype.stopComparing=function(){if(this.compare){this.fillColor=this.originalFillColor;this.strokeColor=this.originalStrokeColor;this.compare=false;this.changable=false}};inalan.VisuVariable.prototype.setDefaultColor=function(){this.fillColor=this.defaultColor;this.strokeColor="#000"};inalan.VisuVariable.prototype.setYellowColor=function(){this.fillColor=this.yellowColor;this.strokeColor="#000"};inalan.VisuVariable.prototype.setLightYellowColor=function(){this.fillColor=this.lightYellowColor;this.strokeColor="#000"};inalan.VisuVariable.prototype.setGreenColor=function(){this.fillColor=this.greenColor;this.strokeColor="#000"};inalan.VisuVariable.prototype.setGrayColor=function(){this.fillColor=this.grayColor;this.strokeColor=this.grayColor};inalan.VisuVariable.prototype.setHiddenColor=function(){this.fillColor=this.hiddenColor;this.strokeColor=this.hiddenColor};var inalan=inalan||{};inalan.VisuArray=function(name,values,changable){if(typeof(changable)=="undefined"){changable=false}inalan.VisuData.call(this);this.name=name;this.items={length:values.length};this.showIndexes=true;this.indexes={};this.indexesPos=0;this.indexStrokeColor="#CDD";this.indexFillColor="#DEE";for(var i=0;i<values.length;i++){this.items[i]=new inalan.VisuVariable(name+"["+i+"]",values[i],changable);this.items[i].textRotation=45}};inalan.VisuArray.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuArray.prototype.constructor=inalan.VisuArray;inalan.VisuArray.prototype.randomize=function(min,max){for(var i=0;i<this.items.length;i++){this.items[i].randomize(min,max)}};inalan.VisuArray.prototype.setIndex=function(name,value,pos){if(typeof(pos)=="undefined"){pos=-1}this.indexes[name]={value:value,pos:pos}};inalan.VisuArray.prototype.deleteIndex=function(name){delete (this.indexes[name])};inalan.VisuArray.prototype.render=function(){var maxHeight=this.items[0].height;for(var i=0;i<this.items.length;i++){if(this.items[i].height>maxHeight){maxHeight=this.items[i].height}}var xpos=this.x;if(this.showIndexes||Object.keys(this.indexes).length>0){this.ctx.fillStyle="#BBB";this.ctx.font="bold 12px Courier New";this.ctx.textAlign="center";this.ctx.textBaseline="alphabetic";for(var k=0;k<this.items.length;k++){this.ctx.fillText(k,this.items[k].x-0.5,this.items[k].y+50+this.indexesPos)}}for(var i=-1;i<=this.items.length;i++){if(i>=0&&i<this.items.length){this.items[i].ctx=this.ctx;this.items[i].x=xpos;if(i<this.items.length-1){xpos=xpos+this.items[i].width/2+this.items[i+1].width/2+2}this.items[i].y=this.y;this.items[i].height=maxHeight;this.items[i].render()}var fixIndexPos=[];for(var name in this.indexes){if(this.indexes[name].value==i&&this.indexes[name].pos>=0){fixIndexPos=fixIndexPos.concat([this.indexes[name].pos])}}for(var name in this.indexes){if(this.indexes[name].value==i){var indexPos=this.indexesPos;if(this.indexes[name].pos>=0){indexPos=indexPos+27*this.indexes[name].pos}else{k=0;while(fixIndexPos.indexOf(k)>-1){k++}fixIndexPos=fixIndexPos.concat([k]);indexPos=indexPos+27*k}this.ctx.strokeStyle=this.indexStrokeColor;this.ctx.fillStyle=this.indexFillColor;this.ctx.beginPath();if(i>=0&&i<this.items.length){this.ctx.arc(this.items[i].x,this.items[i].y+72+indexPos-4,11.5,0,2*Math.PI)}else{if(i==-1){this.ctx.arc(this.items[0].x-this.items[0].width,this.items[0].y+72+indexPos-4,11.5,0,2*Math.PI)}else{this.ctx.arc(this.items[this.items.length-1].x+this.items[this.items.length-1].width,this.items[0].y+72+indexPos-4,11.5,0,2*Math.PI)}}this.ctx.fill();this.ctx.stroke();this.ctx.fillStyle="#000";this.ctx.font="bold 12px Courier New";this.ctx.textAlign="center";this.ctx.textBaseline="alphabetic";if(i>=0&&i<this.items.length){this.ctx.fillText(name,this.items[i].x-0.5,this.items[i].y+72+indexPos)}else{if(i==-1){this.ctx.fillText(name,this.items[0].x-this.items[0].width-0.5,this.items[0].y+72+indexPos)}else{this.ctx.fillText(name,this.items[this.items.length-1].x-this.items[this.items.length-1].width-0.5,this.items[0].y+72+indexPos)}}}}}};inalan.VisuArray.prototype.renderCopy=function(){for(var i=0;i<this.items.length;i++){this.items[i].renderCopy()}};inalan.VisuArray.prototype.setMinValue=function(value){for(var i=0;i<this.items.length;i++){this.items[i].minValue=value}};inalan.VisuArray.prototype.setMaxValue=function(value){for(var i=0;i<this.items.length;i++){this.items[i].maxValue=value}};inalan.VisuArray.prototype.setHeight=function(height){for(var i=0;i<this.items.length;i++){this.items[i].height=height}};var inalan=inalan||{};inalan.VisuButton=function(text,width,onClickFnc){inalan.VisuData.call(this);this.text=text;this.width=width;this.height=26;this.enabled=true;this.pressed=false;this.onClickFnc=onClickFnc;this.color="#FE6";this.font="bold 14px Arial";this.defaultColor="#FE6";this.overColor="#FB3";this.disabledColor="#EEE"};inalan.VisuButton.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuButton.prototype.constructor=inalan.VisuButton;inalan.VisuButton.prototype.render=function(){if(this.enabled){this.ctx.fillStyle=this.color}else{this.ctx.fillStyle=this.disabledColor}this.ctx.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);this.ctx.strokeStyle="#000";this.ctx.strokeRect(this.x-this.width/2-0.5,this.y-this.height/2-0.5,this.width+1,this.height+1);if(this.enabled){this.ctx.fillStyle="#000"}else{this.ctx.fillStyle="#666"}this.ctx.font=this.font;this.ctx.textAlign="center";this.ctx.textBaseline="alphabetic";this.ctx.fillText(this.text,this.x,this.y+4.5)};inalan.VisuButton.prototype.isOver=function(x,y){if(Math.abs(x-this.x)<=this.width/2&&Math.abs(y-this.y)<=this.height/2){return true}return false};var inalan=inalan||{};inalan.VisuScrollbar=function(label,width,min,max,position,onChange){inalan.VisuData.call(this);this.label=label;if(width<30){width=30}this.width=width;this.enabled=true;this.dragging=false;this.min=min;this.max=max;if(position<min){position=min}if(position>max){position=max}this.position=position;this.color="#FE6";this.defaultColor="#FE6";this.overColor="#FB3";this.disabledColor="#EEE";this.onChange=onChange};inalan.VisuScrollbar.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuScrollbar.prototype.constructor=inalan.VisuScrollbar;inalan.VisuScrollbar.prototype.render=function(){this.ctx.strokeStyle="#000";this.ctx.beginPath();this.ctx.moveTo(this.x-this.width/2-0.5,this.y+0.5);this.ctx.lineTo(this.x+this.width/2+0.5,this.y+0.5);this.ctx.moveTo(this.x-this.width/2-0.5,this.y);this.ctx.lineTo(this.x+this.width/2+0.5,this.y);this.ctx.stroke();if(this.enabled){this.ctx.fillStyle=this.color}else{this.ctx.fillStyle=this.disabledColor}this.ctx.beginPath();var circleX=(this.x-this.width/2+10)+(this.position-this.min)*(this.width-20)/(this.max-this.min+1);var circleY=this.y;this.ctx.arc(circleX,circleY,10,0,2*Math.PI);this.ctx.fill();this.ctx.stroke();this.ctx.fillStyle="#000";this.ctx.font="13px Arial";this.ctx.textAlign="center";this.ctx.textBaseline="alphabetic";this.ctx.fillText(this.label,this.x,this.y-17)};inalan.VisuScrollbar.prototype.isOver=function(x,y){var circleX=(this.x-this.width/2+10)+(this.position-this.min)*(this.width-20)/(this.max-this.min+1);var circleY=this.y;if(Math.sqrt(Math.pow(circleX-x,2)+Math.pow(circleY-y,2))<=10){return true}return false};var inalan=inalan||{};inalan.VisuLabel=function(lines){inalan.VisuData.call(this);this.lines=lines};inalan.VisuLabel.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuLabel.prototype.constructor=inalan.VisuLabel;inalan.VisuLabel.prototype.render=function(){this.ctx.fillStyle="#000";this.ctx.font="14px Arial";this.ctx.textAlign="left";this.ctx.textBaseline="top";for(var i=0;i<this.lines.length;i++){this.ctx.fillText(this.lines[i],this.x,this.y+i*18)}};var inalan=inalan||{};inalan.VisuCode=function(lines){inalan.VisuData.call(this);this.lines=lines;this.selected=[];this.selectionColor="#DEE"};inalan.VisuCode.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuCode.prototype.constructor=inalan.VisuCode;inalan.VisuCode.prototype.render=function(){this.ctx.font="bold 16px Courier New";var maxWidth=0;for(var i=0;i<this.lines.length;i++){if(this.ctx.measureText(this.lines[i]).width>maxWidth){maxWidth=this.ctx.measureText(this.lines[i]).width}}this.ctx.fillStyle=this.selectionColor;for(var i in this.selected){this.ctx.fillRect(this.x,this.y+this.selected[i]*22,maxWidth+40,20)}this.ctx.fillStyle="#000";this.ctx.textAlign="left";this.ctx.textBaseline="top";for(var i=0;i<this.lines.length;i++){this.ctx.fillText(this.lines[i],this.x+20,this.y+1+i*22)}};