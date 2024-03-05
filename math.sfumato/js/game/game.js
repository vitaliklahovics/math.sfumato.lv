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
        document.title = "Game";	
    }
    if (language === "lv") {
        document.title = "Spēle";
    }
    if (language === "ru") {
        document.title = "Игра";	
    }
}

function SetColor(param) {
    var topPart = document.getElementById("top-part");
    var small = document.getElementById("small");
    var main = document.getElementById("main");

    const root = document.documentElement;

    switch (param) {
        case "green-blue":
            topPart.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)";
            small.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)";
            main.style.background = "linear-gradient(180deg, rgba(1,128,61,0.5046393557422969) 0%, rgba(1,127,128,0.5046393557422969) 100%)";

            root.style.setProperty('--base-color', '#01803D');
            document.cookie = `color=${encodeURIComponent(param)}; path=/`;
            break;
        case "pink-yellow":
            topPart.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)";
            small.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)";
            main.style.background = "linear-gradient(180deg, rgba(255,0,241,0.7987788865546218) 0%, rgba(238,238,18,0.8043811274509804) 100%)";

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

/* GAME */

//elements
const field = document.getElementById('field');
const answerInput = document.getElementById('answer');
const startButton = document.getElementById('startButton');
const againButton = document.getElementById('startAgain');
const heartsContainer = document.getElementById('hearts');
const countContainer = document.getElementById('count');
const settingsContainer = document.getElementById('settings');
const endContainer = document.getElementById('end');
const endSpan = document.getElementById('count-end');
const recordContainer = document.getElementById('record-container');

//examples
const examplesMultiplicationTable = [
    {"question": "1 * 1", "answer": "1"},
    {"question": "1 * 2", "answer": "2"},
    {"question": "1 * 3", "answer": "3"},
    {"question": "1 * 4", "answer": "4"},
    {"question": "1 * 5", "answer": "5"},
    {"question": "1 * 6", "answer": "6"},
    {"question": "1 * 7", "answer": "7"},
    {"question": "1 * 8", "answer": "8"},
    {"question": "1 * 9", "answer": "9"},
    {"question": "1 * 10", "answer": "10"},

    {"question": "2 * 1", "answer": "2"},
    {"question": "2 * 2", "answer": "4"},
    {"question": "2 * 3", "answer": "6"},
    {"question": "2 * 4", "answer": "8"},
    {"question": "2 * 5", "answer": "10"},
    {"question": "2 * 6", "answer": "12"},
    {"question": "2 * 7", "answer": "14"},
    {"question": "2 * 8", "answer": "16"},
    {"question": "2 * 9", "answer": "18"},
    {"question": "2 * 10", "answer": "20"},

    {"question": "3 * 1", "answer": "3"},
    {"question": "3 * 2", "answer": "6"},
    {"question": "3 * 3", "answer": "9"},
    {"question": "3 * 4", "answer": "12"},
    {"question": "3 * 5", "answer": "15"},
    {"question": "3 * 6", "answer": "18"},
    {"question": "3 * 7", "answer": "21"},
    {"question": "3 * 8", "answer": "24"},
    {"question": "3 * 9", "answer": "27"},
    {"question": "3 * 10", "answer": "30"},

    {"question": "4 * 1", "answer": "4"},
    {"question": "4 * 2", "answer": "8"},
    {"question": "4 * 3", "answer": "12"},
    {"question": "4 * 4", "answer": "16"},
    {"question": "4 * 5", "answer": "20"},
    {"question": "4 * 6", "answer": "24"},
    {"question": "4 * 7", "answer": "28"},
    {"question": "4 * 8", "answer": "32"},
    {"question": "4 * 9", "answer": "36"},
    {"question": "4 * 10", "answer": "40"},

    {"question": "5 * 1", "answer": "5"},
    {"question": "5 * 2", "answer": "10"},
    {"question": "5 * 3", "answer": "15"},
    {"question": "5 * 4", "answer": "20"},
    {"question": "5 * 5", "answer": "25"},
    {"question": "5 * 6", "answer": "30"},
    {"question": "5 * 7", "answer": "35"},
    {"question": "5 * 8", "answer": "40"},
    {"question": "5 * 9", "answer": "45"},
    {"question": "5 * 10", "answer": "50"},

    {"question": "6 * 1", "answer": "6"},
    {"question": "6 * 2", "answer": "12"},
    {"question": "6 * 3", "answer": "18"},
    {"question": "6 * 4", "answer": "24"},
    {"question": "6 * 5", "answer": "30"},
    {"question": "6 * 6", "answer": "36"},
    {"question": "6 * 7", "answer": "42"},
    {"question": "6 * 8", "answer": "48"},
    {"question": "6 * 9", "answer": "54"},
    {"question": "6 * 10", "answer": "60"},

    {"question": "7 * 1", "answer": "7"},
    {"question": "7 * 2", "answer": "14"},
    {"question": "7 * 3", "answer": "21"},
    {"question": "7 * 4", "answer": "28"},
    {"question": "7 * 5", "answer": "35"},
    {"question": "7 * 6", "answer": "42"},
    {"question": "7 * 7", "answer": "49"},
    {"question": "7 * 8", "answer": "56"},
    {"question": "7 * 9", "answer": "63"},
    {"question": "7 * 10", "answer": "70"},

    {"question": "8 * 1", "answer": "8"},
    {"question": "8 * 2", "answer": "16"},
    {"question": "8 * 3", "answer": "24"},
    {"question": "8 * 4", "answer": "32"},
    {"question": "8 * 5", "answer": "40"},
    {"question": "8 * 6", "answer": "48"},
    {"question": "8 * 7", "answer": "56"},
    {"question": "8 * 8", "answer": "64"},
    {"question": "8 * 9", "answer": "72"},
    {"question": "8 * 10", "answer": "80"},

    {"question": "9 * 1", "answer": "9"},
    {"question": "9 * 2", "answer": "18"},
    {"question": "9 * 3", "answer": "27"},
    {"question": "9 * 4", "answer": "36"},
    {"question": "9 * 5", "answer": "45"},
    {"question": "9 * 6", "answer": "54"},
    {"question": "9 * 7", "answer": "63"},
    {"question": "9 * 8", "answer": "72"},
    {"question": "9 * 9", "answer": "81"},
    {"question": "9 * 10", "answer": "90"},

    {"question": "10 * 1", "answer": "10"},
    {"question": "10 * 2", "answer": "20"},
    {"question": "10 * 3", "answer": "30"},
    {"question": "10 * 4", "answer": "40"},
    {"question": "10 * 5", "answer": "50"},
    {"question": "10 * 6", "answer": "60"},
    {"question": "10 * 7", "answer": "70"},
    {"question": "10 * 8", "answer": "80"},
    {"question": "10 * 9", "answer": "90"},
    {"question": "10 * 10", "answer": "100"}
];
const examleMax10 = [
    {"question": "1 + 0", "answer": "1"},
    {"question": "1 + 1", "answer": "2"},
    {"question": "1 + 2", "answer": "3"},
    {"question": "1 + 3", "answer": "4"},
    {"question": "1 + 4", "answer": "5"},
    {"question": "1 + 5", "answer": "6"},
    {"question": "1 + 6", "answer": "7"},
    {"question": "1 + 7", "answer": "8"},
    {"question": "1 + 8", "answer": "9"},
    {"question": "1 + 9", "answer": "10"},

    {"question": "2 + 0", "answer": "2"},
    {"question": "2 + 1", "answer": "3"},
    {"question": "2 + 2", "answer": "4"},
    {"question": "2 + 3", "answer": "5"},
    {"question": "2 + 4", "answer": "6"},
    {"question": "2 + 5", "answer": "7"},
    {"question": "2 + 6", "answer": "8"},
    {"question": "2 + 7", "answer": "9"},
    {"question": "2 + 8", "answer": "10"},

    {"question": "3 + 0", "answer": "3"},
    {"question": "3 + 1", "answer": "4"},
    {"question": "3 + 2", "answer": "5"},
    {"question": "3 + 3", "answer": "6"},
    {"question": "3 + 4", "answer": "7"},
    {"question": "3 + 5", "answer": "8"},
    {"question": "3 + 6", "answer": "9"},
    {"question": "3 + 7", "answer": "10"},

    {"question": "4 + 0", "answer": "4"},
    {"question": "4 + 1", "answer": "5"},
    {"question": "4 + 2", "answer": "6"},
    {"question": "4 + 3", "answer": "7"},
    {"question": "4 + 4", "answer": "8"},
    {"question": "4 + 5", "answer": "9"},
    {"question": "4 + 6", "answer": "10"},

    {"question": "5 + 0", "answer": "5"},
    {"question": "5 + 1", "answer": "6"},
    {"question": "5 + 2", "answer": "7"},
    {"question": "5 + 3", "answer": "8"},
    {"question": "5 + 4", "answer": "9"},
    {"question": "5 + 5", "answer": "10"},

    {"question": "6 + 0", "answer": "6"},
    {"question": "6 + 1", "answer": "7"},
    {"question": "6 + 2", "answer": "8"},
    {"question": "6 + 3", "answer": "9"},
    {"question": "6 + 4", "answer": "10"},

    {"question": "7 + 0", "answer": "7"},
    {"question": "7 + 1", "answer": "8"},
    {"question": "7 + 2", "answer": "9"},
    {"question": "7 + 3", "answer": "10"},

    {"question": "8 + 0", "answer": "8"},
    {"question": "8 + 1", "answer": "9"},
    {"question": "8 + 2", "answer": "10"},

    {"question": "9 + 0", "answer": "9"},
    {"question": "9 + 1", "answer": "10"},

    {"question": "10 + 0", "answer": "10"},

    //-------------------------------------

    {"question": "1 - 0", "answer": "1"},
    {"question": "1 - 1", "answer": "0"},

    {"question": "2 - 0", "answer": "2"},
    {"question": "2 - 1", "answer": "1"},
    {"question": "2 - 2", "answer": "0"},

    {"question": "3 - 0", "answer": "3"},
    {"question": "3 - 1", "answer": "2"},
    {"question": "3 - 2", "answer": "1"},
    {"question": "3 - 3", "answer": "0"},

    {"question": "4 - 0", "answer": "4"},
    {"question": "4 - 1", "answer": "3"},
    {"question": "4 - 2", "answer": "2"},
    {"question": "4 - 3", "answer": "1"},
    {"question": "4 - 4", "answer": "0"},

    {"question": "5 - 0", "answer": "5"},
    {"question": "5 - 1", "answer": "4"},
    {"question": "5 - 2", "answer": "3"},
    {"question": "5 - 3", "answer": "2"},
    {"question": "5 - 4", "answer": "1"},
    {"question": "5 - 5", "answer": "0"},

    {"question": "6 - 0", "answer": "6"},
    {"question": "6 - 1", "answer": "5"},
    {"question": "6 - 2", "answer": "4"},
    {"question": "6 - 3", "answer": "3"},
    {"question": "6 - 4", "answer": "2"},
    {"question": "6 - 5", "answer": "1"},
    {"question": "6 - 6", "answer": "0"},

    {"question": "7 - 0", "answer": "7"},
    {"question": "7 - 1", "answer": "6"},
    {"question": "7 - 2", "answer": "5"},
    {"question": "7 - 3", "answer": "4"},
    {"question": "7 - 4", "answer": "3"},
    {"question": "7 - 5", "answer": "2"},
    {"question": "7 - 6", "answer": "1"},
    {"question": "7 - 7", "answer": "0"},

    {"question": "8 - 0", "answer": "8"},
    {"question": "8 - 1", "answer": "7"},
    {"question": "8 - 2", "answer": "6"},
    {"question": "8 - 3", "answer": "5"},
    {"question": "8 - 4", "answer": "4"},
    {"question": "8 - 5", "answer": "3"},
    {"question": "8 - 6", "answer": "2"},
    {"question": "8 - 7", "answer": "1"},
    {"question": "8 - 8", "answer": "0"},

    {"question": "9 - 0", "answer": "9"},
    {"question": "9 - 1", "answer": "8"},
    {"question": "9 - 2", "answer": "7"},
    {"question": "9 - 3", "answer": "6"},
    {"question": "9 - 4", "answer": "5"},
    {"question": "9 - 5", "answer": "4"},
    {"question": "9 - 6", "answer": "3"},
    {"question": "9 - 7", "answer": "2"},
    {"question": "9 - 8", "answer": "1"},
    {"question": "9 - 9", "answer": "0"},

    {"question": "10 - 0", "answer": "10"},
    {"question": "10 - 1", "answer": "9"},
    {"question": "10 - 2", "answer": "8"},
    {"question": "10 - 3", "answer": "7"},
    {"question": "10 - 4", "answer": "6"},
    {"question": "10 - 5", "answer": "5"},
    {"question": "10 - 6", "answer": "4"},
    {"question": "10 - 7", "answer": "3"},
    {"question": "10 - 8", "answer": "2"},
    {"question": "10 - 9", "answer": "1"},
    {"question": "10 - 10", "answer": "0"}
];
const examleMax20 = [
    {"question": "1 + 0", "answer": "1"},
    {"question": "1 + 1", "answer": "2"},
    {"question": "1 + 2", "answer": "3"},
    {"question": "1 + 3", "answer": "4"},
    {"question": "1 + 4", "answer": "5"},
    {"question": "1 + 5", "answer": "6"},
    {"question": "1 + 6", "answer": "7"},
    {"question": "1 + 7", "answer": "8"},
    {"question": "1 + 8", "answer": "9"},
    {"question": "1 + 9", "answer": "10"},
    {"question": "1 + 10", "answer": "11"},
    {"question": "1 + 11", "answer": "12"},
    {"question": "1 + 12", "answer": "13"},
    {"question": "1 + 13", "answer": "14"},
    {"question": "1 + 14", "answer": "15"},
    {"question": "1 + 15", "answer": "16"},
    {"question": "1 + 16", "answer": "17"},
    {"question": "1 + 17", "answer": "18"},
    {"question": "1 + 18", "answer": "19"},
    {"question": "1 + 19", "answer": "20"},

    {"question": "2 + 0", "answer": "2"},
    {"question": "2 + 1", "answer": "3"},
    {"question": "2 + 2", "answer": "4"},
    {"question": "2 + 3", "answer": "5"},
    {"question": "2 + 4", "answer": "6"},
    {"question": "2 + 5", "answer": "7"},
    {"question": "2 + 6", "answer": "8"},
    {"question": "2 + 7", "answer": "9"},
    {"question": "2 + 8", "answer": "10"},
    {"question": "2 + 9", "answer": "11"},
    {"question": "2 + 10", "answer": "12"},
    {"question": "2 + 11", "answer": "13"},
    {"question": "2 + 12", "answer": "14"},
    {"question": "2 + 13", "answer": "15"},
    {"question": "2 + 14", "answer": "16"},
    {"question": "2 + 15", "answer": "17"},
    {"question": "2 + 16", "answer": "18"},
    {"question": "2 + 17", "answer": "19"},
    {"question": "2 + 18", "answer": "20"},

    {"question": "3 + 0", "answer": "3"},
    {"question": "3 + 1", "answer": "4"},
    {"question": "3 + 2", "answer": "5"},
    {"question": "3 + 3", "answer": "6"},
    {"question": "3 + 4", "answer": "7"},
    {"question": "3 + 5", "answer": "8"},
    {"question": "3 + 6", "answer": "9"},
    {"question": "3 + 7", "answer": "10"},
    {"question": "3 + 8", "answer": "11"},
    {"question": "3 + 9", "answer": "12"},
    {"question": "3 + 10", "answer": "13"},
    {"question": "3 + 11", "answer": "14"},
    {"question": "3 + 12", "answer": "15"},
    {"question": "3 + 13", "answer": "16"},
    {"question": "3 + 14", "answer": "17"},
    {"question": "3 + 15", "answer": "18"},
    {"question": "3 + 16", "answer": "19"},
    {"question": "3 + 17", "answer": "20"},

    {"question": "4 + 0", "answer": "4"},
    {"question": "4 + 1", "answer": "5"},
    {"question": "4 + 2", "answer": "6"},
    {"question": "4 + 3", "answer": "7"},
    {"question": "4 + 4", "answer": "8"},
    {"question": "4 + 5", "answer": "9"},
    {"question": "4 + 6", "answer": "10"},
    {"question": "4 + 7", "answer": "11"},
    {"question": "4 + 8", "answer": "12"},
    {"question": "4 + 9", "answer": "13"},
    {"question": "4 + 10", "answer": "14"},
    {"question": "4 + 11", "answer": "15"},
    {"question": "4 + 12", "answer": "16"},
    {"question": "4 + 13", "answer": "17"},
    {"question": "4 + 14", "answer": "18"},
    {"question": "4 + 15", "answer": "19"},
    {"question": "4 + 16", "answer": "20"},			

    {"question": "5 + 0", "answer": "5"},
    {"question": "5 + 1", "answer": "6"},
    {"question": "5 + 2", "answer": "7"},
    {"question": "5 + 3", "answer": "8"},
    {"question": "5 + 4", "answer": "9"},
    {"question": "5 + 5", "answer": "10"},
    {"question": "5 + 6", "answer": "11"},
    {"question": "5 + 7", "answer": "12"},
    {"question": "5 + 8", "answer": "13"},
    {"question": "5 + 9", "answer": "14"},
    {"question": "5 + 10", "answer": "15"},
    {"question": "5 + 11", "answer": "16"},
    {"question": "5 + 12", "answer": "17"},
    {"question": "5 + 13", "answer": "18"},
    {"question": "5 + 14", "answer": "19"},
    {"question": "5 + 15", "answer": "20"},				

    {"question": "6 + 0", "answer": "6"},
    {"question": "6 + 1", "answer": "7"},
    {"question": "6 + 2", "answer": "8"},
    {"question": "6 + 3", "answer": "9"},
    {"question": "6 + 4", "answer": "10"},
    {"question": "6 + 5", "answer": "11"},
    {"question": "6 + 6", "answer": "12"},
    {"question": "6 + 7", "answer": "13"},
    {"question": "6 + 8", "answer": "14"},
    {"question": "6 + 9", "answer": "15"},
    {"question": "6 + 10", "answer": "16"},
    {"question": "6 + 11", "answer": "17"},
    {"question": "6 + 12", "answer": "18"},
    {"question": "6 + 13", "answer": "19"},
    {"question": "6 + 14", "answer": "20"},

    {"question": "7 + 0", "answer": "7"},
    {"question": "7 + 1", "answer": "8"},
    {"question": "7 + 2", "answer": "9"},
    {"question": "7 + 3", "answer": "10"},
    {"question": "7 + 4", "answer": "11"},
    {"question": "7 + 5", "answer": "12"},
    {"question": "7 + 6", "answer": "13"},
    {"question": "7 + 7", "answer": "14"},
    {"question": "7 + 8", "answer": "15"},
    {"question": "7 + 9", "answer": "16"},
    {"question": "7 + 10", "answer": "17"},
    {"question": "7 + 11", "answer": "18"},
    {"question": "7 + 12", "answer": "19"},
    {"question": "7 + 13", "answer": "20"},

    {"question": "8 + 0", "answer": "8"},
    {"question": "8 + 1", "answer": "9"},
    {"question": "8 + 2", "answer": "10"},
    {"question": "8 + 3", "answer": "11"},
    {"question": "8 + 4", "answer": "12"},
    {"question": "8 + 5", "answer": "13"},
    {"question": "8 + 6", "answer": "14"},
    {"question": "8 + 7", "answer": "15"},
    {"question": "8 + 8", "answer": "16"},
    {"question": "8 + 9", "answer": "17"},
    {"question": "8 + 10", "answer": "18"},
    {"question": "8 + 11", "answer": "19"},
    {"question": "8 + 12", "answer": "20"},
    
    {"question": "9 + 0", "answer": "9"},
    {"question": "9 + 1", "answer": "10"},
    {"question": "9 + 2", "answer": "11"},
    {"question": "9 + 3", "answer": "12"},
    {"question": "9 + 4", "answer": "13"},
    {"question": "9 + 5", "answer": "14"},
    {"question": "9 + 6", "answer": "15"},
    {"question": "9 + 7", "answer": "16"},
    {"question": "9 + 8", "answer": "17"},
    {"question": "9 + 9", "answer": "18"},
    {"question": "9 + 10", "answer": "19"},
    {"question": "9 + 11", "answer": "20"},

    {"question": "10 + 0", "answer": "10"},
    {"question": "10 + 1", "answer": "11"},
    {"question": "10 + 2", "answer": "12"},
    {"question": "10 + 3", "answer": "13"},
    {"question": "10 + 4", "answer": "14"},
    {"question": "10 + 5", "answer": "15"},
    {"question": "10 + 6", "answer": "16"},
    {"question": "10 + 7", "answer": "17"},
    {"question": "10 + 8", "answer": "18"},
    {"question": "10 + 9", "answer": "19"},
    {"question": "10 + 10", "answer": "20"},

    {"question": "11 + 0", "answer": "11"},
    {"question": "11 + 1", "answer": "12"},
    {"question": "11 + 2", "answer": "13"},
    {"question": "11 + 3", "answer": "14"},
    {"question": "11 + 4", "answer": "15"},
    {"question": "11 + 5", "answer": "16"},
    {"question": "11 + 6", "answer": "17"},
    {"question": "11 + 7", "answer": "18"},
    {"question": "11 + 8", "answer": "19"},
    {"question": "11 + 9", "answer": "20"},

    {"question": "12 + 0", "answer": "12"},
    {"question": "12 + 1", "answer": "13"},
    {"question": "12 + 2", "answer": "14"},
    {"question": "12 + 3", "answer": "15"},
    {"question": "12 + 4", "answer": "16"},
    {"question": "12 + 5", "answer": "17"},
    {"question": "12 + 6", "answer": "18"},
    {"question": "12 + 7", "answer": "19"},
    {"question": "12 + 8", "answer": "20"},
    
    {"question": "13 + 0", "answer": "13"},
    {"question": "13 + 1", "answer": "14"},
    {"question": "13 + 2", "answer": "15"},
    {"question": "13 + 3", "answer": "16"},
    {"question": "13 + 4", "answer": "17"},
    {"question": "13 + 5", "answer": "18"},
    {"question": "13 + 6", "answer": "19"},
    {"question": "13 + 7", "answer": "20"},
    
    {"question": "14 + 0", "answer": "14"},
    {"question": "14 + 1", "answer": "15"},
    {"question": "14 + 2", "answer": "16"},
    {"question": "14 + 3", "answer": "17"},
    {"question": "14 + 4", "answer": "18"},
    {"question": "14 + 5", "answer": "19"},
    {"question": "14 + 6", "answer": "20"},
    
    {"question": "15 + 0", "answer": "15"},
    {"question": "15 + 1", "answer": "16"},
    {"question": "15 + 2", "answer": "17"},
    {"question": "15 + 3", "answer": "18"},
    {"question": "15 + 4", "answer": "19"},
    {"question": "15 + 5", "answer": "20"},
    
    {"question": "16 + 0", "answer": "16"},
    {"question": "16 + 1", "answer": "17"},
    {"question": "16 + 2", "answer": "18"},
    {"question": "16 + 3", "answer": "19"},
    {"question": "16 + 4", "answer": "20"},

    {"question": "17 + 0", "answer": "17"},
    {"question": "17 + 1", "answer": "18"},
    {"question": "17 + 2", "answer": "19"},
    {"question": "17 + 3", "answer": "20"},

    {"question": "18 + 0", "answer": "18"},
    {"question": "18 + 1", "answer": "19"},
    {"question": "18 + 2", "answer": "20"},

    {"question": "19 + 0", "answer": "19"},
    {"question": "19 + 1", "answer": "20"},

    {"question": "20 + 0", "answer": "20"},

    //-------------------------------------

    {"question": "1 - 0", "answer": "1"},
    {"question": "1 - 1", "answer": "0"},

    {"question": "2 - 0", "answer": "2"},
    {"question": "2 - 1", "answer": "1"},
    {"question": "2 - 2", "answer": "-"},

    {"question": "3 - 0", "answer": "3"},
    {"question": "3 - 1", "answer": "2"},
    {"question": "3 - 2", "answer": "1"},
    {"question": "3 - 3", "answer": "0"},

    {"question": "4 - 0", "answer": "4"},
    {"question": "4 - 1", "answer": "3"},
    {"question": "4 - 2", "answer": "2"},
    {"question": "4 - 3", "answer": "1"},
    {"question": "4 - 4", "answer": "0"},

    {"question": "5 - 0", "answer": "5"},
    {"question": "5 - 1", "answer": "4"},
    {"question": "5 - 2", "answer": "3"},
    {"question": "5 - 3", "answer": "2"},
    {"question": "5 - 4", "answer": "1"},
    {"question": "5 - 5", "answer": "0"},

    {"question": "6 - 0", "answer": "6"},
    {"question": "6 - 1", "answer": "5"},
    {"question": "6 - 2", "answer": "4"},
    {"question": "6 - 3", "answer": "3"},
    {"question": "6 - 4", "answer": "2"},
    {"question": "6 - 5", "answer": "1"},
    {"question": "6 - 6", "answer": "0"},

    {"question": "7 - 0", "answer": "7"},
    {"question": "7 - 1", "answer": "6"},
    {"question": "7 - 2", "answer": "5"},
    {"question": "7 - 3", "answer": "4"},
    {"question": "7 - 4", "answer": "3"},
    {"question": "7 - 5", "answer": "2"},
    {"question": "7 - 6", "answer": "1"},
    {"question": "7 - 7", "answer": "0"},

    {"question": "8 - 0", "answer": "8"},
    {"question": "8 - 1", "answer": "7"},
    {"question": "8 - 2", "answer": "6"},
    {"question": "8 - 3", "answer": "5"},
    {"question": "8 - 4", "answer": "4"},
    {"question": "8 - 5", "answer": "3"},
    {"question": "8 - 6", "answer": "2"},
    {"question": "8 - 7", "answer": "1"},
    {"question": "8 - 8", "answer": "0"},

    {"question": "9 - 0", "answer": "9"},
    {"question": "9 - 1", "answer": "8"},
    {"question": "9 - 2", "answer": "7"},
    {"question": "9 - 3", "answer": "6"},
    {"question": "9 - 4", "answer": "5"},
    {"question": "9 - 5", "answer": "4"},
    {"question": "9 - 6", "answer": "3"},
    {"question": "9 - 7", "answer": "2"},
    {"question": "9 - 8", "answer": "1"},
    {"question": "9 - 9", "answer": "0"},

    {"question": "10 - 0", "answer": "10"},
    {"question": "10 - 1", "answer": "9"},
    {"question": "10 - 2", "answer": "8"},
    {"question": "10 - 3", "answer": "7"},
    {"question": "10 - 4", "answer": "6"},
    {"question": "10 - 5", "answer": "5"},
    {"question": "10 - 6", "answer": "4"},
    {"question": "10 - 7", "answer": "3"},
    {"question": "10 - 8", "answer": "2"},
    {"question": "10 - 9", "answer": "1"},
    {"question": "10 - 10", "answer": "0"},

    {"question": "11 - 0", "answer": "11"},
    {"question": "11 - 1", "answer": "10"},
    {"question": "11 - 2", "answer": "9"},
    {"question": "11 - 3", "answer": "8"},
    {"question": "11 - 4", "answer": "7"},
    {"question": "11 - 5", "answer": "6"},
    {"question": "11 - 6", "answer": "5"},
    {"question": "11 - 7", "answer": "4"},
    {"question": "11 - 8", "answer": "3"},
    {"question": "11 - 9", "answer": "2"},
    {"question": "11 - 10", "answer": "1"},
    {"question": "11 - 11", "answer": "0"},

    {"question": "12 - 0", "answer": "12"},
    {"question": "12 - 1", "answer": "11"},
    {"question": "12 - 2", "answer": "10"},
    {"question": "12 - 3", "answer": "9"},
    {"question": "12 - 4", "answer": "8"},
    {"question": "12 - 5", "answer": "7"},
    {"question": "12 - 6", "answer": "6"},
    {"question": "12 - 7", "answer": "5"},
    {"question": "12 - 8", "answer": "4"},
    {"question": "12 - 9", "answer": "3"},
    {"question": "12 - 10", "answer": "2"},
    {"question": "12 - 11", "answer": "1"},
    {"question": "12 - 12", "answer": "0"},

    {"question": "13 - 0", "answer": "13"},
    {"question": "13 - 1", "answer": "12"},
    {"question": "13 - 2", "answer": "11"},
    {"question": "13 - 3", "answer": "10"},
    {"question": "13 - 4", "answer": "9"},
    {"question": "13 - 5", "answer": "8"},
    {"question": "13 - 6", "answer": "7"},
    {"question": "13 - 7", "answer": "6"},
    {"question": "13 - 8", "answer": "5"},
    {"question": "13 - 9", "answer": "4"},
    {"question": "13 - 10", "answer": "3"},
    {"question": "13 - 11", "answer": "2"},
    {"question": "13 - 12", "answer": "1"},
    {"question": "13 - 13", "answer": "0"},

    {"question": "14 - 0", "answer": "14"},
    {"question": "14 - 1", "answer": "13"},
    {"question": "14 - 2", "answer": "12"},
    {"question": "14 - 3", "answer": "11"},
    {"question": "14 - 4", "answer": "10"},
    {"question": "14 - 5", "answer": "9"},
    {"question": "14 - 6", "answer": "8"},
    {"question": "14 - 7", "answer": "7"},
    {"question": "14 - 8", "answer": "6"},
    {"question": "14 - 9", "answer": "5"},
    {"question": "14 - 10", "answer": "4"},
    {"question": "14 - 11", "answer": "3"},
    {"question": "14 - 12", "answer": "2"},
    {"question": "14 - 13", "answer": "1"},
    {"question": "14 - 14", "answer": "0"},

    {"question": "15 - 0", "answer": "15"},
    {"question": "15 - 1", "answer": "14"},
    {"question": "15 - 2", "answer": "13"},
    {"question": "15 - 3", "answer": "12"},
    {"question": "15 - 4", "answer": "11"},
    {"question": "15 - 5", "answer": "10"},
    {"question": "15 - 6", "answer": "9"},
    {"question": "15 - 7", "answer": "8"},
    {"question": "15 - 8", "answer": "7"},
    {"question": "15 - 9", "answer": "6"},
    {"question": "15 - 10", "answer": "5"},
    {"question": "15 - 11", "answer": "4"},
    {"question": "15 - 12", "answer": "3"},
    {"question": "15 - 13", "answer": "2"},
    {"question": "15 - 14", "answer": "1"},
    {"question": "15 - 15", "answer": "0"},

    {"question": "16 - 0", "answer": "16"},
    {"question": "16 - 1", "answer": "15"},
    {"question": "16 - 2", "answer": "14"},
    {"question": "16 - 3", "answer": "13"},
    {"question": "16 - 4", "answer": "12"},
    {"question": "16 - 5", "answer": "11"},
    {"question": "16 - 6", "answer": "10"},
    {"question": "16 - 7", "answer": "9"},
    {"question": "16 - 8", "answer": "8"},
    {"question": "16 - 9", "answer": "7"},
    {"question": "16 - 10", "answer": "6"},
    {"question": "16 - 11", "answer": "5"},
    {"question": "16 - 12", "answer": "4"},
    {"question": "16 - 13", "answer": "3"},
    {"question": "16 - 14", "answer": "2"},
    {"question": "16 - 15", "answer": "1"},
    {"question": "16 - 16", "answer": "0"},

    {"question": "17 - 0", "answer": "17"},
    {"question": "17 - 1", "answer": "16"},
    {"question": "17 - 2", "answer": "15"},
    {"question": "17 - 3", "answer": "14"},
    {"question": "17 - 4", "answer": "13"},
    {"question": "17 - 5", "answer": "12"},
    {"question": "17 - 6", "answer": "11"},
    {"question": "17 - 7", "answer": "10"},
    {"question": "17 - 8", "answer": "9"},
    {"question": "17 - 9", "answer": "8"},
    {"question": "17 - 10", "answer": "7"},
    {"question": "17 - 11", "answer": "6"},
    {"question": "17 - 12", "answer": "5"},
    {"question": "17 - 13", "answer": "4"},
    {"question": "17 - 14", "answer": "3"},
    {"question": "17 - 15", "answer": "2"},
    {"question": "17 - 16", "answer": "1"},
    {"question": "17 - 17", "answer": "0"},

    {"question": "18 - 0", "answer": "18"},
    {"question": "18 - 1", "answer": "17"},
    {"question": "18 - 2", "answer": "16"},
    {"question": "18 - 3", "answer": "15"},
    {"question": "18 - 4", "answer": "14"},
    {"question": "18 - 5", "answer": "13"},
    {"question": "18 - 6", "answer": "12"},
    {"question": "18 - 7", "answer": "11"},
    {"question": "18 - 8", "answer": "10"},
    {"question": "18 - 9", "answer": "9"},
    {"question": "18 - 10", "answer": "8"},
    {"question": "18 - 11", "answer": "7"},
    {"question": "18 - 12", "answer": "6"},
    {"question": "18 - 13", "answer": "5"},
    {"question": "18 - 14", "answer": "4"},
    {"question": "18 - 15", "answer": "3"},
    {"question": "18 - 16", "answer": "2"},
    {"question": "18 - 17", "answer": "1"},
    {"question": "18 - 18", "answer": "0"},

    {"question": "19 - 0", "answer": "19"},
    {"question": "19 - 1", "answer": "18"},
    {"question": "19 - 2", "answer": "17"},
    {"question": "19 - 3", "answer": "16"},
    {"question": "19 - 4", "answer": "15"},
    {"question": "19 - 5", "answer": "14"},
    {"question": "19 - 6", "answer": "13"},
    {"question": "19 - 7", "answer": "12"},
    {"question": "19 - 8", "answer": "11"},
    {"question": "19 - 9", "answer": "10"},
    {"question": "19 - 10", "answer": "9"},
    {"question": "19 - 11", "answer": "8"},
    {"question": "19 - 12", "answer": "7"},
    {"question": "19 - 13", "answer": "6"},
    {"question": "19 - 14", "answer": "5"},
    {"question": "19 - 15", "answer": "4"},
    {"question": "19 - 16", "answer": "3"},
    {"question": "19 - 17", "answer": "2"},
    {"question": "19 - 18", "answer": "1"},
    {"question": "19 - 19", "answer": "0"},

    {"question": "20 - 0", "answer": "20"},
    {"question": "20 - 1", "answer": "19"},
    {"question": "20 - 2", "answer": "18"},
    {"question": "20 - 3", "answer": "17"},
    {"question": "20 - 4", "answer": "16"},
    {"question": "20 - 5", "answer": "15"},
    {"question": "20 - 6", "answer": "14"},
    {"question": "20 - 7", "answer": "13"},
    {"question": "20 - 8", "answer": "12"},
    {"question": "20 - 9", "answer": "11"},
    {"question": "20 - 10", "answer": "10"},
    {"question": "20 - 11", "answer": "9"},
    {"question": "20 - 12", "answer": "8"},
    {"question": "20 - 13", "answer": "7"},
    {"question": "20 - 14", "answer": "6"},
    {"question": "20 - 15", "answer": "5"},
    {"question": "20 - 16", "answer": "4"},
    {"question": "20 - 17", "answer": "3"},
    {"question": "20 - 18", "answer": "2"},
    {"question": "20 - 19", "answer": "1"},
    {"question": "20 - 20", "answer": "0"}
];

//variables
let startTime;
let deltaTime;
let examples;
let lives = 3;
let fallSpeed = 1;
let gameRunning = false;
let moveInterval;
let solvedExamples = 0; 
let correctAnswer; 

//timers
function startTimer() {
    startTime = Date.now();
}
function stopTimer() {
    const endTime = Date.now();
    const elapsedTimeInSeconds = (endTime - startTime) / 1000;
    return elapsedTimeInSeconds;
}

//answer checking
answerInput.addEventListener('keydown', function(event) {
    if (!gameRunning) return;
    if (event.key === 'Enter') {
        const currentExample = field.querySelector('div');
        if (!currentExample) return;

        const answer = answerInput.value.trim();
        if (answer === correctAnswer) {
            field.innerHTML = '';
            clearInterval(moveInterval);
            fallSpeed += 0.1;
            createExample();
            solvedExamples++;
            updateCount();
        } else {
            answerInput.classList.add('shake');
            setTimeout(() => {
                answerInput.classList.remove('shake');
            }, 500);
        }
        answerInput.value = '';
    }
});

//example creating
function createExample() {
    const randomIndex = Math.floor(Math.random() * examples.length);
    const example = examples[randomIndex];
    const exampleElement = document.createElement('div');
    exampleElement.textContent = example.question;
    exampleElement.dataset.answer = example.answer; 
    exampleElement.style.position = 'absolute';
    exampleElement.style.left = Math.random() * (field.offsetWidth - 100) + 'px';
    exampleElement.style.top = '-50px';
    exampleElement.style.fontSize = "1.2em";
    correctAnswer = exampleElement.dataset.answer;
    field.appendChild(exampleElement);

    moveInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(moveInterval);
            return;
        }
        const topPosition = exampleElement.offsetTop;
        exampleElement.style.top = topPosition + fallSpeed + 'px';
        if (topPosition > field.offsetHeight) {
            clearInterval(moveInterval);
            if (exampleElement.parentNode) {
                field.innerHTML='';
                if (--lives === 0) {
                    endGame();
                    field.innerHTML='';
                }
                drawHearts();
                createExample();
            }
        }
    }, deltaTime);
}

//game starting
function startGame() { 
    if (!gameRunning) {
        var game = document.querySelector('input[name="game"]:checked').value;
        var difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    
        if (game === 'multiplicationtable') {
            examples = examplesMultiplicationTable;
        }
        if (game === 'max10') {
            examples = examleMax10;
        }
        if (game === 'max20') {
            examples = examleMax20;
        }
        if (difficulty === 'easy') {
            deltaTime = 30;
        }
        if (difficulty === 'normal') {
            deltaTime = 20;
        }
        if (difficulty === 'hard') {
            deltaTime = 10;
        }

        $.ajax({
            url: "../../php/get-record-data.php",
            method: "POST",
            data: { login: getCookieValue("login") },
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (response) {
                if (response.success) {
                    if (response.data && response.data.length > 0) {
                        var userData = response.data[0];
                        document.getElementById("record").textContent = userData[game+'-'+difficulty];
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
    
        recordContainer.style.display = 'block';
        settingsContainer.style.display = 'none';
        gameRunning = true;
        startButton.disabled = true;
        answerInput.focus();
        createExample();
        startTimer();
    }
}

//game ending
function endGame() {
    answerInput.blur();
    const confettiElements = document.querySelectorAll(".confetti");
    confettiElements.forEach((element) => {
        element.style.display = "block";
    });

    lives = 3;
    fallSpeed = 1;
    gameRunning = false;
    startButton.disabled = false;
    endContainer.style.display = 'flex';
    answerInput.value = "";
    endSpan.textContent = solvedExamples;
    updateCount();
    drawHearts();

    var loginAjax = getCookieValue("login");
    var langAjax = getCookieValue("lang");
    var gameAjax = document.querySelector('input[name="game"]:checked').value;
    var difficultyAjax = document.querySelector('input[name="difficulty"]:checked').value;
    var time = stopTimer();
    var solvedExamplesAjax = solvedExamples;
    $.ajax({
        url: "../../php/set-game-data.php",
        method: "POST",
        data: { login: loginAjax, score: solvedExamplesAjax, time: time, game: gameAjax, difficulty: difficultyAjax },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
            console.log("set-inf: login: ", loginAjax, '; score: +', solvedExamplesAjax, '; time: +', time, '; game: ', gameAjax, '; difficulty: ', difficultyAjax, '; response: ', response);
        },
        error: function () {
            if (langAjax === "ru") {
                alert("Произошла ошибка при сохранении данных попробуйте войти повторно.");
            }
            if (langAjax === "lv") {
                alert("Saglabājot datus, radās kļūda. Lūdzu, mēģiniet pieteikties vēlreiz.");
            }
            if (langAjax === "en") {
                alert("An error occurred while saving data, please try logging in again.");
            }
        },
    });

    solvedExamples = 0;
}

//heart drawing
function drawHearts() {
    heartsContainer.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        heartsContainer.innerHTML += `<svg class="heart-svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    }
}

//updating created example count
function updateCount() {
    if (lang === "ru") {
        countContainer.textContent = `Сделанные примеры: ${solvedExamples}`;
    }
    if (lang === "en") {
        countContainer.textContent = `Made examples: ${solvedExamples}`;
    }
    if (lang === "lv") {
        countContainer.textContent = `Veikti piemēri: ${solvedExamples}`;
    }
}

//updating data for new game
function newGame() {
    if (lang === "ru") {
        countContainer.textContent = `Сделанные примеры: 0`;
    }
    if (lang === "en") {
        countContainer.textContent = `Made examples: 0`;
    }
    if (lang === "lv") {
        countContainer.textContent = `Veikti piemēri: 0`;
    }

    recordContainer.style.display = 'none';
    endContainer.style.display = 'none';
    settingsContainer.style.display = 'flex';
    const confettiElements = document.querySelectorAll(".confetti");
    confettiElements.forEach((element) => {
        element.style.display = "none";
    });
}

startButton.addEventListener('click', startGame);
againButton.addEventListener('click', newGame);
drawHearts();

