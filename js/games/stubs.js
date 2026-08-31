const DotsGame = { start() { stubGame(); } };
const Checkers = DotsGame, SnakeDuel = DotsGame, PongGame = DotsGame, AirHockey = DotsGame;
const Battleship = DotsGame, CarromGame = DotsGame, LudoGame = DotsGame, SnakesLadders = DotsGame;
const SimonGame = DotsGame, HangmanGame = DotsGame, ReactDuel = DotsGame;
function stubGame() {
  Engine.clearStage().innerHTML =
    '<div style="text-align:center;padding:32px;color:#a89cc8"><div style="font-size:3rem;margin-bottom:12px">🚧</div><p>Full version soon — try Memory, TicTacToe, Connect4 or RPS!</p></div>';
}
