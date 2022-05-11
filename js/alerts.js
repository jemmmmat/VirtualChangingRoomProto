//----------------------------Help popup---------------------------------
function openPopUp() {
  document.querySelector(".popup").style.display = "block";
  document.querySelector(".main").style.filter = "blur(3px)";
  document.querySelector(".right").styly.display = "disabled";
  document.querySelector(".right").style.filter = "blur(3px)";
  document.querySelector(".scrollableDiv").style.filter = "blur(3px)";

  if (event.target.id != "popup") {
    document.getElementById("popup").style.display = "none";
  }
}
function closePopUp() {
  document.querySelector(".popup").style.display = "none";
  document.querySelector(".main").style.filter = "none";
  document.querySelector(".right").style.filter = "none";
  document.querySelector(".scrollableDiv").style.filter = "none";

  if (event.target.id != "popup") {
    document.getElementById("popup").style.display = "none";
  }
}

//---------------------------Rating form popup--------------------------------
function openForm() {
  document.querySelector(".popupRate").style.display = "block";
  document.querySelector(".main").style.filter = "blur(3px)";
  document.querySelector(".right").style.filter = "blur(3px)";
  document.querySelector(".scrollableDiv").style.filter = "blur(3px)";
}
function closeForm() {
  document.querySelector(".popupRate").style.display = "none";
  document.querySelector(".main").style.filter = "none";
  document.querySelector(".right").style.filter = "none";
  document.querySelector(".scrollableDiv").style.filter = "none";
}
/*
function createAlertPopup() {
  //var Imgdiv = document.getElementsByTagName("body");
  var alertDiv = document.createElement("div");
  var text = document.createElement("p").innerText = "hello there";
  var closeBtn = document.createElement("span");
  Imgdiv.onload = function () {
    alertDiv.setAttribute("class", "alert");
    closeBtn.setAttribute("class", "closeAlertbtn");
    alertDiv.appendChild(text);
    alertDiv.appendChild(closeBtn);
    document.getElementsByTagName('body')[0].appendChild(alertDiv);

  };
}*/
