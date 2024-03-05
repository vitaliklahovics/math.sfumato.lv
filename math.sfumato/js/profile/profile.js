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
        document.title = "Profile";			
    }
    if (language === "lv") {
        document.title = "Profils";			
    }
    if (language === "ru") {
        document.title = "Профиль";			
    }
}

function SetColor(param) {
    var topPart = document.getElementById("top-part");
    var exercises = document.querySelectorAll(".exercise .header");
    var small = document.getElementById("small");
    var footer = document.getElementById("footer");
    var exerciseImage = document.getElementById("exercise-image");
    var gameImage = document.getElementById("game-image");
    var statisticImage = document.getElementById("statistic-image");
    var calendarImage = document.getElementById("calendar-image");

    const root = document.documentElement;

    switch (param) {
        case "green-blue":
            exerciseImage.style.backgroundImage = "url('../../images/profile/exericises.png')";
            gameImage.style.backgroundImage = "url('../../images/profile/game.png')";
            statisticImage.style.backgroundImage = "url('../../images/profile/statistic.png')";
            calendarImage.style.backgroundImage = "url('../../images/profile/calendar.png')";

            topPart.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)";
            small.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)";
            footer.style.background = "linear-gradient(180deg, rgba(1,128,61,0.5046393557422969) 0%, rgba(1,127,128,0.5046393557422969) 100%)";
            Array.from(exercises).forEach(function(exercise) {
                exercise.style.background = 'linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)';
            });	

            root.style.setProperty('--base-color', '#01803D');
            document.cookie = `color=${encodeURIComponent(param)}; path=/`;
            break;
        case "pink-yellow":
            exerciseImage.style.backgroundImage = "url('../../images/profile/exericises-pink.png')";
            gameImage.style.backgroundImage = "url('../../images/profile/game-pink.png')";
            statisticImage.style.backgroundImage = "url('../../images/profile/statistic-pink.png')";
            calendarImage.style.backgroundImage = "url('../../images/profile/calendar-pink.png')";

            topPart.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)";
            small.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)";
            footer.style.background = "linear-gradient(180deg, rgba(255,0,241,0.7987788865546218) 0%, rgba(238,238,18,0.8043811274509804) 100%)";
            Array.from(exercises).forEach(function(exercise) {
                exercise.style.background = 'linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)';
            });	

            root.style.setProperty('--base-color', 'rgba(255,0,241,1)');
            document.cookie = `color=${encodeURIComponent(param)}; path=/`;
    }
}	

const login = getCookieValue("login");
if (!login) {
    //window.location.href = "../../";
} else {
    var userName = document.getElementById("user-name");
    userName.textContent = login;
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

/* TO TOP */

function scrollToTop() {
    var element = document.getElementById("top");
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
