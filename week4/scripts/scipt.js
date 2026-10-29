// Week 4 Lab - Experimenting with canvas animation

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var fps = 1000/60;
var timer = setInterval(game, fps);

var startPoint = {x:canvas.width/2, y:canvas.height/2};
var moveDirection = {x:0.8, y:1};

var boxColor = "red";
var shipSprite = {image:document.getElementById("ship"),x:1,y:1,moveX:0,moveY:0};

function createStar(){
    var star = {
        x:0,
        y:0,
        radius:0,
        color: "black",
        drawCircle:function(){
            ctx.beginPath();
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            ctx.fill();
        },
    }
    return star;
}

var starCount = 50;
// an array for each of the "stars" created by the for loop
var stars = [];

for(var i = 0; i < starCount; i++){
    stars[i] = createStar();
    stars[i].x = Math.random()*canvas.width;
    stars[i].y = Math.random()*canvas.height;
    stars[i].radius = Math.random() * 10;
}


shipSprite.x = canvas.width/2
shipSprite.y = canvas.height/2 + 100;

var a = false;
var d = false;
var w = false;
var s = false;

// On key pressed
document.addEventListener("keydown", function(e){
    console.log(e.key);
    if(e.key == "a"){
        a = true;
    };
    if(e.key == "d"){
        d = true;
    };
})

// On key released
document.addEventListener("keyup", function(e){
    console.log(e.key);
    if(e.key == "a"){
        a = false;
    };
    if(e.key == "d"){
        d = false;
    };
})

// Game loop function
function game(){
    // Screen clearing
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Rest of game
    startPoint.x += moveDirection.x;
    startPoint.y += moveDirection.y;

    if(a == true){
        shipSprite.x -= 5
    }

    if(d == true){
        shipSprite.x += 5
    }

    if(shipSprite.x > canvas.width){
        shipSprite.x = -25
    }
    
    if(shipSprite.x < -25){
        shipSprite.x = canvas.width
    }

    if(startPoint.y > canvas.height - 25 || startPoint.y < 0){
        moveDirection.y *= -1;
        boxColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    }
    
    if(startPoint.x > canvas.width - 25 || startPoint.x < 0){
        moveDirection.x *= -1;
        boxColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    }
    
    for(var i = 0; i < stars.length; i++){
        // drawing "stars"
        stars[i].drawCircle();
    }

    ctx.fillStyle = boxColor;
    ctx.fillRect(startPoint.x, startPoint.y, 25, 25);
    ctx.drawImage(shipSprite.image, shipSprite.x, shipSprite.y, 25, 25);
}