var myGamePiece;
var myObstacle;
var myScore;
var score;

function startGame() {
    myGamePiece = new component(20, 20, "RED.png", 10, 120, "image");
	myScore = new component("30px", "Consolas", "black", 800, 100, "text");
    myGameArea.start();
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0; 
		this.interval = setInterval(updateGameArea, 20);
		window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
function component(width, height, color, x, y, type) {
	this.type = type;
	if (type == "image"){
		this.image = new Image();
		this.image.src = color;
	}
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; 
    this.x = x;
    this.y = y; 
    this.update = function() {
		ctx = myGameArea.context;
		if (type == "image"){
			ctx.drawImage(this.image,
					this.x,
					this.y,
					this.width,this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
    }
    this.crashWith = function(otherobj, type) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
}


var myObstacles = [];

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(40, height, "jellyBK.png", x, 0, "image"));
        myObstacles.push(new component(40, x - height - gap, "jellyBK.png", x, height + gap, "image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1 * (myGameArea.frameNo * 0.003);
        myObstacles[i].update();
		if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
   else if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
   else if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
   else if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
   else{ myGamePiece.speedY = 0;}
    }
	myScore.text="SCORE: " + myGameArea.frameNo;
  	  myScore.update();
    myGamePiece.newPos(); 
    myGamePiece.update();



	document.getElementById('score').innerHTML = myGameArea.frameNo;
	
	
}