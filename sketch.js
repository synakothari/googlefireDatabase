var ball;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //ball position var stores the x and y values
    var ballPosition = database.ref("ball/position")
    //monitor the position
    ballPosition.on("value",readPosition,showError)
    


}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        //writePosition updates the x and y values in the database 
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        x:ball.x+x, //ball.x is the ball's current position in the game + how much it is moved is the x. x is node in database
        y:ball.y+y
    })


}
function readPosition(data){
    position = data.val()//data.val() contains both x and y
    ball.x = position.x;
    ball.y = position.y;
}

function showError()
{
    console.log("data not recieved from the database");
}