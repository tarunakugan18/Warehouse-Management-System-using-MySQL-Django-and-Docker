const session_modal = document.getElementById("session-modal");
const session_modal_allow_btn = document.getElementById("session-modal-allow-btn");
const side_navigation_bar = document.getElementById("side-navigation-bar");
const main_content = document.getElementById("main-content");
const navigation_bar = document.getElementById("navigation-bar");

var sessionTimeout, logoutTimeout;
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

function manageNavigationBar() {
    if (width >= 1280) {
        if (side_navigation_bar.style.width === "0px" || side_navigation_bar.style.width == "") {
            main_content.style.marginLeft = "250px";
            side_navigation_bar.style.width = "250px";
            navigation_bar.style.marginLeft = "250px";
        } else {
            main_content.style.marginLeft = "0";
            side_navigation_bar.style.width = "0";
            navigation_bar.style.marginLeft = "0";
        }
    } else {
        if(side_navigation_bar.style.height === "0px" || side_navigation_bar.style.height == "") {
            side_navigation_bar.style.height = "auto";
        } else {
            side_navigation_bar.style.height = "0";
        }
    }
}

