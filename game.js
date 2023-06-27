var attempts = 0;
var maxAttempts = 3;
var randomNumber = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
    var input = document.getElementById("guessInput").value;
    var resultText = document.getElementById("result");
    var guessButton = document.getElementById("guessButton");
    var newNumberText = document.getElementById("newNumberText");

    guessButton.disabled = true;
    guessButton.style.backgroundColor = "gray";

    if (input == randomNumber) {
        // When the guess is correct
        resultText.innerHTML = "Congratulations! You guessed it right.";
        resultText.style.color = "green";

        setTimeout(function() {
            // Clear the result and reset variables after 3 seconds
            resultText.innerHTML = "";
            resultText.style.color = ""; // Reset the color to default
            randomNumber = Math.floor(Math.random() * 10) + 1;
            attempts = 0;
            guessButton.disabled = false;
            guessButton.style.backgroundColor = "";
            newNumberText.innerHTML = "A new number was generated.";
        }, 3000);
    } else {
        // When the guess is incorrect
        attempts++;
        if (attempts < maxAttempts) {
            // When the maximum attempts are not reached
            resultText.innerHTML = "Sorry, try again!";
            resultText.classList.add("fail");

            setTimeout(function() {
                // Re-enable the button after 0.5 seconds for the next guess
                guessButton.disabled = false;
                guessButton.style.backgroundColor = "";
            }, 500);
        } else {
            // When the maximum attempts are reached
            resultText.innerHTML = "Sorry, you've exceeded the maximum number of attempts. The correct number was [" + randomNumber + "].";
            resultText.classList.add("fail");

            setTimeout(function() {
                // Clear the result, generate new number, and reset variables after 3 seconds
                resultText.innerHTML = "";
                resultText.style.color = ""; // Reset the color to default
                randomNumber = Math.floor(Math.random() * 10) + 1;
                attempts = 0;
                guessButton.disabled = false;
                guessButton.style.backgroundColor = "";
                newNumberText.innerHTML = "A new number was generated.";
            }, 3000);
        }
    }
}

function clearNewNumberMessage() {
    var newNumberText = document.getElementById("newNumberText");
    newNumberText.innerHTML = ""; // Clear the "A new number was generated." message
}

document.getElementById('changeText').addEventListener('mouseover', function() {
    var element = this;
    setTimeout(function() {
        element.textContent = randomNumber;
    }, 600); // In milliseconds 
});

document.getElementById('changeText').addEventListener('mouseout', function() {
    this.textContent = "Number";
});
