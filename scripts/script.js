// load all plants
function loadAllPlants(){
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => showAllPlants(data.plants));
}
loadAllPlants()

// show all plants
function showAllPlants(plants){
    const container = document.getElementById("plants-container");
    container.innerHTML = "";

    for(const plant of plants){
        const div = document.createElement("div");
        div.innerHTML = `
        
            <div class="tree-card bg-white inset-shadow-2xs p-3 space-y-4 flex flex-col justify-center rounded">
                <img class="w-full h-[200px] object-cover object-center rounded-lg" src="${plant.image}" alt="">

                <h4 class="text-xl font-semibold">${plant.name}</h4>
                <p class="text-base font-light">${plant.description}</p>
                <div class="flex justify-between flex-wrap">
                    <div class="badge badge-soft badge-success">${plant.category}</div>
                    <p class="font-semibold">৳${plant.price}</p>
                </div>
                <button class="btn w-[100%] rounded-3xl bg-[#15803d] text-white">Add to Cart</button>
            </div>

        `;
        container.appendChild(div);
    }
    
}