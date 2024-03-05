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

function HideCookies() {
    document.getElementById("cookie-panel").style.display = "none";

    document.cookie = `cookies=${encodeURIComponent("yes")}; path=/`;
}

function containsOnlyLatinLettersAndNumbers(inputString) {
    var regex = /^[a-zA-Z0-9-_]+$/;
    return regex.test(inputString);
}		

let language;
function setLang(newLang) {
    var elements = document.querySelectorAll(".lang-c");
    Array.from(elements).forEach(function(element) {
        element.style.display = 'none';
    });

    var elementCL = document.querySelectorAll("." + newLang);
    Array.from(elementCL).forEach(function(elementCL) {
        elementCL.style.display = 'block';
    });

    // Changing form placeholders
    var elementsLogin = document.getElementsByName("login");
    var elementsPassword = document.getElementsByName("password");
    if (newLang === "en") {
        document.title = "Home page";
        Array.from(elementsLogin).forEach(function(elementLogin) {
            elementLogin.placeholder = "Username";
        });
        Array.from(elementsPassword).forEach(function(elementPassword) {
            elementPassword.placeholder = "Password";
        });				
    }
    if (newLang === "lv") {
        document.title = "Mājas lapa";
        Array.from(elementsLogin).forEach(function(elementLogin) {
            elementLogin.placeholder = "Lietotājvārds";
        });
        Array.from(elementsPassword).forEach(function(elementPassword) {
            elementPassword.placeholder = "Parole";
        });				
    }
    if (newLang === "ru") {
        document.title = "Главная страница";
        Array.from(elementsLogin).forEach(function(elementLogin) {
            elementLogin.placeholder = "Логин";
        });
        Array.from(elementsPassword).forEach(function(elementPassword) {
            elementPassword.placeholder = "Пароль";
        });				
    }

    language = newLang;
    document.cookie = `lang=${encodeURIComponent(newLang)}; path=/`;
}

function SetColor(param) {
    var header = document.getElementById("header");
    var footer = document.getElementById("footer");
    var form = document.getElementById("form-main");
    const root = document.documentElement;

    switch (param) {
        case "green-blue":
            header.style.background = "linear-gradient(180deg, rgba(1,128,61,0.5046393557422969) 0%, rgba(1,127,128,0.5046393557422969) 100%)";
            footer.style.background = "linear-gradient(180deg, rgba(1,127,128,0.5046393557422969) 10%, rgba(206,206,206,1) 70%)";
            form.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 70%)";
            root.style.setProperty('--base-color', '#01803D');
            document.cookie = `color=${encodeURIComponent(param)}; path=/`;
            break;
        case "pink-yellow":
            header.style.background = "linear-gradient(180deg, rgba(255,0,241,0.7987788865546218) 0%, rgba(238,238,18,0.8043811274509804) 100%)";
            footer.style.background = "linear-gradient(180deg, rgba(238,238,18,0.8043811274509804) 10%, rgba(206,206,206,1) 70%)";
            form.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 70%)";
            root.style.setProperty('--base-color', 'rgba(255,0,241,1)');
            document.cookie = `color=${encodeURIComponent(param)}; path=/`;
    }
}

const login = getCookieValue("login");
const password = getCookieValue("password");
if (login && password) {
    $.ajax({
        url: "php/check-user.php",
        method: "POST",
        data: { login: login, password: password },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
            if (response.success) {
                window.location.href = "app/profile/";
            }
        },
        error: function () {
            switch (language) {
                case "en":
                    alert("An error occurred while verifying the user, please try logging in again.");
                    break;
                case "ru":
                    alert("Произошла ошибка при проверке пользователя, попробуйте войти повторно.");
                    break;
                case "lv":
                    alert("Pārbaudot lietotāju, radās kļūda. Lūdzu, mēģiniet pieteikties vēlreiz.");
            }				
        },
    });
}

var lang = getCookieValue("lang");
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

var cookies = getCookieValue("cookies");
if (cookies) {
    if (cookies === "yes") {
        document.getElementById("cookie-panel").style.display = "none";
    }
}

//language switching
//------------------------------------------
let el = $('.switch');
let cur = el.find('.current');
let options = el.find('.options li');
let content = $('#content');

// Open language dropdown panel
el.on('click', function(e) {
    el.addClass('show-options');

    setTimeout(function() {
        el.addClass('anim-options');
    }, 50);

    setTimeout(function() {
        el.addClass('show-shadow');
    }, 200);
});

// Close language dropdown panel
options.on('click', function(e) {
    e.stopPropagation();
    el.removeClass('anim-options');
    el.removeClass('show-shadow');

    let newLang = $(this).data('lang');

    cur.find('span').text(newLang);
    content.attr('class', newLang);

    setLang(newLang);

    var optionsList = document.getElementsByClassName("options-list")[0];
    var listItems = optionsList.getElementsByTagName("li");

    for (var i = 0; i < listItems.length; i++) {
        var dataLangValue = listItems[i].getAttribute("data-lang");
        listItems[i].style.color = "var(--text-color)";

        if (dataLangValue === newLang) {
            listItems[i].style.color = "var(--base-color)";
        }
    }

    setTimeout(function() {
        el.removeClass('show-options');
    }, 600);
});

cur.find('span').text(language);
content.attr('class', language);
var optionsList = document.getElementsByClassName("options-list")[0];
var listItems = optionsList.getElementsByTagName("li");
for (var i = 0; i < listItems.length; i++) {
    var dataLangValue = listItems[i].getAttribute("data-lang");
    listItems[i].style.color = "var(--text-color)";

    if (dataLangValue === language) {
        listItems[i].style.color = "var(--base-color)";
    }
}

//------------------------------------------

/* FORM */

const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");

//login form
firstForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const login0 = document.getElementById("login0").value;
    const password0 = document.getElementById("password0").value;
    
    $.ajax({
        url: "php/check-user.php",
        method: "POST",
        data: { login: login0, password: password0 },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {3
            if (response.success) {
                setTimeout(() => {
                    $.ajax({
                        url: "../../php/get-settings-data.php",
                        method: "POST",
                        data: { login: login0 },
                        dataType: "json",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (response) {
                            if (response.success) {
                                if (response.data && response.data.length > 0) {
                                    var userData = response.data[0];
                                    
                                    document.cookie = `lang=${encodeURIComponent(userData["language"])}; path=/`;
                                    document.cookie = `color=${encodeURIComponent(userData["color"])}; path=/`;
                                    document.cookie = `login=${encodeURIComponent(login0)}; path=/`;
                                    document.cookie = `password=${encodeURIComponent(password0)}; path=/`;
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
                                window.location.href = "app/profile/";
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
                }, 100);
            } else {
                switch (language) {
                    case "en":
                        alert("There is no user with this data. Please register or try again.");
                        break;
                    case "ru":
                        alert("Нет пользователя с этими данными. Пожалуйста, зарегистрируйтесь или попробуйте еще раз.");
                        break;
                    case "lv":
                        alert("Nav neviena lietotāja ar šiem datiem. Lūdzu, reģistrējieties vai mēģiniet vēlreiz.");
                }
            }
        },
        error: function () {
            switch (language) {
                case "en":
                    alert("An error occurred while verifying the user.");
                    break;
                case "ru":
                    alert("Произошла ошибка при проверке пользователя.");
                    break;
                case "lv":
                    alert("Pārbaudot lietotāju, radās kļūda.");
            }
        },
    });
});

//sig up form
secondForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const login1 = document.getElementById("login1").value;
    const password1 = document.getElementById("password1").value;

    var login1OK = containsOnlyLatinLettersAndNumbers(login1);
    var password1OK = containsOnlyLatinLettersAndNumbers(password1);

    if (!login1OK) {
        switch (language) {
            case "en":
                alert("The username can only contain numbers and Latin letters.");
                break;
            case "ru":
                alert("Имя пользователя может содержать только цифры и латинские буквы.");
                break;
            case "lv":
                alert("Lietotājvārdā drīkst būt tikai cipari un latīņu burti.");
        }				
    }
    if (!password1OK) {
        switch (language) {
            case "en":
                alert("The password can only contain numbers and Latin letters.");
                break;
            case "ru":
                alert("Пароль может содержать только цифры и латинские буквы.");
                break;
            case "lv":
                alert("Parolē var būt tikai cipari un latīņu burti.");
        }				
    }
    
    if (login1OK && password1OK) {			
        document.cookie = `login=${encodeURIComponent(login1)}; path=/`;
        document.cookie = `password=${encodeURIComponent(password1)}; path=/`;
        var languageLogin = getCookieValue("lang");
        var colorLogin = getCookieValue("color");

        if (languageLogin) {
            setLang(languageLogin);
        } else {
            setLang("en");
        }
        if (colorLogin) {
            SetColor(colorLogin);
        } else {
            SetColor("green-blue");
        }

        setTimeout(() => {
            $.ajax({
                url: "php/add-user.php",
                method: "POST",
                data: { login: login1, password: password1, color: colorLogin, language: languageLogin},
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (response) {
                    if (response.success) {
                        window.location.href = "app/profile/";
                    } else {
                        if (response.message === 'Пользователь с таким логином уже существует') {
                            switch (language) {
                                case "en":
                                    alert("A user with the same name already exists.");
                                    break;
                                case "ru":
                                    alert("Пользователь с таким именем уже существует.");
                                    break;
                                case "lv":
                                    alert("Lietotājs ar tādu pašu nosaukumu jau eksistē.");
                            }				
                        } else {
                            alert(response.message);
                        }
                    }
                },
                error: function () {
                    switch (language) {
                        case "en":
                            alert("An error occurred while creating a new user.");
                            break;
                        case "ru":
                            alert("Произошла ошибка при создании нового пользователя.");
                            break;
                        case "lv":
                            alert("Veidojot jaunu lietotāju, radās kļūda.");
                    }				
                },
            });
        }, 100);
    }
});		

