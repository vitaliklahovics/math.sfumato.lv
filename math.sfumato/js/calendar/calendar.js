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
    //window.location.href = "../../";
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

/* CALENDAR */

function getFileList(userName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../php/get-files-calendar.php?userName=' + userName, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var fileList = JSON.parse(xhr.responseText);
            fileList.reverse();
            displayFileList(fileList);
        }
    };
    xhr.send();
}

function displayFileList(fileList) {
    var fileListDiv = document.getElementById('fileList');
    fileListDiv.innerHTML = '';

    fileList.forEach(function (file) {
        var fileDiv = document.createElement('div');
        fileDiv.innerHTML = ' <a href="#" onclick="showFileContent(\'' + file.filename + '\')">' + file.filename + '</a><br><br>';
        fileListDiv.appendChild(fileDiv);
    });
}

function closeFileContent() {
    var fileContentDiv = document.getElementById('file-content');
    var ovarlayDiv = document.getElementById('overlayF');

    setTimeout(function() {
        fileContentDiv.style.opacity = "0";
    }, 1);
    fileContentDiv.style.display = "none";

    setTimeout(function() {
        ovarlayDiv.style.opacity = "0";
    }, 1);
    ovarlayDiv.style.display = "none";
}

function showFileContent(filename) {
    var fileContentDiv = document.getElementById('file-content');
    var ovarlayDiv = document.getElementById('overlayF');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../users/' + login + '/' + filename, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var fileContent = JSON.parse(xhr.responseText);
            displayFileContent(fileContent);
        }
    };
    xhr.send();

    fileContentDiv.style.display = "flex";
    setTimeout(function() {
        fileContentDiv.style.opacity = "1";
    }, 1);

    ovarlayDiv.style.display = "block";
    setTimeout(function() {
        ovarlayDiv.style.opacity = "1";
    }, 1);
}

function displayFileContent(fileContent) {
    var contentTable;
    if (lang === "en") {
        contentTable = '<table><tr><th>Example</th><th>Right?</th><th>Time</th></tr>';
    }
    if (lang === "lv") {
        contentTable = '<table><tr><th>Piemērs</th><th>Pareizi?</th><th>Laiks</th></tr>';
    }
    if (lang === "ru") {
        contentTable = '<table><tr><th>Пример</th><th>Правильно?</th><th>Время</th></tr>';
    }
    
    fileContent.forEach(function (item) {
        if (item.iscorrect === "+") {
            contentTable += '<tr><td>' + item.example + '</td><td style="font-weight: bold; color: green;">' + item.iscorrect + '</td><td>' + item.time + 's. </td></tr>';
        } else {
            contentTable += '<tr><td>' + item.example + '</td><td style="font-weight: bold; color: red;">' + item.iscorrect + '</td><td>' + item.time + 's. </td></tr>';
        }
    });
    contentTable += '</table>';

    document.getElementById("file-content").innerHTML = contentTable;
}

getFileList(login);

