var a;
var b;
var c;
var p;

function doSubmit(form) {
	a = new vec2(form.ax.value, form.ay.value);
	b = new vec2(form.bx.value, form.by.value);
	c = new vec2(form.cx.value, form.cy.value);
	p = new vec2(form.px.value, form.py.value);

	for(var i=0; i<form.calcType.length; i++){
		if(form.calcType[i].checked)
		{
			if(form.calcType[i].value == "halfspace")
				 doHalfSpace();
			else if(form.calcType[i].value == "barycentric")
				doBarycentric();
		}
	}	
}

function vec2(x,y){
	this.x = x;
	this.y = y;
}

function crossProduct(a, b){
	return (a.x*b.y)-(a.y*b.x);
}

function orient2d(a, b, p){
	return (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
}
	
function appendText(textIn)
{
    var txtArea = document.getElementById("outVals");
	var txt = document.createTextNode(textIn);
	txtArea.appendChild(txt);
}

function doHalfSpace(){
	appendText("Half-space:" + "\n");
	var v0 = orient2d(b, c, p);
	var v1 = orient2d(c, a, p);
	var v2 = orient2d(a, b, p);
	
	appendText(v0 + "\n");
	appendText(v1 + "\n");
	appendText(v2 + "\n");
	
	var textToAppend = "help";
	if (v0 >= 0 && v1 >= 0 && v2 >= 0)
		textToAppend = "Point p is within triangle";
	else
		textToAppend = "Point p is not within triangle";
		
	appendText(textToAppend + "\n" + "\n");
	return;
}

function doBarycentric() {
	appendText("Barycentric:" + "\n");
	var vs1 = new vec2(b.x-a.x, b.y-a.y);
	var vs2 = new vec2(c.x-a.x, c.y-a.y);
	
	var q = new vec2(p.x-a.x, p.y-a.y);
	var s = crossProduct(q, vs2) / crossProduct(vs1, vs2);
	var t = crossProduct(vs1, q) / crossProduct(vs1, vs2);
	appendText(q.x + ", " + q.y + "\n"); 
	appendText(s + "\n");
	appendText(t + "\n");
	var textToAppend = "Testing";
	
	if (s >= 0 && t >= 0 && s+t <= 1)
		textToAppend = "Point p is within triangle";
	else
		textToAppend = "Point p is not within triangle";
		
	appendText(textToAppend + "\n\n");
	return;
}