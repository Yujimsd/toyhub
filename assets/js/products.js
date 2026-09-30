

const catList = ["All", "Figurines", "Toys", "Board Games", "Diecast Cars"];


let chosenCat = "All";
const catFromLink = new URLSearchParams(window.location.search).get("category");

if (catList.includes(catFromLink)) {
    chosenCat = catFromLink;
}

function makeCatButtons() {
    let html = "";

    for (let i = 0; i < catList.length; i++) {
        let extraClass = "";

        if (catList[i] === chosenCat) {
            extraClass = "is-on";
        }

        html += '<button class="btn other-btn filter-btn ' + extraClass + '" onclick="clickCat(\'' + catList[i] + '\')">';
        html += catList[i] + "</button>";
    }

    document.getElementById("cat-buttons").innerHTML = html;
}


function clickCat(category) {
    chosenCat = category;
    makeCatButtons();
    showToys();
}


function filterToys(searchText) {
    const result = [];

    for (let i = 0; i < allToys.length; i++) {
        const toy = allToys[i];
        const catOk = chosenCat === "All" || toy.category === chosenCat;
        const nameOk = toy.name.toLowerCase().includes(searchText);

        if (catOk && nameOk) {
            result.push(toy);
        }
    }

    return result;
}

function sortToys(list, sortType) {
    
    const sorted = list.slice();

    if (sortType === "price-low") {
        sorted.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (sortType === "price-high") {
        sorted.sort(function (a, b) {
            return b.price - a.price;
        });
    } else if (sortType === "rating") {
        sorted.sort(function (a, b) {
            return b.rating - a.rating;
        });
    }

    return sorted;
}

function showToys() {
    const searchText = document.getElementById("toy-search").value.toLowerCase();
    const sortType = document.getElementById("toy-sort").value;
    const toysToShow = sortToys(filterToys(searchText), sortType);

   
    if (toysToShow.length === 1) {
        document.getElementById("how-many").textContent = "1 toy";
    } else {
        document.getElementById("how-many").textContent = toysToShow.length + " toys";
    }

    const grid = document.getElementById("toy-grid");

    if (toysToShow.length === 0) {
        grid.innerHTML = '<p class="nothing-msg">No toys found.</p>';
        return;
    }

    let html = "";
    for (let i = 0; i < toysToShow.length; i++) {
        html += makeToyCard(toysToShow[i], false);
    }
    grid.innerHTML = html;

    setupFadeUp();
}



document.getElementById("toy-search").oninput = showToys;
document.getElementById("toy-sort").onchange = showToys;


function startProductsPage() {
    makeCatButtons();
    showToys();
}

loadToys(startProductsPage);
