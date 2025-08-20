export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
};

export const getComputerMove = (squares) => {
  // Basic AI: Look for winning move or block opponent's winning move
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // First, try to win
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === 'O' && squares[b] === 'O' && !squares[c]) return c;
    if (squares[a] === 'O' && squares[c] === 'O' && !squares[b]) return b;
    if (squares[b] === 'O' && squares[c] === 'O' && !squares[a]) return a;
  }

  // Second, block opponent's winning move
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === 'X' && squares[b] === 'X' && !squares[c]) return c;
    if (squares[a] === 'X' && squares[c] === 'X' && !squares[b]) return b;
    if (squares[b] === 'X' && squares[c] === 'X' && !squares[a]) return a;
  }

  // Take center if available
  if (!squares[4]) return 4;

  // Take any available corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(corner => !squares[corner]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(side => !squares[side]);
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }

  return null;
};
