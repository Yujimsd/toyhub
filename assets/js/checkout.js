
function showOrderList() {
    const cart = getSaved("toyhubCart");
    let html = "";
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const toy = findToy(cart[i].id);

        if (toy !== null) {
            const subtotal = toy.price * cart[i].quantity;
            total = total + subtotal;

            html += '<div class="order-row">';
            html += "<span>" + toy.name + " × " + cart[i].quantity + "</span>";
            html += "<strong>" + makePrice(subtotal) + "</strong>";
            html += "</div>";
        }
    }

    if (html === "") {
        html = "<p>Your cart is empty.</p>";
    }

    document.getElementById("order-list").innerHTML = html;
    document.getElementById("checkout-final").textContent = makePrice(total);
}

function saveOrder(form) {
    const order = {
        orderNumber: "TH-" + Date.now(),
        date: new Date().toISOString(),
        customer: {
            name: form.elements["name"].value,
            email: form.elements["email"].value,
            address: form.elements["address"].value,
            payment: form.elements["payment"].value
        },
        items: getSaved("toyhubCart")
    };

    const orders = getSaved("toyhubOrders");
    orders.push(order);
    save("toyhubOrders", orders);

    saveCart([]);
    return order;
}


function showThanks(order) {
    let html = '<div class="big-box">';
    html += '<div class="form-box done-box">';
    html += '<div style="font-size:4rem;">🎉</div>';
    html += "<h1>Order Confirmed!</h1>";
    html += '<p>Thanks, <span id="thanks-name"></span>. ';
    html += 'Your order <strong id="thanks-number"></strong> has been saved.</p>';
    html += '<a class="btn main-btn" href="../index.html">Back to Toy Haven</a>';
    html += "</div>";
    html += "</div>";

    document.querySelector("main").innerHTML = html;

   
    document.getElementById("thanks-name").textContent = order.customer.name;
    document.getElementById("thanks-number").textContent = order.orderNumber;
}


document.getElementById("checkout-form").onsubmit = function (event) {
    event.preventDefault();
    const form = event.target;

    if (checkForm(form) === false) {
        showFormMsg("checkout-msg", "Please correct the highlighted fields.", "bad");
        return;
    }

    if (getSaved("toyhubCart").length === 0) {
        showFormMsg("checkout-msg", "Your cart is empty.", "bad");
        return;
    }

    const order = saveOrder(form);
    showThanks(order);
};

loadToys(showOrderList);
