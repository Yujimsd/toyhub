

function getSaved(name) {
    let saved = JSON.parse(localStorage.getItem(name));

    // nothing saved yet so give back an empty list
    if (saved === null) {
        saved = [];
    }
    return saved;
}

function save(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}


let allToys = [];


function loadToys(whatToDoNext) {
    fetch(fixPath("assets/json/data.json"))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            allToys = data;
            whatToDoNext();
        });
}


function fixPath(path) {
    if (window.location.pathname.includes("/views/")) {
        return "../" + path;
    }
    return path;
}

function findToy(id) {
    for (let i = 0; i < allToys.length; i++) {
        if (allToys[i].ID === id) {
            return allToys[i];
        }
    }
    return null;
}

function makePrice(price) {
    return "$" + price.toFixed(2);
}



function saveCart(cart) {
    save("toyhubCart", cart);
    updateCartCount();
}


function updateCartCount() {
    const cart = getSaved("toyhubCart");
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
        count = count + cart[i].quantity;
    }

    const numbers = document.querySelectorAll(".cart-num");
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].textContent = count;
    }
}

function addToMyCart(productId) {
    const cart = getSaved("toyhubCart");
    let found = false;

   
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = cart[i].quantity + 1;
            found = true;
        }
    }

    if (found === false) {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart(cart);
    showPopup("Added to cart!");
}


function findInWishlist(productId) {
    const wishlist = getSaved("toyhubWishlist");

    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].id === productId) {
            return wishlist[i];
        }
    }
    return null;
}


function heartClick(button, productId) {
    const wishlist = getSaved("toyhubWishlist");
    const newList = [];
    let wasThere = false;

   
    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].id === productId) {
            wasThere = true;
        } else {
            newList.push(wishlist[i]);
        }
    }

    if (wasThere) {
        button.classList.remove("hearted");
        button.textContent = "♡";
        showPopup("Removed from wishlist.");
    } else {
        newList.push({ id: productId, status: "Interested" });
        button.classList.add("hearted");
        button.textContent = "♥";
        showPopup("Added to wishlist.");
    }

    save("toyhubWishlist", newList);

   
    if (document.getElementById("wish-stuff")) {
        showWishlist();
    }
}

function changeStatus(productId, newStatus) {
    const wishlist = getSaved("toyhubWishlist");

    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].id === productId) {
            wishlist[i].status = newStatus;
        }
    }

    save("toyhubWishlist", wishlist);
    showWishlist();
}


function makeOneStatusButton(productId, status, savedItem) {
    let extraClass = "";

    if (savedItem.status === status) {
        extraClass = "picked";
    }

    return '<button class="status-btn ' + extraClass + '" onclick="changeStatus(' + productId + ", '" + status + "')\">" + status + "</button>";
}



function makeToyCard(product, showStatus) {
    const savedItem = findInWishlist(product.ID);
    let heartClass = "";
    let heartSymbol = "♡";

    if (savedItem !== null) {
        heartClass = "hearted";
        heartSymbol = "♥";
    }

    let card = '<article class="toy-card fade-up">';
    card += '<div class="toy-pic">';
    card += '<img src="' + fixPath(product.image) + '" alt="' + product.name + '">';
    card += '<span class="toy-tag">' + product.category + "</span>";
    card += '<button class="heart-btn ' + heartClass + '" onclick="heartClick(this, ' + product.ID + ')">' + heartSymbol + "</button>";
    card += "</div>";
    card += '<div class="toy-info">';
    card += "<h3>" + product.name + "</h3>";
    card += '<div class="toy-numbers">';
    card += '<span class="stars">★ ' + product.rating + "</span>";
    card += '<span class="toy-price">' + makePrice(product.price) + "</span>";
    card += "</div>";
    card += '<button class="btn main-btn add-btn" onclick="addToMyCart(' + product.ID + ')">Add to Cart</button>';

  
    if (showStatus) {
        card += '<div class="status-row">';
        card += makeOneStatusButton(product.ID, "Interested", savedItem);
        card += makeOneStatusButton(product.ID, "Owned", savedItem);
        card += makeOneStatusButton(product.ID, "Not Interested", savedItem);
        card += "</div>";
    }

    card += "</div>";
    card += "</article>";

    return card;
}


function showPopup(text) {
    let popup = document.getElementById("pop-msg");

    if (popup === null) {
        popup = document.createElement("div");
        popup.id = "pop-msg";
        document.body.appendChild(popup);
    }

    popup.textContent = text;


    setTimeout(function () {
        popup.remove();
    }, 1800);
}


function checkForm(form) {
    let allGood = true;
    const boxes = form.querySelectorAll("[required]");

    for (let i = 0; i < boxes.length; i++) {
        const errorText = boxes[i].closest(".form-part").querySelector(".error-text");

        if (boxes[i].checkValidity()) {
            errorText.textContent = "";
        } else {
            allGood = false;
            errorText.textContent = boxes[i].validationMessage;
        }
    }

    return allGood;
}

function showFormMsg(elementId, text, type) {
    const box = document.getElementById(elementId);

    box.textContent = text;
    box.className = "msg-box " + type + "-msg";
    box.style.display = "block";
}


function setupFadeUp() {
    const watcher = new IntersectionObserver(function (entries) {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add("shown");
            }
        }
    });

    const things = document.querySelectorAll(".fade-up");
    for (let i = 0; i < things.length; i++) {
        watcher.observe(things[i]);
    }
}


function setupMenuBtn() {
    document.querySelector(".menu-btn").onclick = function () {
        document.querySelector(".nav-list").classList.toggle("opened");
    };
}


function highlightPage() {
    let thisPage = window.location.pathname.split("/").pop();

    if (thisPage === "") {
        thisPage = "index.html";
    }

   
    if (thisPage === "checkout.html") {
        thisPage = "cart.html";
    }

    const links = document.querySelectorAll(".nav-list a");

    for (let i = 0; i < links.length; i++) {
        const linkPage = links[i].getAttribute("href").split("/").pop();

        if (linkPage === thisPage) {
            links[i].classList.add("is-on");
        }
    }
}



function setupEmailForm() {
    const form = document.getElementById("email-form");

    
    if (form === null) {
        return;
    }

    form.onsubmit = function (event) {
        event.preventDefault();

        const email = form.elements["email"].value.trim();
        const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

        if (emailOk === false) {
            showPopup("Please enter a valid email.");
            return;
        }

        save("toyhubNewsletter", email);
        form.reset();
        showPopup("Thanks for subscribing!");
    };
}

// calls

setupMenuBtn();
highlightPage();
updateCartCount();
setupEmailForm();
setupFadeUp();
