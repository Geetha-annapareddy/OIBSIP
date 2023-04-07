function func() {
    var target = document.getElementById("content")
    target.style.display = "block";
}

var tablinks = document.getElementsByClassName('tab-links')
var tabcontents = document.getElementsByClassName('tab-contents')
function opentab(tabname) {
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab")
    }
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link")
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}