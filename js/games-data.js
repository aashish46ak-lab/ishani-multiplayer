const GAMES = [
  { id: 'memory', name: 'Memory Magic', emoji: '🧠', color: 'linear-gradient(135deg, #7b2cbf, #c77dff)', desc: 'Flip cards and find matching pairs.', tags: ['Classic', 'Puzzle'], players: '2P / Bot', difficulty: 'Easy' },
  { id: 'tictactoe', name: 'Tic Tac Toe', emoji: '❌', color: 'linear-gradient(135deg, #ff4d6d, #ff8fa3)', desc: 'Three in a row wins.', tags: ['Classic', 'Quick'], players: '2P / Bot', difficulty: 'Easy' },
  { id: 'connect4', name: 'Connect Four', emoji: '🔴', color: 'linear-gradient(135deg, #4361ee, #4cc9f0)', desc: 'Drop discs and connect four.', tags: ['Strategy', 'Classic'], players: '2P / Bot', difficulty: 'Medium' },
  { id: 'rps', name: 'Rock Paper Scissors', emoji: '✊', color: 'linear-gradient(135deg, #f72585, #b5179e)', desc: 'Best of rounds with score tracking.', tags: ['Quick', 'Classic'], players: '2P / Bot', difficulty: 'Easy' },
  { id: 'dots', name: 'Dots & Boxes', emoji: '📦', color: 'linear-gradient(135deg, #2d6a4f, #95d5b2)', desc: 'Claim lines, complete boxes.', tags: ['Strategy'], players: '2P / Bot', difficulty: 'Medium' },
  { id: 'checkers', name: 'Checkers', emoji: '♟️', color: 'linear-gradient(135deg, #6d4c41, #a1887f)', desc: 'Classic draughts.', tags: ['Strategy'], players: '2P / Bot', difficulty: 'Hard' },
  { id: 'snake', name: 'Snake Duel', emoji: '🐍', color: 'linear-gradient(135deg, #1b4332, #52b788)', desc: 'Two snakes, one arena.', tags: ['Arcade'], players: '2P / Bot', difficulty: 'Medium' },
  { id: 'pong', name: 'Pong', emoji: '🏓', color: 'linear-gradient(135deg, #0d1b2a, #415a77)', desc: 'The original arcade classic.', tags: ['Arcade'], players: '2P / Bot', difficulty: 'Medium' },
  { id: 'airhockey', name: 'Air Hockey', emoji: '🏒', color: 'linear-gradient(135deg, #023e8a, #48cae4)', desc: 'Fast-paced table hockey.', tags: ['Arcade'], players: '2P / Bot', difficulty: 'Medium' },
  { id: 'battleship', name: 'Battleship', emoji: '🚢', color: 'linear-gradient(135deg, #1d3557, #457b9d)', desc: 'Hunt the enemy ships.', tags: ['Strategy'], players: '2P / Bot', difficulty: 'Medium' },
  { id: 'carrom', name: 'Carrom', emoji: '🎯', color: 'linear-gradient(135deg, #5c4033, #c4a484)', desc: 'Pocket the coins.', tags: ['Skill'], players: '2P / Bot', difficulty: 'Medium' },
  { id: 'ludo', name: 'Ludo Race', emoji: '🎲', color: 'linear-gradient(135deg, #e63946, #f4a261)', desc: 'Race your tokens home.', tags: ['Board'], players: '2P / Bot', difficulty: 'Easy' },
  { id: 'snakesladders', name: 'Snakes & Ladders', emoji: '🐍', color: 'linear-gradient(135deg, #2a9d8f, #e9c46a)', desc: 'Climb ladders, avoid snakes.', tags: ['Board'], players: '2P / Bot', difficulty: 'Easy' },
  { id: 'simon', name: 'Simon Says', emoji: '🎵', color: 'linear-gradient(135deg, #7209b7, #f72585)', desc: 'Repeat the sequence.', tags: ['Memory'], players: '2P / Bot', difficulty: 'Medium' },
  { id: 'hangman', name: 'Hangman Duel', emoji: '✍️', color: 'linear-gradient(135deg, #264653, #e76f51)', desc: 'Guess the word.', tags: ['Word'], players: '2P / Bot', difficulty: 'Medium' },
  { id: 'react', name: 'Reaction Duel', emoji: '⚡', color: 'linear-gradient(135deg, #ffba08, #faa307)', desc: 'Fastest reaction wins.', tags: ['Arcade'], players: '2P / Bot', difficulty: 'Easy' }
];
