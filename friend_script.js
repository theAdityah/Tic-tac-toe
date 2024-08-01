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

            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;

            const winner = checkWinner(boardState);
            if (winner) {
                setTimeout(() => {
                    alert(winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`);
                    resetGame();
                }, 100);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        function resetGame() {
            boardState = Array(9).fill(null);
            cells.forEach(cell => cell.textContent = '');
            currentPlayer = 'X';
        }

        cells.forEach(cell => cell.addEventListener('click', handleClick));
