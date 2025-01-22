(function(){
var mobMenuIcon     = document.getElementById("mobile-nav-icon");
var mobNav          = document.getElementById("hnav");
var mobNavCloseBtn  = document.getElementById("hnav-close-btn");

mobMenuIcon.onclick = function(){
    mobNav.style.width = "250px";
};

mobNavCloseBtn.onclick = function(){
    mobNav.style.width = "0px";
};
}());