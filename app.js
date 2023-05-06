// Array containing all the colors of the buttons
const colors = ['red', 'blue', 'green', 'yellow'];
const audioR = new Audio('./sounds/red.mp3');
const audioG = new Audio('./sounds/green.mp3');
const audioY = new Audio('./sounds/yellow.mp3');
const audioB = new Audio('./sounds/blue.mp3');
const audioW = new Audio('./sounds/wrong.mp3');

let gamePattern = [];
let userClickedPattern = [];
let gameState = false;
let level = 0;

const buttong = document.querySelector('.green');
const buttonr = document.querySelector('.red');
const buttony = document.querySelector('.yellow');
const buttonb = document.querySelector('.blue');

const nextSequence = () => {
	let randomNumber = Math.ceil(Math.random() * 3)
	let randomColor = colors[randomNumber];
	blinkEffect(randomColor);
	gamePattern.push(randomColor);
	document.querySelector("h1").innerHTML = "Level " + level++;
	userClickedPattern = [];
}

const playSound = (color) => {
	if (color == 'red') audioR.play();
	else if (color == 'yellow') audioY.play();
	else if (color == 'blue') audioB.play();
	else if (color == 'green') audioG.play();
	else if (color == 'wrong') audioW.play();
	else return;
}

const userHandler = (element) => {
	userClickedPattern.push(element.getAttribute('id'));
	checkAnswer(userClickedPattern.length - 1);
}

const flashEffect = (element, sound) => {
	element.classList.add("clicked");
	setTimeout(() => {
		sound.play();
		element.classList.remove("clicked");
	}, 50);
	userHandler(element);
}

const blinkEffect = (id) => {
	const button = document.getElementById(id);
	button.classList.add("blinked");
	setTimeout(() => {
		playSound(id);
		button.classList.remove("blinked");
	}, 300);
}

const gameOver = () => {
	document.querySelector('body').classList.add("game-over");
	setTimeout(() => {
		playSound("wrong");
		document.querySelector('body').classList.remove("game-over");
		document.querySelector('h1').innerHTML = "Game Over, Press A Key to Start Again"
	}, 100);
	gameState = false;
	level = 0;
	userClickedPattern = [];
	gamePattern = [];
}

const checkAnswer = (currentLevel) => {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		const length = gamePattern.length;
		if (length === userClickedPattern.length) {

			setTimeout(() => {
				nextSequence();
				console.log("correct");
			}, 1000);
		}
	} else {
		gameOver();
	}
}


document.addEventListener("keypress", event => {
	if (event && gameState === false) {
		setTimeout(() => {
			nextSequence();
			gameState = true;
		}, 1000);
	}
});



buttong.addEventListener("click", () => {
	flashEffect(buttong, audioG);
})
buttonr.addEventListener("click", () => {
	flashEffect(buttonr, audioR);
})
buttony.addEventListener("click", () => {
	flashEffect(buttony, audioY);
})
buttonb.addEventListener("click", () => {
	flashEffect(buttonb, audioB);
})

