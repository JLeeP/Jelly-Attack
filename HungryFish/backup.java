
var fish;
function startGame(){
	myGameArea.start();
	fish= new component(10, 10, 'smallfish.png', 0,100."image");
}
var myGameArea ={
	canvas : document.createElement ("canvas"),
	start : function(){
		this.canvas.width = 480;
		this.canvas.height = 320;
		this.context = this.canvas.getContext("2d");
		document.body.appendChild(this.canvas);
		this.interval = setInterval(updateGameArea, 20);
		window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
	clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
};

function component (width, height, x,y,type){
	this.type = type
	if (type == "image"){
		this.image = new Image();
		this.image.src = color;
	}
	this.GameArea = myGameArea;
	this.width=width;
	this.height=height;
	this.x = x;
	this.y = y;
    this.speedY = 0;
	this.update = function(){
		ctx = myGameArea.context;
		if (type == "image"){
			ctx.drawImage(this.image,
				this.x,
				this.y,
				this.width,this.height):
		}else {
			ctx.fillstyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}	
	}	
	this.newPos = function(){
		this.y += this.speedY;
	}
}

function updateGameArea(){
	myGameArea.clear();
	fish.speedY = 0;
	if (myGameArea.key && myGameArea.key == 38) {fish.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {fish.speedY = 1; }
    fish.newPos();    
    fish.update();
}

