/* COOKIES */

function getCookieValue(cookieName) {
	const cookies = document.cookie.split('; ');
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === cookieName) {
			return decodeURIComponent(value);
		}
	}
	return null;
}

function setLang(newLang) {
	document.cookie = `lang=${encodeURIComponent(newLang)}; path=/`;

	var elements = document.querySelectorAll(".lang-c");
	Array.from(elements).forEach(function(element) {
		element.style.display = 'none';
	});

	var elementCL = document.querySelectorAll("." + newLang);
	Array.from(elementCL).forEach(function(elementCL) {
		elementCL.style.display = 'block';
	});

	language = newLang;

	// Changing title
	var buttonGo = document.getElementById("go-button");
	var buttonCheck = document.getElementById("check-button");
	if (language === "en") {
		document.title = "Exercises";	
		buttonGo.value = "GO";	
		buttonCheck.value = "CHECK";	
	}
	if (language === "lv") {
		document.title = "Vingrinājumi";
		buttonGo.value = "AIZIET";			
		buttonCheck.value = "PĀRBAUDĪT";			
	}
	if (language === "ru") {
		document.title = "Упражнения";	
		buttonGo.value = "ПОЕХАЛИ";		
		buttonCheck.value = "ПРОВЕРИТЬ";		
	}
}

function SetColor(param) {
	var topPart = document.getElementById("top-part");
	var small = document.getElementById("small");

	const root = document.documentElement;

	switch (param) {
		case "green-blue":
			topPart.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)";
			small.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)";

			root.style.setProperty('--base-color', '#01803D');
			document.cookie = `color=${encodeURIComponent(param)}; path=/`;
			break;
		case "pink-yellow":
			topPart.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)";
			small.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)";

			root.style.setProperty('--base-color', 'rgba(255,0,241,1)');
			document.cookie = `color=${encodeURIComponent(param)}; path=/`;
	}
}	    	

const login = getCookieValue("login");
if (!login) {
	window.location.href = "../../";
}

const lang = getCookieValue("lang");
if (lang) {
	setLang(lang);
} else {
	setLang("en");
}

const color = getCookieValue("color");
if (color) {
	SetColor(color);
} else {
	SetColor("green-blue");
}	

/*-------------------------------------------------------*/

/* EXERCISE */

let maxAnswer = 0;
let signs = "";
let goalCount = 0;
let errorWeight = 0;

let correctAnswers = 0;
let wrongAnswers = 0;
let answers = 0;
let currentTime = 0;

let firstNumber = 0;
let secondNumber = 0;
let answer = 0;
let sign = "";

let allTimeIntervalId;
let currentExerciseTimeIntervalId;
let congratulations = false;

let results = [];

//add result
function addResult(example, isCorrect, time) {
    results.push({
        "example": example,
        "iscorrect": isCorrect,
        "time": time
    });
}

//saving data to file
function SaveData() {
    let currentTime = new Date().toISOString().slice(0, 19).replace(/[-T]/g, "_").replace(/:/g, "-");
    
    let data = {
        results: results,
        username: login,
        currentTime: currentTime
    };
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../../php/save-to-file.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
}

//write data to database
function setUserInf(login, correctAnswers, wrongAnswers, minutes) {
	$.ajax({
		url: "../../php/set-exercise-data.php",
		method: "POST",
		data: { login: login, correctAnswers: correctAnswers, wrongAnswers: wrongAnswers, minutes: minutes },
		dataType: "json",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function (response) {
			console.log("set-inf: login: ", login, '; correctAnswers: +', correctAnswers, '; wrongAnswers: +', wrongAnswers, '; minutes: +', minutes, '; response: ', response);
		},
		error: function () {
			if (lang === "ru") {
				alert("Произошла ошибка при сохранении данных попробуйте войти повторно.");
			}
			if (lang === "lv") {
				alert("Saglabājot datus, radās kļūda. Lūdzu, mēģiniet pieteikties vēlreiz.");
			}
			if (lang === "en") {
				alert("An error occurred while saving data, please try logging in again.");
			}
		},
	});
}

//get random num (min <= num <= max)
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//time formating
function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(remainingSeconds).padStart(2, '0');
	return `${formattedMinutes}:${formattedSeconds}`;
}

//timer updating
function updateTimer(id) {
	const element = document.getElementById(id);
	const currentTime = element.textContent;
	const timeParts = currentTime.split(":");
	const minutes = parseInt(timeParts[0]);
	const seconds = parseInt(timeParts[1]);
	let totalSeconds = minutes * 60 + seconds;

	totalSeconds += 1;
	element.textContent = formatTime(totalSeconds);
}

//timers stoppping
function stopTimers() {
	clearInterval(allTimeIntervalId);
	clearInterval(currentExerciseTimeIntervalId);
}

//timers starting
function startTimers() {
	allTimeIntervalId = setInterval(() => updateTimer("all-time"), 1000);
	currentExerciseTimeIntervalId = setInterval(() => updateTimer("current-exercise-time"), 1000);
}

//getting exercise settings
function getSettingDatas(event) {
    event.preventDefault();
		
	maxAnswer = document.getElementById("max-answer").value;
	signs = document.getElementById("sign").value;

	goalCount = document.getElementById("exercises-count").value;

	errorWeight = document.getElementById("error-weight").value;
		
	document.getElementById("all-answers").textContent = "0";
	document.getElementById("all-time").textContent = "00:00";
	document.getElementById("goal-count").textContent = goalCount;

	document.getElementById("correct-answers").textContent = "0";
	document.getElementById("wrong-answers").textContent = "0";
	document.getElementById("current-exercise-time").textContent = "00:00";

	document.getElementById("exercise-settings").style.display = "none";
	document.getElementById("exercise-block").style.display = "block";
	setTimeout(function() {
		document.getElementById("exercise-block").style.opacity = "1";
	}, 10);

	document.body.style.overflow = "hidden";

	document.getElementById("answer").focus();

	startTimers();
	
	generate();
}

//sign gererating
function generateSign() {
	let ans = "";
	
	if ((signs == "+") || (signs == "-") || (signs == "*") || (signs == "/")) {
		ans = signs
	}
	if (signs == "+-") {
		let num = getRandomNumber(1, 10);
		if (num % 2 == 0) {
			ans = "+"
		} else {
			ans = "-"
		}
	}
	if (signs == "*/") {
		let num = getRandomNumber(1, 10);
		if (num % 2 == 0) {
			ans = "*"
		} else {
			ans = "/"
		}
	}
	if (signs == "+-*") {
		let num = getRandomNumber(1, 100);
		if (num % 2 == 0) {
			ans = "*"
		} else {
			if (num % 3 == 0) {
				ans = "-"
			} else {
				ans = "+"
			}
		}
	}
	if (signs == "+-*/") {
		let num = getRandomNumber(1, 100);
		if (num % 2 == 0) {
			/* + | - */
			let num = getRandomNumber(1, 100);
			if (num % 2 == 0) {
				ans = "+"
			} else {
				ans = "-"
			}
		} else {
			/* * | / */
			let num = getRandomNumber(1, 100);
			if (num % 2 == 0) {
				ans = "*"
			} else {
				ans = "/"
			}			
		}
	}
	
	return ans
}

//example showing
function showData() {
	document.getElementById("first-num").textContent = firstNumber;
	document.getElementById("second-num").textContent = secondNumber;
	document.getElementById("current-sign").textContent = sign;
}

//example generating
function generate() {
	sign = generateSign();
		
	if (sign == "+") {
		firstNumber = getRandomNumber(1, maxAnswer / 2)
		secondNumber = getRandomNumber(1, maxAnswer / 2);
		answer = firstNumber + secondNumber;
	}
	if (sign == "-") {
		firstNumber = getRandomNumber(1, maxAnswer / 2)
		secondNumber = getRandomNumber(1, maxAnswer / 2);
		answer = firstNumber + secondNumber;
		
		let num = answer;
		answer = firstNumber;
		firstNumber = num;
	}
	if (sign == "*") {
		let num = getRandomNumber(1, 100);
		
		if (num % 2 == 0) {
			firstNumber = getRandomNumber(2, Math.floor(Math.sqrt(maxAnswer)));
			secondNumber = getRandomNumber(2, Math.floor(Math.sqrt(maxAnswer)));
			answer = firstNumber * secondNumber;
		} else {
			firstNumber = getRandomNumber(2, Math.floor(Math.sqrt(maxAnswer) * 2));
			secondNumber = getRandomNumber(2, Math.floor(Math.sqrt(maxAnswer) / 2));
			answer = firstNumber * secondNumber;
		}
		
		num = getRandomNumber(1, 100);
		if (num % 2 !== 0) {
			num = firstNumber;
			firstNumber = secondNumber;
			secondNumber = num;
		}
	}
	if (sign == "/") {
		let num = getRandomNumber(1, 100);
		
		if (num % 2 == 0) {
			firstNumber = getRandomNumber(2, Math.floor(Math.sqrt(maxAnswer)));
			secondNumber = getRandomNumber(2, Math.floor(Math.sqrt(maxAnswer)));
			answer = firstNumber * secondNumber;
		} else {
			firstNumber = getRandomNumber(2, Math.floor(Math.sqrt(maxAnswer) * 2));
			secondNumber = getRandomNumber(2, Math.floor(Math.sqrt(maxAnswer) / 2));
			answer = firstNumber * secondNumber;
		}
		
		if (num % 2 !== 0) {
			num = firstNumber;
			firstNumber = secondNumber;
			secondNumber = num;
		}
		
		num = answer;
		answer = firstNumber;
		firstNumber = num;
	}
	
	showData();	
}

//answer checking
function check() {
	var userAnswer = document.getElementById("answer").value;
	const element = document.getElementById("current-exercise-time");
	const currentTime = element.textContent;
	const timeParts = currentTime.split(":");
	const minutes = parseInt(timeParts[0]);
	const seconds = parseInt(timeParts[1]);
	let totalSeconds = minutes * 60 + seconds;

	if (userAnswer == answer) {

		correctAnswers += 1;
		answers = answers + 1;
		document.body.style.backgroundColor = "rgba(153, 255, 153, .6)"

		totalSeconds += 1;
		
		setUserInf(login, 1, 0, totalSeconds);
		addResult(firstNumber + sign + secondNumber + "=" + userAnswer, "+", totalSeconds);
		
		setTimeout(function() {
			document.body.style.backgroundColor = "#ececec";
		}, 1300);
	} else {
		wrongAnswers += 1;
		answers = answers - errorWeight;
		setUserInf(login, 0, 1, totalSeconds);
		addResult(firstNumber + sign + secondNumber + "=" + userAnswer, "-", totalSeconds);
		document.getElementById("error-div").style.display = "block";
		document.getElementById("err-first-num").textContent = firstNumber;
		document.getElementById("err-current-sign").textContent = sign;
		document.getElementById("err-second-num").textContent = secondNumber;
		document.getElementById("err-answer").value = answer;
		document.body.style.backgroundColor = "rgba(255, 0, 0, .6)"
		
		setTimeout(function() {
			document.body.style.backgroundColor = "#ececec";
			document.getElementById("error-div").style.display = "none";
		}, 1300);
	}
	
	document.getElementById("current-exercise-time").textContent = "00:00";
	document.getElementById("answer").value = "";
	
	document.getElementById("correct-answers").textContent = correctAnswers;
	document.getElementById("wrong-answers").textContent = wrongAnswers;
	document.getElementById("all-answers").textContent = answers;
	
	if ((answers == goalCount) && !(congratulations)) {
		SaveData();
		stopTimers();
		document.getElementById("answer").blur();
		const confettiElements = document.querySelectorAll(".confetti");
		confettiElements.forEach((element) => {
			element.style.display = "block";
		});
		document.getElementById("exercise-end").style.display = "flex";
		setTimeout(function() {
			document.getElementById("exercise-end").style.transform = "translateY(0)";
		}, 10);

		document.getElementById("wrong-answers-end").textContent = wrongAnswers;
		document.getElementById("correct-answers-end").textContent = correctAnswers;
		document.getElementById("all-time-end").textContent = document.getElementById("all-time").textContent;

		congratulations = true;
	}	
}

//anwer checking and new one generating
function checkAnswerAndGenerateNew(event) {
	event.preventDefault();
	check();
	generate();
}

//exercise pausing
function pauseExercise() {
	stopTimers();
	document.getElementById("closebtn").style.display = "none";
	document.getElementById("playbtn").style.display = "block";
	document.getElementById("pausebtn").style.display = "none";
}

//exercise continuing
function playExercise() {
	startTimers();
	document.getElementById("closebtn").style.display = "block";
	document.getElementById("playbtn").style.display = "none";
	document.getElementById("pausebtn").style.display = "block";
}

//exercise ending
function endExercise() {
	if (answers > 0) {
		SaveData();
	}
	window.location.href = "../profile/";
}

//open statistic container
function openStatistic() {
	if (document.body.clientWidth > 1175){
		document.getElementById("statistic-container").style.height = "calc(100% - 70px)";
	} else {
		document.getElementById("statistic-container").style.height = "calc(100% - 123px)";
	}
	
	document.getElementById("statistic-container").style.opacity = "1";
}

//close statistic container
function closeStatistic() {
	document.getElementById("statistic-container").style.height = "0";
	document.getElementById("statistic-container").style.opacity = "0";
}

//fullscreen button script
document.getElementById('fullscreen-button').addEventListener('click', function() {
	var elem = document.documentElement;
	var button = document.getElementById("fullscreen-button");
	var menuOver = document.getElementById("nav-overlay");

	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
		button.innerHTML = '<i class="fa fa-compress"></i>';
		if (document.body.clientWidth > 1175) {
			menuOver.style.display = "flex";
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
		button.innerHTML = '<i class="fa fa-expand"></i>';
		menuOver.style.display = "none";
	}
});

//removing ArrowUp and ArrowDown keys
document.getElementById('answer').addEventListener('keydown', function(e) {
	if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
		e.preventDefault();
	}
});









