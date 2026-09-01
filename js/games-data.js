const GAMES = [
  {id:"memory",name:"Memory Magic",color:"linear-gradient(145deg,#5b21b6,#a78bfa)",desc:"Flip cards and find matching pairs.",tags:["Classic","Puzzle"],players:"2P / Bot",difficulty:"Easy"},
  {id:"tictactoe",name:"Tic Tac Toe",color:"linear-gradient(145deg,#9f1239,#fb7185)",desc:"Get three in a row.",tags:["Classic"],players:"2P / Bot",difficulty:"Easy"},
  {id:"connect4",name:"Connect 4",color:"linear-gradient(145deg,#1e3a8a,#38bdf8)",desc:"Drop discs — connect four.",tags:["Classic","Strategy"],players:"2P / Bot",difficulty:"Easy"},
  {id:"rps",name:"Rock Paper Scissors",color:"linear-gradient(145deg,#9a3412,#fb923c)",desc:"Best of rounds.",tags:["Classic","Quick"],players:"2P / Bot",difficulty:"Easy"},
  {id:"dots",name:"Dots & Boxes",color:"linear-gradient(145deg,#065f46,#34d399)",desc:"Claim lines, complete boxes.",tags:["Strategy"],players:"2P / Bot",difficulty:"Medium"},
  {id:"checkers",name:"Checkers",color:"linear-gradient(145deg,#78350f,#b45309)",desc:"Jump and capture.",tags:["Strategy","Board"],players:"2P / Bot",difficulty:"Medium"},
  {id:"snake",name:"Snake Duel",color:"linear-gradient(145deg,#14532d,#22c55e)",desc:"Grow longer, don't crash.",tags:["Arcade"],players:"2P / Bot",difficulty:"Medium"},
  {id:"pong",name:"Pong Duel",color:"linear-gradient(145deg,#0f172a,#475569)",desc:"Classic paddle battle.",tags:["Arcade"],players:"2P / Bot",difficulty:"Easy"},
  {id:"airhockey",name:"Air Hockey",color:"linear-gradient(145deg,#1e3a8a,#6366f1)",desc:"Score goals with the puck.",tags:["Arcade","Sports"],players:"2P / Bot",difficulty:"Medium"},
  {id:"battleship",name:"Battleship",color:"linear-gradient(145deg,#0c4a6e,#0e7490)",desc:"Hunt the fleet.",tags:["Strategy"],players:"2P / Bot",difficulty:"Medium"},
  {id:"carrom",name:"Carrom",color:"linear-gradient(145deg,#78350f,#d97706)",desc:"Strike coins into pockets.",tags:["Board","Classic"],players:"2P / Bot",difficulty:"Medium"},
  {id:"ludo",name:"Ludo",color:"linear-gradient(145deg,#7f1d1d,#dc2626)",desc:"Race tokens home.",tags:["Board","Classic"],players:"2P / Bot",difficulty:"Easy"},
  {id:"snakesladders",name:"Snakes & Ladders",color:"linear-gradient(145deg,#166534,#4ade80)",desc:"Climb ladders, avoid snakes.",tags:["Board","Classic"],players:"2P / Bot",difficulty:"Easy"},
  {id:"simon",name:"Simon Says",color:"linear-gradient(145deg,#312e81,#8b5cf6)",desc:"Repeat the color sequence.",tags:["Memory","Arcade"],players:"2P / Bot",difficulty:"Medium"},
  {id:"hangman",name:"Hangman",color:"linear-gradient(145deg,#1e293b,#f97316)",desc:"Guess the word.",tags:["Word"],players:"2P / Bot",difficulty:"Medium"},
  {id:"react",name:"Reaction Duel",color:"linear-gradient(145deg,#713f12,#facc15)",desc:"Fastest reaction wins.",tags:["Arcade"],players:"2P / Bot",difficulty:"Easy"}
];
if (typeof GAME_IMAGES !== 'undefined') {
  GAMES.forEach(g => { if (GAME_IMAGES[g.id]) g.image = GAME_IMAGES[g.id]; });
}
