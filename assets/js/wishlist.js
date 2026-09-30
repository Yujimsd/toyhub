
function showWishlist() {
    const wishlist = getSaved("toyhubWishlist");
    let html = "";

    for (let i = 0; i < wishlist.length; i++) {
        const toy = findToy(wishlist[i].id);

        if (toy !== null) {
            html += makeToyCard(toy, true);
        }
    }

    if (html === "") {
        html = '<p class="nothing-msg">No saved products yet. <a href="product.html">Explore toys →</a></p>';
    }

    document.getElementById("wish-stuff").innerHTML = html;
    setupFadeUp();
}

loadToys(showWishlist);
