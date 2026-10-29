// Literally just start writing code lmao, reference another page's script for drawing (the one in uhhhhhh week3's index.html file? I think?)

// Reference below
/*
function degreesToRadians(degrees)
{
    let radian = degrees*(Math.PI/180);
    return radian;
}

function drawCircle(xPos, yPos, radius, startAngle, endAngle)
{
    ctx.beginPath();
    ctx.arc(xPos, yPos, radius, degreesToRadians(startAngle), degreesToRadians(endAngle));
    ctx.fill();
    ctx.stroke();
}

drawCircle(100,100,100,0,360)
*/

// Set up constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 5.0;

// Draw Square
ctx.fillStyle = "yellow";
ctx.strokeStyle = "black";
ctx.fillRect(85, 301, 101, 101);
ctx.strokeRect(85, 301, 101, 101);

// Draw Line
ctx.strokeStyle = "rgb(255,0,0)"
ctx.beginPath();
ctx.moveTo(85, 682);
ctx.lineTo(278, 549);
ctx.stroke();

// Draw Circle
function degreesToRadians(degrees){
    let radian = degrees*(Math.PI/180);
    return radian;
};

function drawCircle(xPos, yPos, radius, startAngle, endAngle){
    ctx.beginPath();
    ctx.arc(xPos, yPos, radius, degreesToRadians(startAngle), degreesToRadians(endAngle));
    ctx.fill();
    ctx.stroke();
};

ctx.strokeStyle = "red";
ctx.fillStyle = "#ffff00";
drawCircle(385, 441, 66, 0, 360);

// Draw Pentagon
ctx.fillStyle = "#ff00ff"
ctx.strokeStyle = "#00ffff"
ctx.beginPath();
ctx.moveTo(557, 308);
ctx.lineTo(667, 284);
ctx.lineTo(724, 380);
ctx.lineTo(650, 464);
ctx.lineTo(548, 420);
ctx.closePath();
ctx.fill();
ctx.stroke();

// Draw Star
// Same as pentagon but. more.
ctx.fillStyle = "#ffff00";
ctx.strokeStyle = "rgb(32,32,32)";
ctx.beginPath();
ctx.moveTo(635, 496);
ctx.lineTo(667, 554);
ctx.lineTo(733, 567);
ctx.lineTo(687, 616);
ctx.lineTo(696, 681);
ctx.lineTo(636, 653);
ctx.lineTo(575, 681);
ctx.lineTo(584, 617);
ctx.lineTo(538, 567);
ctx.lineTo(604, 554);
ctx.closePath();
ctx.fill();
ctx.stroke();