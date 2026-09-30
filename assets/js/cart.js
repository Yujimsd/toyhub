
function makeCartItem(toy, quantity) {
    let html = '<article class="cart-item-box">';
    html += '<img src="' + fixPath(toy.image) + '" alt="' + toy.name + '">';
    html += '<div class="cart-item-info">';
    html += '<span class="cart-item-cat">' + toy.category + "</span>";
    html += "<h3>" + toy.name + "</h3>";
    html += "<p>" + makePrice(toy.price) + " each</p>";
    html += "</div>";
    html += '<div class="qty-buttons">';
    html += '<button onclick="changeQty(' + toy.ID + ', -1)" aria-label="Decrease">−</button>';
    html += "<strong>" + quantity + "</strong>";
    html += '<button onclick="changeQty(' + toy.ID + ', 1)" aria-label="Increase">+</button>';
    html += "</div>";
    html += '<strong class="cart-item-total">' + makePrice(toy.price * quantity) + "</strong>";
    html += '<button class="remove-btn" onclick="removeItem(' + toy.ID + ')" aria-label="Remove ' + toy.name + '">✕</button>';
    html += "</article>";

    return html;
}

function showCart() {
    const cart = getSaved("toyhubCart");
    let html = "";
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const toy = findToy(cart[i].id);

     
        if (toy !== null) {
            html += makeCartItem(toy, cart[i].quantity);
            total = total + toy.price * cart[i].quantity;
        }
    }


    if (html === "") {
        html += '<div class="form-box empty-cart-box">';
        html += "<p>Your cart is empty.</p>";
        html += '<a class="btn main-btn" href="product.html">Browse Toys</a>';
        html += "</div>";
    }

    document.getElementById("cart-stuff").innerHTML = html;
    document.getElementById("cart-subtotal").textContent = makePrice(total);
    document.getElementById("cart-final-total").textContent = makePrice(total);
}


function changeQty(productId, amount) {
    const cart = getSaved("toyhubCart");
    const newCart = [];

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = cart[i].quantity + amount;
        }

      
        if (cart[i].quantity > 0) {
            newCart.push(cart[i]);
        }
    }

    saveCart(newCart);
    showCart();
}

function removeItem(productId) {
    const cart = getSaved("toyhubCart");
    const newCart = [];

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }

    saveCart(newCart);
    showCart();
}

function emptyTheCart() {
    saveCart([]);
    showCart();
    showPopup("Cart cleared.");
}

function goCheckout() {
    if (getSaved("toyhubCart").length === 0) {
        showPopup("Your cart is empty.");
        return;
    }

    window.location.href = "checkout.html";
}

loadToys(showCart);
