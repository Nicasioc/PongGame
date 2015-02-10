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
            resetScore();
            ball.resetPosition();
            player1.resetPosition();
            player2.resetPosition();
        });
        $("#menu").on("click", function() {
            $("#intro").fadeIn();
        })
    }
}
function resetScore() {
    document.getElementById(player1.id).innerHTML = player1.name +": "+ 0; 
    document.getElementById(player2.id).innerHTML = player2.name +": "+ 0; 
}

$(document).ready(function() {
    $(".startButton").on("click", function(e) {
        e.preventDefault();
        resetScore();
        ball.resetPosition();
        player1.name = $("#player1Name").val()||"Player 1";
        player2.name = $("#player2Name").val()||"Player 2";
        resetScore();
        $("#intro").fadeOut();
    });
    $("#bot").on("click", function(e) {
        e.preventDefault();
        playBot = true;
    })
});