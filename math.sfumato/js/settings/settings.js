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

    const submitButton = document.getElementById("send-new-settings");
    // Changing title
    if (language === "en") {
        document.title = "Settings";
        submitButton.value = "Submit";			
    }
    if (language === "lv") {
        document.title = "Iestatījumi";	
        submitButton.value = "Apstiprināt";	
    }
    if (language === "ru") {
        document.title = "Настройки";
        submitButton.value = "Подтвердить";			
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
var color = getCookieValue("color");
if (color) {
    SetColor(color);
} else {
    SetColor("green-blue");
}

/*-------------------------------------------------------*/

/* SETTINGS */

function SetNewColorAndLanguage(e) {
    e.preventDefault()

    let newColor = document.querySelector('input[name="color"]:checked').value;
    let newLang = document.querySelector('input[name="lang"]:checked').value;

    setLang(newLang);
    SetColor(newColor);

    $.ajax({
        url: "../../php/update-settings.php",
        method: "POST",
        data: { login: login, color: newColor, language: newLang },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
            console.log("update-inf: login: ", login, '; color: +', newColor, '; language: +', newLang + '; response: ', response);
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
}

function exitProfile() {
    var cookiesToDelete = ["lang", "color", "login", "password"];
    cookiesToDelete.forEach(function(cookieName) {
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

    location.href="../../";
}