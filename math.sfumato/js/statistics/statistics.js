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
    if (language === "en") {
        document.title = "Statistics";			
    }
    if (language === "lv") {
        document.title = "Statistika";			
    }
    if (language === "ru") {
        document.title = "Статистика";			
    }
}

function SetColor(param) {
    var topPart = document.getElementById("top-part");
    var small = document.getElementById("small");
    var footer = document.getElementById("footer");

    const root = document.documentElement;

    switch (param) {
        case "green-blue":
            topPart.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)";
            small.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)";
            footer.style.background = "linear-gradient(180deg, rgba(1,128,61,0.5046393557422969) 0%, rgba(1,127,128,0.5046393557422969) 100%)";

            root.style.setProperty('--base-color', '#01803D');
            document.cookie = `color=${encodeURIComponent(param)}; path=/`;
            break;
        case "pink-yellow":
            topPart.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)";
            small.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)";
            footer.style.background = "linear-gradient(180deg, rgba(255,0,241,0.7987788865546218) 0%, rgba(238,238,18,0.8043811274509804) 100%)";
            
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
var color = getCookieValue("color");
if (color) {
    SetColor(color);
} else {
    SetColor("green-blue");
}

/*-------------------------------------------------------*/

/* EXERCISE STATISTICS */

var correctColor;
var wrongColor;

if (color === "green-blue") {
    correctColor = "#00c75d";
    wrongColor = "#00b6b6";
}
if (color === "pink-yellow") {
    correctColor = "pink";
    wrongColor = "yellow";
}

$.ajax({
    url: "../../php/get-exercise-data.php",
    method: "POST",
    data: { login: login },
    dataType: "json",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (response) {
        if (response.success) {
            if (response.data && response.data.length > 0) {
                let userData = response.data[0];
                const correctAnswers = userData["correct-answers"];
                const wrongAnswers = userData["wrong-answers"];

                document.getElementById("correct-answers").textContent = correctAnswers;
                document.getElementById("wrong-answers").textContent = wrongAnswers;
                if (!(wrongAnswers === 0)) {
                    document.getElementById("koefficent").textContent = Math.round(100 * (correctAnswers / wrongAnswers)) / 100;
                } else {
                    document.getElementById("koefficent").textContent = correctAnswers;
                }

                if (correctAnswers === 0 && wrongAnswers === 0) {
                    var ctx = document.getElementById("myChart").getContext("2d");
                    var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: ["Correct", "Wrong"],
                        datasets: [
                        {
                            backgroundColor: [correctColor, wrongColor],
                            data: [1, 1]
                        }
                        ]
                    }
                    });                    
                } else {
                    var ctx = document.getElementById("myChart").getContext("2d");
                    var myChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: ["Correct", "Wrong"],
                        datasets: [
                        {
                            backgroundColor: [correctColor, wrongColor],
                            data: [correctAnswers, wrongAnswers]
                        }
                        ]
                    }
                    });                    
                }
            } else {
                if (lang === "ru") {
                    alert("Пользователь не найден.");
                }
                if (lang === "en") {
                    alert("User is not found.");
                }
                if (lang === "lv") {
                    alert("Lietotājs nav atrasts.");
                }								
            }
        } else {
            if (lang === "ru") {
                alert("Пользователь не найден: " + response.error + ".");
            }
            if (lang === "en") {
                alert("User is not found: " + response.error + ".");
            }
            if (lang === "lv") {
                alert("Lietotājs nav atrasts: " + response.error + ".");
            }
        }
    },
    error: function () {
        if (lang === "ru") {
            alert("Произошла ошибка при получении данных пользователя.");
        }
        if (lang === "en") {
            alert("An error occurred while retrieving user data.");
        }
        if (lang === "lv") {
            alert("Izgūstot lietotāja datus, radās kļūda.");
        }
    },
});

/*-------------------------------------------------------*/

/* EXERCISE TOP */

function SetTop(topData, place) {
    let nameTd = document.getElementById("name"+place);
    let koefficentTd = document.getElementById("koefficent"+place);
    let correctTd = document.getElementById("correct-answers"+place);
    let wrongTd = document.getElementById("wrong-answers"+place);

    nameTd.textContent = topData["login"];
    if (topData["wrong-answers"] === 0) {
        koefficentTd.textContent = topData["correct-answers"];
    } else {
        koefficentTd.textContent = Math.round(100*(topData["correct-answers"] / topData["wrong-answers"])) / 100;
    }
    correctTd.textContent = topData["correct-answers"];
    wrongTd.textContent = topData["wrong-answers"];
}

$.ajax({
    url: "../../php/get-exercise-top.php",
    method: "POST",
    dataType: "json",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (response) {
        if (response.success) {
            if (response.data && response.data.length > 0) {
                let topData1 = response.data[0];
                let topData2 = response.data[1];
                let topData3 = response.data[2];
                
                SetTop(topData1, 1);
                SetTop(topData2, 2);
                SetTop(topData3, 3);
            } else {
                if (lang === "ru") {
                    alert("Данные не найдены.");
                }
                if (lang === "en") {
                    alert("Data not found.");
                }
                if (lang === "lv") {
                    alert("Dati nav atrasti.");
                }								
            }
        } else {
            if (lang === "ru") {
                alert("Ошибка при получении данных: " + response.error + ".");
            }
            if (lang === "en") {
                alert("Error retrieving data: " + response.error + ".");
            }
            if (lang === "lv") {
                alert("Kļūda saņemot datus: " + response.error + ".");
            }
        }
    },
    error: function () {
        if (lang === "ru") {
            alert("Произошла ошибка при получении данных.");
        }
        if (lang === "en") {
            alert("An error occurred while retrieving data.");
        }
        if (lang === "lv") {
            alert("Izgūstot datus, radās kļūda.");
        }
    },
});
	
/*-------------------------------------------------------*/

/* GAME TOP */

function SetTopG(topData, place) {
    let nameTd = document.getElementById("name"+place+"-g");
    let recordTd = document.getElementById("record"+place+"-g");
    let modeTd = document.getElementById("mode"+place+"-g");
    let difficultyTd = document.getElementById("difficulty"+place+"-g");
    let inf = topData["max_column"].split("-");

    nameTd.textContent = topData["login"];
    recordTd.textContent = topData["max_value"];
    if (inf[0] === "max10") {
        modeTd.textContent = "[+] [-] 10";
    }
    if (inf[0] === "max20") {
        modeTd.textContent = "[+] [-] 20";
    }
    if (inf[0] === "multiplicationtable") {
        modeTd.textContent = "[*] 100";
    }
    difficultyTd.textContent = inf[1];
}

$.ajax({
    url: "../../php/get-game-top.php",
    method: "POST",
    dataType: "json",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (response) {
        if (response.success) {
            if (response.data && response.data.length > 0) {
                let topData1G = response.data[0];
                let topData2G = response.data[1];
                let topData3G = response.data[2];
                
                SetTopG(topData1G, 1);
                SetTopG(topData2G, 2);
                SetTopG(topData3G, 3);
            } else {
                if (lang === "ru") {
                    alert("Данные не найдены.");
                }
                if (lang === "en") {
                    alert("Data not found.");
                }
                if (lang === "lv") {
                    alert("Dati nav atrasti.");
                }								
            }
        } else {
            if (lang === "ru") {
                alert("Ошибка при получении данных: " + response.error + ".");
            }
            if (lang === "en") {
                alert("Error retrieving data: " + response.error + ".");
            }
            if (lang === "lv") {
                alert("Kļūda saņemot datus: " + response.error + ".");
            }
        }
    },
    error: function () {
        if (lang === "ru") {
            alert("Произошла ошибка при получении данных.");
        }
        if (lang === "en") {
            alert("An error occurred while retrieving data.");
        }
        if (lang === "lv") {
            alert("Izgūstot datus, radās kļūda.");
        }
    },
});
	

/*-------------------------------------------------------*/

/* TO TOP */

function scrollToTop() {
    var element = document.getElementById("top");
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}