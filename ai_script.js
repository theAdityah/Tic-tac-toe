        const board = document.getElementById('ticTacToeBoard');
        const cells = Array.from({ length: 9 }, (_, i) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            board.appendChild(cell);
            return cell;
        });

        let currentPlayer = 'X';
        let boardState = Array(9).fill(null);

        // Event listeners for choosing X or O
        document.getElementById('chooseX').addEventListener('click', () => startGame('X'));
        document.getElementById('chooseO').addEventListener('click', () => startGame('O'));

        function startGame(player) {
            currentPlayer = player;
            document.querySelector('.choice').style.display = 'none'; // Hide choice buttons
            board.style.visibility = 'visible'; // Show the game board

            // If user chooses O, AI makes a random move
            if (currentPlayer === 'O') {
                makeAiRandomMove();
                currentPlayer = 'X'; // Switch to user's turn after AI's move
            }
        }

        function checkWinner(state) {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (state[a] && state[a] === state[b] && state[a] === state[c]) {
                    return state[a];
                }
            }

            return state.includes(null) ? null : 'Draw';
        }

        function handleClick(event) {
            const cell = event.target;
            const index = cell.dataset.index;

            if (boardState[index] || checkWinner(boardState)) {
                return;
            }

            makeMove(index, currentPlayer);
            if (!checkWinner(boardState)) {
                makeAiMove();
            }
        }

        function makeMove(index, player) {
            boardState[index] = player;
            cells[index].textContent = player;

            const winner = checkWinner(boardState);
            if (winner) {
                setTimeout(() => {
                    alert(winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`);
                    resetGame();
                }, 100);
            }
        }

        function makeAiRandomMove() {
            const availableMoves = boardState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            makeMove(randomMove, 'O');
        }

        function makeAiMove() {
            const bestMove = getBestMove(boardState, 'O');
            makeMove(bestMove.index, 'O');
        }

        function getBestMove(state, player) {
            const opponent = player === 'O' ? 'X' : 'O';
            const winner = checkWinner(state);

            if (winner === 'O') return { score: 1 };
            if (winner === 'X') return { score: -1 };
            if (winner === 'Draw') return { score: 0 };

            const moves = [];

            state.forEach((cell, index) => {
                if (cell === null) {
                    const newState = [...state];
                    newState[index] = player;
                    const result = getBestMove(newState, opponent);
                    moves.push({ index, score: result.score });
                }
            });

            if (player === 'O') {
                return moves.reduce((bestMove, move) => move.score > bestMove.score ? move : bestMove, moves[0]);
            } else {
                return moves.reduce((bestMove, move) => move.score < bestMove.score ? move : bestMove, moves[0]);
            }
        }

        function resetGame() {
            boardState = Array(9).fill(null);
            cells.forEach(cell => cell.textContent = '');
            currentPlayer = 'X';
            board.style.visibility = 'hidden'; // Hide the board until a new game starts
            document.querySelector('.choice').style.display = 'block'; // Show choice buttons again
        }

        cells.forEach(cell => cell.addEventListener('click', handleClick));
