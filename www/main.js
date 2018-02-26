var canvas = document.getElementById("paint-board");
canvas.width = $(window).width();
canvas.height = $(window).height();

var ctx = canvas.getContext("2d");

var lastPos = [0, 0];
var color = "red";
var lineWidth = 5;
var shape = "line";

var down = false;

//alert("start");
$( "#paint-board" ).on("touchstart mousedown", function( event ) {
    //alert("down");
    down = true;
});

$( "#paint-board" ).on("touchmove mousemove", function( event ) {
    var touch = event.originalEvent.touches[0];
    //alert(touch)
    if (shape == "line" && down){
        //alert("line");
        //ctx.fillRect(event.pageX, event.pageY, 10, 10);
        ctx.lineWidth=lineWidth;
        ctx.strokeStyle = color;
        ctx.beginPath(); 
        // Staring point (10,45)
        if (lastPos[0] != 0){
            ctx.moveTo(lastPos[0], lastPos[1]);
        } else {
            ctx.moveTo(touch.pageX, touch.pageY);
        }
        // End point (180,47)
        ctx.lineTo(touch.pageX, touch.pageY);
        // Make the line visible
        ctx.stroke();
        lastPos = [touch.pageX, touch.pageY];
    } else if (shape == "triangle" && down){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(touch.pageX, touch.pageY);
        ctx.lineTo(touch.pageX+25,touch.pageY+25);
        ctx.lineTo(touch.pageX+25,touch.pageY-25);
        ctx.fill();
    }
    
});

$("#paint-board").on("touchend mouseup", function(){
   console.log("up");
   lastPos = [0, 0]; 
   down = false;
});

$(".color").click(function(){
    color = $(this).attr("id");
});

$(".control").click(function(){
   if ($(this).attr("id") == "+"){
       if (lineWidth < 25){
           lineWidth += 1;
       }
       
   } else {
       if (lineWidth > 1){
           lineWidth -= 1;
       }
       
   }
   
   $(".zoom").html(lineWidth);
});

$("#clear").click(function(){
   ctx.clearRect(0, 0, 70000, 70000); 
});

$("#default").click(function(){
    lineWidth = 5;
    $(".zoom").html(lineWidth);
});

$("#triangle").click(function(){
   if (shape != "triangle"){
       shape = "triangle";
   } else {
       shape = "line";
   }
});