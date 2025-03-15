// variables declaration
let dictionary = ["fruit", "apple", "grape", "peach", "berry", "melon", "mango", "lemon", "mommy", "daddy", 
    "shape", "angle", "curve", "plane", "point", "slope", "width", "depth", "shade", "phase",
    "color", "black", "white", "green", "brown", "shoot", "speed", "swing", "dance", "skate"];

let current_row = 0;
let answer = "";


// functions
function initial_game() {
    // variable initialization
    current_row = 0;
    let index = Math.floor(Math.random() * dictionary.length);
    answer = dictionary[index];
    console.log("The answer is: " + answer);
    // html initialization
    document.getElementById("guess-input").value = "";
    document.querySelectorAll(".box").forEach((box) => {
        box.textContent = "";
        box.style.backgroundColor = "#ffffff";
    });
    document.querySelectorAll(".char").forEach((char) => {
        char.style.backgroundColor = "#ffffff";
    });
    document.getElementById("clean-button").style.display = "none";
    document.getElementById("submit-button").disabled = false;
}

initial_game();

// validate the input word by API
async function validate_input(input) {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;
    try{
        let res = await fetch(url);
        return res.ok;
    }
    catch (error) {
        console.error("Error fetching the dictionary API:", error);
        return false;
    }
}

// handle the guess submission
document.getElementById("submit-button").addEventListener("click", async () => {
    if (current_row < 6){

        // validate the input length
        let guess = document.getElementById("guess-input").value.trim().toLowerCase();
        if (guess.length !== 5) {
            alert("Please enter a 5-letter word.");
            return;
        }

        // check the guess against the answer
        let isValid = await validate_input(guess);
        // let isValid = true;
        if (!isValid) {
            alert("Please enter a valid word.");
            return;
        }

        // display the guessed character
        let correct_count = 0;
        let compare_set = answer.split('')

        // Color the totally correct characters
        let modified_guess = guess.split('').map((char, index) => {
            let box = document.querySelector(`.box${current_row}${index}`);
            let charBox = document.querySelector(`.char${char.toUpperCase().charCodeAt(0)}`);
            box.textContent = char.toUpperCase(); 
            if (char === answer[index]) {
                correct_count++;
                // remove the totally correct character
                compare_set[index] = null;
                box.style.backgroundColor = "var(--totally-correct-color)";
                charBox.style.backgroundColor = "var(--totally-correct-color)";
                // 'remove' the character from the guess to avoid double coloring
                return '@';
            }
            return char;
        });

        // Color the remained characters
        modified_guess.forEach((char, index) => {
            // skip the totally correct character
            if (char === '@') return;
            let box = document.querySelector(`.box${current_row}${index}`);
            let charBox = document.querySelector(`.char${char.toUpperCase().charCodeAt(0)}`);
            if (compare_set.includes(char)) {
                // remove the character from the set to avoid double coloring
                compare_set[compare_set.indexOf(char)] = null;
                box.style.backgroundColor = "var(--text-correct-color)";
                charBox.style.backgroundColor = "var(--text-correct-color)";
            } else {
                box.style.backgroundColor = "var(--wrong-color)";
                charBox.style.backgroundColor = "var(--wrong-color)";
            }
        })

        // check if the guess is correct
        if (correct_count === 5) {
            document.getElementById("clean-button").style.display = "inline-block";
            alert("Congratulations! You've guessed the word: " + answer);
            document.getElementById("submit-button").disabled = true;
            return;
        }
        else {
            alert("Wrong guessed: " + guess);
            current_row++;
        }
        // Here can add cookie to count the number of attempts
    }
    if (current_row >= 6) {
        document.getElementById("clean-button").style.display = "inline-block";
        alert("Game over! The answer is: " + answer);
        document.getElementById("submit-button").disabled = true;
        return;
    }
    // clear the input for the next guess
    document.getElementById("guess-input").value = "";
});

// handle the clean button
document.getElementById("clean-button").addEventListener("click", initial_game);
