
//var currentPos = 0;
var animate1Interval, animate2Interval, canvas, ctx, score;
var squares = [];
var count = 1;

function stop()  {
     clearInterval(animate1Interval);
     clearInterval(animate2Interval);
     ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
     squares = [];
}

function play() {
  requestAnimationFrame(animate);
     score = document.getElementById('score');
     score.innerHTML = 0;
     count = 1;
}

function animate() {  
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d'); 
   
  function Square (x, y, w, h) {
  	this.x = Math.random() * 620;
  	this.y = y;
    this.w = w;
    this.h = h;
  	this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);
    this.rgba = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", 1)";

    this.draw = function() {
      ctx.fillStyle = this.rgba;
      ctx.fillRect(this.x, this.y, 20, 20);
      this.update();
    }

    this.update = function() {
      this.y += Math.random() * 3;
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    for(i = 0; i < squares.length; i++)
        squares[i].draw();
    update();
  }

  function update() {
    for (var i = 0; i < squares.length; i++) {
      squares[i].update();
    }
  }

  animate1Interval = setInterval( function() {
    
    squares.push(new Square(0, 0, 20, 20))
  },1000);

  animate2Interval = setInterval(draw, 20);
    
    var isCursorInSquares = function(x, y, squares) {
    return  x > squares.x && x < squares.x + squares.w + 8 && 
            y > squares.y && y < squares.y + squares.h + 20;
    }

  canvas.onclick = function(e) {
    var x = e.pageX;
        y = e.pageY;

    for(var i = squares.length - 1; i >= 0; --i){
      if(isCursorInSquares(x, y, squares[i])) { 
        delete squares.splice(i, 1);
        score.innerHTML = count++;
      } 
    }
  } 
}


