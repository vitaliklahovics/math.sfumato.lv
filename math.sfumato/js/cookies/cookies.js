function scrollToTop() {
    var element = document.getElementById("top");
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}       

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

function SetColor(param) {
    var bodyI = document.getElementById("body");
    var menu = document.getElementById("menu");
    const root = document.documentElement;

    switch (param) {
        case "green-blue":
            bodyI.style.background = "linear-gradient(180deg, rgba(1,128,61,0.5046393557422969) 0%, rgba(1,127,128,0.5046393557422969) 100%)";
            menu.style.background = "linear-gradient(180deg, rgba(1,128,61,1) 0%, rgba(1,127,128,1) 100%)";

            root.style.setProperty('--base-color', '#01803D');
            document.cookie = `color=${encodeURIComponent(param)}; path=/`;
            break;
        case "pink-yellow":
            bodyI.style.background = "linear-gradient(180deg, rgba(255,0,241,0.7987788865546218) 0%, rgba(238,238,18,0.8043811274509804) 100%)";
            menu.style.background = "linear-gradient(180deg, rgba(255,0,241,1) 0%, rgba(238,238,18,1) 100%)";

            root.style.setProperty('--base-color', 'rgba(255,0,241,1)');
            document.cookie = `color=${encodeURIComponent(param)}; path=/`;
    }
}	

const color = getCookieValue("color");
if (color) {
    SetColor(color);
} else {
    SetColor("green-blue");
}
