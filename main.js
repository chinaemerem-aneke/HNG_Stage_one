//  * Class representing a color guessing game
class ColorGuessingGame {
    // Constants
    static ANIMATION_DELAYS = {
        CORRECT_ANSWER: 1000,
        WRONG_ANSWER: 500
    };

    static COLORS = [
        'red', 'blue', 'green',
        'yellow', 'purple','pink'
    ];

    static DOM_SELECTORS = {
        colorBox: '[data-testid="colorBox"]',
        colorOption: '[data-testid="colorOption"]',
        gameStatus: '[data-testid="gameStatus"]',
        score: '[data-testid="score"]',
        newGameButton: '[data-testid="newGameButton"]'
    };

    /**
     * Initialize the game and set up DOM elements
     */
    constructor() {
        this.initializeDOMElements();
        this.score = 0;
        this.initializeGame();
        this.addEventListeners();
    }


    initializeDOMElements() {
        this.colorBox = document.querySelector(ColorGuessingGame.DOM_SELECTORS.colorBox);
        this.colorOptions = document.querySelectorAll(ColorGuessingGame.DOM_SELECTORS.colorOption);
        this.gameStatus = document.querySelector(ColorGuessingGame.DOM_SELECTORS.gameStatus);
        this.scoreElement = document.querySelector(ColorGuessingGame.DOM_SELECTORS.score);
        this.newGameButton = document.querySelector(ColorGuessingGame.DOM_SELECTORS.newGameButton);
    }


    // Get a random color from the available colors
    getRandomColor() {
        return ColorGuessingGame.COLORS[Math.floor(Math.random() * ColorGuessingGame.COLORS.length)];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }


    generateGameColors() {
        const gameColors = new Set([this.targetColor]);
        
        while (gameColors.size < 6) {
            gameColors.add(this.getRandomColor());
        }

        return Array.from(gameColors);
    }

    // Initialize or reset the game state
    
    initializeGame() {
        this.targetColor = this.getRandomColor();
        this.colorBox.style.backgroundColor = this.targetColor;

        const gameColors = this.generateGameColors();
        const shuffledColors = this.shuffleArray(gameColors);

        this.colorOptions.forEach((option, index) => {
            option.style.backgroundColor = shuffledColors[index];
        });

        this.resetGameStatus();
    }


    // Reset the game status display
    
    resetGameStatus() {
        this.gameStatus.textContent = '';
        this.gameStatus.className = '';
    }

    // Handle correct guess animation and score update

    handleCorrectGuess(selectedOption) {
        this.score++;
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.gameStatus.textContent = 'You matched correctly! 🎉';
        this.gameStatus.className = 'status-correct';
        selectedOption.classList.add('correct-answer');

        setTimeout(() => {
            selectedOption.classList.remove('correct-answer');
            this.initializeGame();
        }, ColorGuessingGame.ANIMATION_DELAYS.CORRECT_ANSWER);
    }

    
    handleWrongGuess(selectedOption) {
        this.gameStatus.textContent = 'Wrong! Click on "New game" to try again 😕';
        this.gameStatus.className = 'status-wrong';
        selectedOption.classList.add('wrong-answer');

        setTimeout(() => {
            selectedOption.classList.remove('wrong-answer');
        }, ColorGuessingGame.ANIMATION_DELAYS.WRONG_ANSWER);
    }

    // Check if the selected color matches the target
   
    checkGuess(selectedColor) {
        const selectedOption = Array.from(this.colorOptions)
            .find(option => option.style.backgroundColor === selectedColor);

        if (selectedColor === this.targetColor) {
            this.handleCorrectGuess(selectedOption);
        } else {
            this.handleWrongGuess(selectedOption);
        }
    }

  
    //  Reset the game score
     
    resetGame() {
        this.score = 0;
        this.scoreElement.textContent = 'Score: 0';
        this.initializeGame();
    }

    // Add event listeners to game elements
     
    addEventListeners() {
        this.colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.checkGuess(option.style.backgroundColor.replace(/\s/g, ''));
            });
        });

        this.newGameButton.addEventListener('click', () => this.resetGame());
    }
}

    // Initialize the game when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        new ColorGuessingGame();
});