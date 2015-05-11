function updateScore( player ) {
    player.score+=1;
    document.getElementById(player.id).innerHTML = player.name +": "+ player.score; 
    $endGame = $("#endGame");

    if ( player.score > SCORE_TO_WIN ) {
        createjs.Sound.play("gameOver");
        createjs.Ticker.paused = true;
        $endGame.fadeIn();
        $endGame.find(".name").html(player.name);
        $(".endGameButton").on("click", function() {
            $endGame.fadeOut();
            //resetScore();
            ball.resetPosition();
            players[0].resetPosition();
            players[1].resetPosition();
        });
        $("#menu").on("click", function() {
            $("#intro").fadeIn();
        })
    }
}
function resetScore() {
    document.getElementById(players[0].id).innerHTML = players[0].name +": "+ 0; 
    document.getElementById(players[1].id).innerHTML = players[1].name +": "+ 0; 
}

$(document).ready(function() {
    $(".startButton").on("click", function(e) {
        e.preventDefault();
        //resetScore();
        ball.resetPosition();
        players[0].name = $("#player1Name").val()||"Player 1";
        players[1].name = $("#player2Name").val()||"Player 2";
        //resetScore();
        $("#intro").fadeOut();
    });
    $("#bot").on("click", function(e) {
        e.preventDefault();
        playBot = true;
    })
});