// Week 4 Lab - Experimenting with canvas animation

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var fps = 1000/60;
var timer = setInterval(game, fps);

var startPoint = {x:canvas.width/2, y:canvas.height/2};
var moveDirection = {x:0.8, y:1};

var boxColor = "red";
var shipSprite = {image:document.getElementById("ship"),x:1,y:1,moveX:0,moveY:0};

var acceleration = 0.5
var friction = .95

var score = 0;

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
    stars[i].color = "white";
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
    if(e.key == "w"){
        w = true;
    };
    if(e.key == "s"){
        s = true;
    }
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
    if(e.key == "w"){
        w = false;
    };
    if(e.key == "s"){
        s = false;
    }
})

// Game loop function
function game(){
    // Screen clearing
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Rest of game
    startPoint.x += moveDirection.x;
    startPoint.y += moveDirection.y;

    // collision
    var hitBox = shipSprite.x < startPoint.x + 25 &&
                shipSprite.x + 25 > startPoint.x &&
                shipSprite.y < startPoint.y + 25 &&
                shipSprite.y + 25 > startPoint.y;
    
    if(hitBox == true){
        shipSprite.x = canvas.width/2;
        shipSprite.y = canvas.height/2 + 100;
        shipSprite.moveX = 0;
        shipSprite.moveY = 0;
        score = 0;
    }


    if(a == true){
        // shipSprite.x -= 5
        shipSprite.moveX -= acceleration;

    }

    if(d == true){
        // shipSprite.x += 5
        shipSprite.moveX += acceleration;

    }

    if(w == true){
        // shipSprite.y -= 5
        shipSprite.moveY -= acceleration;

    }

    if(s == true){
        // shipSprite.y += 5
        shipSprite.moveY += acceleration;

    }

    if(shipSprite.x > canvas.width){
        shipSprite.x = -25
    }
    
    if(shipSprite.x < -25){
        shipSprite.x = canvas.width
    }

    if(shipSprite.y > canvas.height){
        shipSprite.y = -25
    }
    
    if(shipSprite.y < -25){
        shipSprite.y = canvas.height
    }

    if(startPoint.y > canvas.height - 25 || startPoint.y < 0){
        moveDirection.y *= -1;
        boxColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    }
    
    if(startPoint.x > canvas.width - 25 || startPoint.x < 0){
        moveDirection.x *= -1;
        boxColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    }
    
    // Adding friction
    shipSprite.moveX *= friction;
    shipSprite.moveY *= friction;

    // ship movement updating
    shipSprite.x += shipSprite.moveX;
    shipSprite.y += shipSprite.moveY;
    
    //Draws Background
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(var i = 0; i < stars.length; i++){
        // drawing "stars"

        if(shipToStarCollision(stars[i])){
            shipSprite.x = canvas.width/2;
            shipSprite.y = canvas.height/2 + 100;
            shipSprite.moveX = 0;
            shipSprite.moveY = 0;
            score = 0;
        }

        stars[i].drawCircle();
        stars[i].y++;
        if(stars[i].y > canvas.height + stars[i].radius *2){
            stars[i].x = Math.random() * canvas.width;
            stars[i].y = -(Math.random() * canvas.height);
            score += 10
            console.log(score)
        }
    }

    ctx.fillStyle = boxColor;
    ctx.fillRect(startPoint.x, startPoint.y, 25, 25);
    ctx.drawImage(shipSprite.image, shipSprite.x, shipSprite.y, 25, 25);

    // fillstyle change
    ctx.fillStyle = "white";

    // HUD Element
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`,20,40)

}

function shipToStarCollision(star){
    // Checks distances
    var closestX = Math.max(shipSprite.x, Math.min(star.x, shipSprite.x + 25));
    var closestY = Math.max(shipSprite.y, Math.min(star.y, shipSprite.y + 25));

    // Assigns distances
    var dx = star.x - closestX
    var dy = star.y - closestY

    // Return the distance
    var dist = (dx * dx) + (dy * dy);
    return dist <= (star.radius * star.radius)
}