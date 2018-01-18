barrier = 0;
function reset() {
 
 phase = "start";
 btnState = false;
 activegame = false;
credits = 0;
updateCredits();
$("#map").attr("src", "path.png")
happy = 0; 
jobLove = "";
learnValue = Math.floor(20 + Math.random() * 30);
risk = false;
$("#win").hide();
$("#right").hide();
$("#instr").html("> S to start");
$("#myBar").css("width", "0%");
$(".btn").hide();
$("#warning").hide();
}
reset();

var startText = ">The goal of this game is to get 1000 credits. You do this by following the direction which take you along the path,  \
which you can see on the right. <br> \
             >Following the path will guarantee you 1000 credits, but if you REALLY want to you can deviate from the path by clicking \
             the button.<br> \
             Press \"S\" to continue";
var studyText = ">Keep entering \"Study\" until the bar fills up.";
var majorChoices = ">Looks like you learned a lot. Now enter your choice from one of these career areas: <ul><li>STEM</li> \
<li>STEM</li> <li>STEM</li> \
<li>STEM</li><li>STEM</li></ul>";
var work = ">Wow good choice! Keep entering \"Work\" until the bar fills up."
var easyPathBad = "But you entered \"Study\" and \"Work\" into a computer over 20 times, so did you really? You conformed to the \
directions of this game. \
Try playing it again but go off the path this time.";
var easyPathOk = "You conformed to the directions of this game and it was ok. But you have lingering regret about what you could have \
done. \
Try playing it again but go off the path this time.";
var easyPathGood = "You conformed to the directions of this game and it was worth it. But you have lingering regret about what you \
could have done. \
Try playing it again but go off the path this time.";
var offPath = "You didn't conform. Whether or not you failed, you found out who you were.";

//prevents copy and paste
$('#inp').bind("cut copy paste",function(e) {
        if(phase == "study" || phase == "work") {
         $("#cp").show();
        }
        e.preventDefault();
    });
$('#inp').keyup(function(e){
       
        if(e.keyCode == 13)
        {
            input = $("#inp").val();
            $("#inp").val("");
            respond(input);
        }
	 });
function respond(input) {
 if(btnState) {
  if(phase == "study") {
   if(input == "n" || input == "N") {
    btnState = false;
    $("#norm").show();
    $("#warning").hide();
   }
   if(input == "Y" || input == "y") {
    barrier -= 10;
    if(barrier < 0) {
     barrier = 0;
    }
    happy += 10;
    btnState = false;
    credits -= barrier;
    $("#norm").hide();
    activegame = true;
    $("#duckgame").show();
    $("#inp").hide();
    startGame();
   }
  }
 }
   if(phase == "start") {
      if(input == "s" || input == "S"){
         phase = "rules";
         setup();
         return;
      }
   }
   if(phase == "rules") {
     if(input == "s" || input == "S") {
      phase = "study";
      setup();
      return;
     }
   }
   if(phase == "study") {
     if(input == "study" || input == "Study") {
      credits += learnValue;
      var percent = credits / 500 * 100;
      $("#myBar").css("width", percent + "%");
     updateCredits();
      if(credits >= 500) {
       credits = 500;
       phase = "majors";
       setup();
       return;
      }
     }
   }
   if(phase == "majors") {
    if(input == "stem" || input == "STEM" || input == "Stem") {
     credits += 50;
     updateCredits();
     var rand = Math.random();
     if(rand < .2) {
      jobLove = "sad";
      happy += 10;
     }
     else if(rand < .9) {
      jobLove = "ok";
      happy += 30;
     }
     else {
      jobLove = "happy";
      happy += 50;
     }
     phase = "work";
     setup();
     return;
    }
   }
   if(phase == "work") {
    if(input == "work" || input == "Work") {
     credits += happy;
    var percent = (credits - 550) / 450 * 100;
      $("#myBar").css("width", percent + "%");
     updateCredits();
      if(credits >= 1000) {
       phase = "win";
       setup();
       return;
      }
    }
    
   }
   if(phase == "win") {
    if(input == "S" || input == "s") {
     //reset
     reset();
    }
   }
}

function setup() {
 switch(phase) {
  case "rules":
     $("#instr").html(startText);
     $(".btn").show();
     $("#right").show();
     $("#map").attr("src", "path.png");
     break;
  case "study":
     $("#myProgress").show();
     $("#instr").html(studyText);
     $("#map").attr("src", "path_start.png");
     break;
   case "majors":
     $("#myProgress").hide();
     $("#cp").hide();
     $("#instr").html(majorChoices);
     $("#map").attr("src", "path_middle.png");
     $(".btn").hide();
     break;
   case "work":
     $("#myBar").css("width", "0%");
     updateCredits();
    $("#myProgress").show();
     $("#instr").html(work);
     $("#map").attr("src", "path_work.png");
     $(".btn").hide();
     break;
    case "win":
     
     $("#myProgress").hide();
     $("#cp").hide();
     $("#instr").html("Press S to play again.");
     $("#win").show();
     $("#map").attr("src", "path_end.png");
     var endtext;
     if(risk == false) {
      barrier += 10;
      if(jobLove == "sad") {
       endtext = easyPathBad;
      }
      if(jobLove == "ok") {
       endtext = easyPathOk;
      }
      if(jobLove == "happy") {
       endtext = easyPathGood;
      }
     }
     if(risk) {
      endtext = offPath;
     }
     $("#win p").html(endtext);
    
 }
 
}

function updateCredits() {
 $("#credits").html("Credits: " + credits);
}
function btnResponse() {
 if(phase == "rules") {
  return;
 }
 $("#norm").hide();
 $("#warning").show();
 $("#warning").html("Are you sure you want to go off the path? You will lose " + barrier + " credits but can gain or lose 200 \
 credits.Press \"Y\" to go off the path or \"N\" to stay on the path.");
 btnState = true; 
}

function startGame(){
 risk = true;
 $("#warning").hide();
 time = 30;
 timer = setInterval(function() {
  time--;
  $("#timer").html("Seconds left: " + time);
  if(time <= 0) {
   clearInterval(duck);
   $("#inp").show();
   $("#duckgame").hide();
  $("#norm").show();
  credits -= 200;
  updateCredits();
  clearInterval(checkTouching);
   clearInterval(timer);
  }
 }, 1000);
 duck = setInterval(function() {
     $("#duck").css("margin-left", Math.random() * 470 + "px");
     $("#duck").css("margin-top", Math.random() * 280 + "px");
 }, 2000);
 checkTouching = setInterval(function() {
  var xB = parseInt($("#boat").css("margin-left"));
  var yB = parseInt($("#boat").css("margin-top"));
  var xD = parseInt($("#duck").css("margin-left"));
  var yD = parseInt($("#duck").css("margin-top"));
  if(Math.abs(xB - xD) <= 50 && Math.abs(yB - yD) <= 20) {
   console.log("true");
   credits += 200;
   clearInterval(duck);
   clearInterval(checkTouching);
   updateCredits();
   $("#inp").show();
   $("#duckgame").hide();
  $("#norm").show();
  $("#warning").hide();
   clearInterval(timer);
   activegame = false;
  }      
 }, 300);
 $('body').keydown(function(e){
  if(!activegame) {
   return;
  }
        //get current pos
        var x = parseInt($("#boat").css("margin-left"));
        var y = parseInt($("#boat").css("margin-top"));
        if(e.keyCode == 87) //UP
        {
            y -= 20;
        }
        if(e.keyCode == 83) //down
        {
            y += 20;
        }
        if(e.keyCode == 65) //left
        {
            x -= 20;
        }
        if(e.keyCode == 68) //right
        {
            x += 20;
        }
        $("#boat").css("margin-left", x + "px");
        $("#boat").css("margin-top", y + "px");
	 });
}
