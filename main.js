// Color Guessing Game Logic
class ColorGuessingGame {
    constructor() {
        this.colors = [
            'red', 'blue', 'green', 'yellow', 
            'purple', 'orange', 'pink', 'brown', 
            'cyan', 'magenta', 'lime', 'teal'
        ];
        this.colorBox = document.querySelector('[data-testid="colorBox"]');
        this.colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
        this.gameStatus = document.querySelector('[data-testid="gameStatus"]');
        this.scoreElement = document.querySelector('[data-testid="score"]');
        this.newGameButton = document.querySelector('[data-testid="newGameButton"]');
        this.score = 0;

        this.initializeGame();
        this.addEventListeners();
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    initializeGame() {
        // Select target color
        this.targetColor = this.getRandomColor();
        this.colorBox.style.backgroundColor = this.targetColor;

        // Create color options including the target color
        const gameColors = [...new Set([
            this.targetColor, 
            this.getRandomColor(), 
            this.getRandomColor(), 
            this.getRandomColor(), 
            this.getRandomColor(), 
            this.getRandomColor()
        ])];

        // Ensure we have 6 unique colors
        while (gameColors.length < 6) {
            const newColor = this.getRandomColor();
            if (!gameColors.includes(newColor)) {
                gameColors.push(newColor);
            }
        }

        // Shuffle colors and set background
        const shuffledColors = this.shuffleArray(gameColors);
        this.colorOptions.forEach((option, index) => {
            option.style.backgroundColor = shuffledColors[index];
        });

        // Reset status and clear previous messages
        this.gameStatus.textContent = '';
        // this.gameStatus.style.color = 'black';
    }

    checkGuess(selectedColor) {
        if (selectedColor === this.targetColor) {
            this.score++;
            this.scoreElement.textContent = `Score: ${this.score}`;
            this.gameStatus.textContent = 'You matched correctly!';
            this.gameStatus.style.color = 'green';
            
            // Slight delay before next round
            setTimeout(() => this.initializeGame(), 1000);
        } else {
            this.gameStatus.textContent = 'Wrong! Click on "New game" to try again ';
            this.gameStatus.style.color = 'red';
        }
    }

    addEventListeners() {
        // Add click listeners to color options
        this.colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.checkGuess(option.style.backgroundColor.replace(/\s/g, ''));
            });
        });

        // New game button
        this.newGameButton.addEventListener('click', () => {
            this.score = 0;
            this.scoreElement.textContent = 'Score: 0';
            this.initializeGame();
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ColorGuessingGame();
});