//----------------------------Help popup---------------------------------
function openPopUp() {
    document.querySelector(".popup").style.display = "block";
    document.querySelector(".main").style.filter = "blur(3px)";
    document.querySelector(".right").styly.display = "disabled";
    document.querySelector(".right").style.filter = "blur(3px)";
    document.querySelector(".scrollableDiv").style.filter = "blur(3px)";
    
    if(event.target.id != "popup")
    { 
        document.getElementById("popup").style.display = "none";
      }
}
function closePopUp() {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".main").style.filter = "none";
    document.querySelector(".right").style.filter = "none";
    document.querySelector(".scrollableDiv").style.filter = "none";
    
    if(event.target.id != "popup")
    { 
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

//download img from filesystem
function choose() {
    console.log("Files clicked");
    const image_input = document.querySelector("#files");

    image_input.addEventListener("change", function () {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const uploaded_image = reader.result;
            document.querySelector(
                "#img"
            ).style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(this.files[0]);
    });
    console.log("ulkona");
}

//remove background image
function deleteImg() {
    console.log("Background is deleted");
    var bg = document.getElementById("img");
    bg.style.backgroundImage = "none";
}

//Show side navigation (clothes)
function openNav() {
    //Set width to scrollableDiv-element
    document.getElementById("mySidebar").style.width = "10%";
    //  document.getElementById("openNav").style.display = "none";
}
//Close side navigation (clothes) with button
function closeNav() {
    // document.getElementById("openNav").style.display = "inline";
    document.getElementById("mySidebar").style.width = "0";
}


//---------Closes side navigation with clicking outside of it
document.onclick = function (e) {
    console.log("Outside click");
    if (e.target.id !== "mySidebar") {
        if (e.target.offsetParent && e.target.offsetParent.id !== "mySidebar")
            closeNav();
    }
};

//---------------------------add clothes from sidemenu buttons-------------------------
function addClothes(id) {
    if (id == "lila") {
        var i = new Image();
        var Imgdiv = document.getElementById("img");
        var mamaDiv = document.createElement("div");
        var rotateDiv = document.createElement("div");
        var deleteBtn = document.createElement("button");

        i.onload = function () {
            deleteBtn.setAttribute("id", "deleteCBtn");
            deleteBtn.innerText = "X";
            mamaDiv.appendChild(i);
            mamaDiv.appendChild(rotateDiv);
            mamaDiv.appendChild(deleteBtn);
            Imgdiv.appendChild(mamaDiv);
            rotateDiv.setAttribute("class", "rotation-handle");
        };
        i.src = "clothes/sininen_poncho.png";
        // i.setAttribute("class", "resizeme");

        //   deleteBtn.setAttribute("onclick","deleteC;");
        mamaDiv.setAttribute("class", "dragme");
    } else if (id == "pinkki") {
        var i = new Image();
        var Imgdiv = document.getElementById("img");
        var mamaDiv = document.createElement("div");
        var rotateDiv = document.createElement("div");
        var deleteBtn = document.createElement("button");

        i.onload = function () {
            mamaDiv.appendChild(i);
            mamaDiv.appendChild(rotateDiv);
            mamaDiv.appendChild(deleteBtn);
            Imgdiv.appendChild(mamaDiv);
            rotateDiv.setAttribute("class", "rotation-handle");
        };
        i.src = "clothes/sininen_poncho.png";
        // i.setAttribute("class", "resizeme");
        deleteBtn.setAttribute("id", "deleteCBtn");
        deleteBtn.innerText = "X";
        // deleteBtn.setAttribute("onclick","deleteC;");
        mamaDiv.setAttribute("class", "dragme");
    } else {
        console.log("-----> Choose what you wanna wear <------");
    }

    //Draggable code
    //every draggable item has dragme-class

    interact(".dragme")
        .resizable({
            // resize from all edges and corners
            allowFrom: ".dragme",
            edges: { left: true, right: true, bottom: true, top: true },
            modifiers: [
                // keep the edges inside the parent
                interact.modifiers.restrictEdges({
                    outer: "parent",
                    restriction: "parent",
                }),
                interact.modifiers.restrictSize({
                    min: { width: 50, height: 50 },
                    max: { width: 300, height: 300 },
                }),
                interact.modifiers.restrict({
                    restriction: "parent",
                    endOnly: true,
                }),
            ],
            listeners: {
                start(event) {
                    console.log("resizetaan....");
                    if (
                        event._interaction.downEvent.path[0].classList.contains(
                            "rotation-handle"
                        )
                    ) {
                        const element = event.target;
                        const rect = element.getBoundingClientRect();

                        // store the center as the element has css `transform-origin: center center`
                        element.dataset.centerX = rect.left + rect.width / 2;
                        element.dataset.centerY = rect.top + rect.height / 2;
                        // get the angle of the element when the drag starts
                        element.dataset.angle = getDragAngle(event);
                    }
                },
                move(event) {
                    console.log("resizetaan ja liikutaan");

                    let x = parseFloat(event.target.getAttribute("data-x")) || 0;
                    let y = parseFloat(event.target.getAttribute("data-y")) || 0;
                    let angle = parseFloat(event.target.getAttribute("data-angle")) || 0;

                    console.log("rotation");
                    if (
                        event._interaction.downEvent.path[0].classList.contains(
                            "rotation-handle"
                        )
                    ) {
                        angle = getDragAngle(event);
                    } else {
                        // update the element's style
                        event.target.style.width = event.rect.width + "px";
                        event.target.style.height = event.rect.height + "px";

                        // translate when resizing from top or left edges
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;

                        event.target.setAttribute("data-x", x);
                        event.target.setAttribute("data-y", y);
                    }

                    event.target.style.transform =
                        "translate(" +
                        event.target.getAttribute("data-x") +
                        "px," +
                        event.target.getAttribute("data-y") +
                        "px) rotate(" +
                        angle +
                        "rad" +
                        ")";
                },
                end(event) {
                    console.log("resizetaan....lopetetaan?");

                    if (
                        event._interaction.downEvent.path[0].classList.contains(
                            "rotation-handle"
                        )
                    ) {
                        event.target.dataset.angle = getDragAngle(event);
                    }
                },
            },
        })

        .draggable({
            listeners: { move: window.dragMoveListener },
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: "parent",
                    endOnly: true,
                }),
                interact.modifiers.restrict({
                    restriction: "parent",
                    endOnly: true,
                }),
            ],
        });

    //--------------------------------draggable--------------------------------------
    // target elements with the "draggable" class
    interact(".dragme").draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: "parent",
                endOnly: true,
            }),

            interact.modifiers.restrict({
                restriction: "parent",
                endOnly: true,
            }),
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,

            // call this function on every dragend event
            end(event) {
                var textEl = event.target.querySelector("p");

                textEl &&
                    (textEl.textContent =
                        "moved a distance of " +
                        Math.sqrt(
                            (Math.pow(event.pageX - event.x0, 2) +
                                Math.pow(event.pageY - event.y0, 2)) |
                            0
                        ).toFixed(2) +
                        "px");
            },
        },
    });

    // target elements with the "draggable" class
    interact(".dragme").draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: "parent",
                //endOnly: true
                /*   interact.modifiers.restrictEdges({
                                           outer: 'parent'*/
            }),
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,

            // call this function on every dragend event
            end(event) {
                var textEl = event.target.querySelector("p");

                textEl &&
                    (textEl.textContent =
                        "moved a distance of " +
                        Math.sqrt(
                            (Math.pow(event.pageX - event.x0, 2) +
                                Math.pow(event.pageY - event.y0, 2)) |
                            0
                        ).toFixed(2) +
                        "px");
            },
        },
    });

    function dragMoveListener(event) {
        var target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
        var angle = event.target.setAttribute(
            "data-angle",
            parseFloat(event.target.dataset.angle) || 0
        );

        target.style.transform = "translate(" + x + "px, " + y + "px)";
        target.style.transform = "translate(" + x + y + angle + "rad)";

        // update the position coordinates
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);

        target.getAttribute("data-y") +
            "px) rotate(" +
            event.target.getAttribute("data-angle") +
            "rad" +
            ")";
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;

    //rotate
    interact(".rotation-handle").draggable({
        onstart: function (event) {
            var box = event.target.parentElement;
            var rect = box.getBoundingClientRect();

            // store the center as the element has css `transform-origin: center center`
            box.setAttribute("data-center-x", rect.left + rect.width / 2);
            box.setAttribute("data-center-y", rect.top + rect.height / 2);
            // get the angle of the element when the drag starts
            box.setAttribute("data-angle", getDragAngle(event));
        },
        onmove: function (event) {
            var box = event.target.parentElement;

            var pos = {
                x: parseFloat(box.getAttribute("data-x")) || 0,
                y: parseFloat(box.getAttribute("data-y")) || 0,
            };

            var angle = getDragAngle(event);

            // update transform style on dragmove
            box.style.transform =
                "translate(" +
                pos.x +
                "px, " +
                pos.y +
                "px) rotate(" +
                angle +
                "rad" +
                ")";
        },
        onend: function (event) {
            var box = event.target.parentElement;

            // save the angle on dragend
            box.setAttribute("data-angle", getDragAngle(event));
        },
    });

    function getDragAngle(event) {
        var box = event.target.parentElement;
        var startAngle = parseFloat(box.getAttribute("data-angle")) || 0;
        var center = {
            x: parseFloat(box.getAttribute("data-center-x")) || 0,
            y: parseFloat(box.getAttribute("data-center-y")) || 0,
        };
        var angle = Math.atan2(center.y - event.clientY, center.x - event.clientX);

        return angle - startAngle;
    }
}
