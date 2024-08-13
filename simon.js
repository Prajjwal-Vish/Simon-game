
var buttonColours = ["red", "blue", "green", "yellow"];
var sequence = [];
var userClickedPattern = [];

function playSound(buttonColor){
        var sound = "sounds/" + buttonColor + ".mp3";
        var audio = new Audio(sound);
        audio.play();
}
function pressAnimation(colour)
{
    $("."+colour).addClass("pressed");
    setTimeout(function(){
        $("."+colour).removeClass("pressed")} , 100
    )
}
// playSound("green");
playSound("red");
playSound("green");
playSound("blue");
playSound("yellow");

$(".btn").click(function(){
    var colour = $(this).attr('id');
    userClickedPattern.push(colour);
    playSound(colour);
    pressAnimation(colour);
    checkAnswer(userClickedPattern.length -1);
})
console.log(userClickedPattern);

var level = 0;
var started = false;
var gameOver = false;
//sequence function
function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    var num = Math.floor(Math.random()*4);
    var colour = buttonColours[num];

    sequence.push(buttonColours[num]);

    

    $("#"+colour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    var soundSource = "./sounds/" +colour+ ".mp3";
    console.log(soundSource);
    var audio = new Audio("sounds/" +colour+ ".mp3");
    audio.play();
}

function gameover()
{
    level = 0;
    sequence = [];
    started =false;
}

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started =true;
    }
        

})

function checkAnswer(currentLevel)
{
    if(sequence[currentLevel] === userClickedPattern[currentLevel])
    {
        if(sequence.length === userClickedPattern.length)
        {
            setTimeout(
                nextSequence(),1000
            );
        }
    }
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        gameover();
    }
}
 