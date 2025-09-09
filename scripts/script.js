// load all plants
function loadAllPlants() {
    loadStatus(true)
    const url = `https://openapi.programming-hero.com/api/plants`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const allButton = document.querySelectorAll(
                "#categories-container button"
            );
            allButton.forEach((btn) => btn.classList.remove("active-button"));

            const allBtn = document.getElementById("btn-all");
            if (allBtn) {
                allBtn.classList.add("active-button");
            }

            showAllPlants(data.plants);
        });
}

// show all plants
function showAllPlants(plants) {
    const container = document.getElementById("plants-container");
    container.innerHTML = "";

    for (const plant of plants) {
        const div = document.createElement("div");
        div.innerHTML = `
        
            <div class="tree-card bg-white inset-shadow-2xs p-3 space-y-4 flex flex-col justify-center rounded">
                <img class="w-full h-[200px] object-cover object-center rounded-lg" src="${plant.image}" alt="">

                <h4 onclick="cardDetails(${plant.id})" 
                class="text-xl font-semibold cursor-pointer transition duration-200 hover:text-green-600 active:scale-95">
                    ${plant.name}
                </h4>

                <p class="text-base font-light line-clamp-2">${plant.description}</p>
                <div class="flex justify-between flex-wrap">
                    <div class="badge badge-soft badge-success">${plant.category}</div>
                    <p class="font-semibold">৳${plant.price}</p>
                </div>
                <button onclick="cartHandle('${plant.name}', ${plant.price})" class="btn w-[100%] rounded-3xl bg-[#15803d] text-white">
                    Add to Cart
                </button>

            </div>

        `;
        container.appendChild(div);
    }
    loadStatus(false);
}

// load all categories
function loadAllCategories() {
    const url = `https://openapi.programming-hero.com/api/categories`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => showAllCategories(data.categories));
}

//show all categories
function showAllCategories(categories) {
    const categoryContainer = document.getElementById("categories-container");
    categoryContainer.innerHTML = "";

    const allDiv = document.createElement("div");
    allDiv.innerHTML = `
        <button id="btn-all" onclick="loadAllPlants()" 
            class="btn btn-wide btn-sm rounded bg-transparent text-base border-none text-black justify-start hover:bg-green-500 hover:text-white active:bg-green-600 mb-4 md:px-5">
            All Trees
        </button>
    `;
    categoryContainer.appendChild(allDiv);

    categories.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <button id="btn-${category.id}" onclick="loadCategoryWiseData('${category.id}')" 
                class="btn btn-wide btn-sm rounded text-base bg-transparent border-none text-black justify-start hover:bg-green-500 hover:text-white active:bg-green-600 mb-4 md:px-5">
                ${category.category_name}
            </button>
        `;
        categoryContainer.appendChild(div);
    });
}

loadAllCategories();
loadAllPlants();

// category wise filter
function loadCategoryWiseData(id) {
    loadStatus(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            showAllPlants(data.plants);

            // button active
            const allButton = document.querySelectorAll(
                "#categories-container button"
            );
            allButton.forEach((btn) => btn.classList.remove("active-button"));

            const activeBtn = document.getElementById(`btn-${id}`);
            if (activeBtn) {
                activeBtn.classList.add("active-button");
            }
        });
}

// card details
function cardDetails(id) {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayCard(data.plants));
}

// display card Details
function displayCard(data) {
    const detailsContainer = document.getElementById("modal-container");
    detailsContainer.innerHTML = `
    
        <div class="space-y-5 flex flex-col items-center text-center">
                    <h3 class="text-2xl font-bold text-green-700">${data.name}</h3>

                    <img class="max-h-48 md:max-h-80 w-full object-cover rounded-lg shadow-md" src="${data.image}" alt="">

                    <div class="space-y-2 text-gray-700">
                        <p><span class="font-semibold text-green-600">Category:</span> ${data.category}</p>
                        <p><span class="font-semibold text-green-600">Price:</span> ৳${data.price}</p>
                    </div>

                    <p class="text-sm leading-relaxed text-gray-600 px-2">
                        ${data.description}
                    </p>
                </div>

    `;

    document.getElementById("my_modal").showModal();
}

//cart

const cartStore = [];


function cartHandle(name, price) {
    const obj = { name, price };
    cartStore.push(obj);
    displayCart();
    document.getElementById("my_modal_add").showModal();
}

function displayCart() {
    const cartCardsList = document.querySelectorAll(".cart-cards");
    const cartTotalList = document.querySelectorAll(".cart-total");

    let total = 0;

    cartStore.forEach((item) => {
        total += item.price;
    });

    cartCardsList.forEach((cartCards) => {
        cartCards.innerHTML = "";

        cartStore.forEach((item, index) => {
            const div = document.createElement("div");
            div.className =
                "cart-card bg-green-100 flex justify-between items-center px-2 py-1 rounded";

            div.innerHTML = `
                <div>
                    <h5 class="text-base">${item.name}</h5>
                    <p class="text-[14px] text-gray-400">
                        <i class="fa-solid fa-bangladeshi-taka-sign text-[12px]"></i>${item.price} x 1
                    </p>
                </div>
                <div>
                    <button onclick="removeFromCart(${index})" class="btn btn-xs btn-ghost font-bold text-xl text-red-500">
                        <i class="fa-solid fa-xmark cursor-pointer"></i>
                    </button>
                </div>
            `;
            cartCards.appendChild(div);
        });
    });
    
    cartTotalList.forEach((cartTotal) => {
        cartTotal.innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign text-[14px]"></i>${total}`;
    });
}

function removeFromCart(index) {
    cartStore.splice(index, 1);
    displayCart();
    document.getElementById("my_modal_remove").showModal();
    
}

// load status
function loadStatus(isLoading){
    const spinner = document.getElementById("spinner-section");
    const Cards = document.getElementById("plants-container");

    if(isLoading){
        spinner.classList.remove("hidden");   
        Cards.classList.add("hidden"); 
    } else {
        spinner.classList.add("hidden");     
        Cards.classList.remove("hidden"); 
    }
}