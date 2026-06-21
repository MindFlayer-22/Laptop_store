const container = document.getElementById("product-container");
const compareBar = document.getElementById("compare-bar");
const compareCount = document.getElementById("compare-count");
const openCompareBtn = document.getElementById("open-compare-btn");
const compareModal = document.getElementById("compare-modal");
const closeCompareBtn = document.getElementById("close-compare-btn");
const compareGrid = document.getElementById("compare-grid");

// Bucket
let compareList = [];

async function getMyLaptop() {
    try {
        let response = await fetch('/api/laptops');
        let data = await response.json();

        data.forEach(laptop => {
            const card = document.createElement("div");
            card.classList.add('product-card');
            
            card.innerHTML = `
                <div class="product-img">
                    <img src="${laptop.image}" alt="${laptop.name}">
                </div>
                <h3 class="product-title">${laptop.name}</h3>
                <p style="text-align: center; font-weight: bold; margin-bottom: 15px;">$${laptop.price}</p>
                <div class="card-buttons">
                    <button class="btn-enquire">Add to Cart</button>
                    <button class="btn-know compare-btn">Compare</button> 
                </div>
            `;
            
            const compareBtn = card.querySelector(".compare-btn");
            compareBtn.addEventListener('click', () => {
                const isAlreadyAdded = compareList.some(item => item.name === laptop.name);

                if (isAlreadyAdded) {
                    compareList = compareList.filter(item => item.name !== laptop.name);
                    compareBtn.textContent = "Compare";
                    compareBtn.style.backgroundColor = ""; 
                } else {
                    compareList.push(laptop);
                    compareBtn.textContent = "Remove";
                    compareBtn.style.backgroundColor = "#dc3545"; // Warning 
                }

                updateCompareUI();
            });

            container.appendChild(card);
        });
    } catch (error) {
        console.log("Error loading storefront pipeline:", error);
    }
}

function updateCompareUI() {
    if (compareList.length > 0) {
        compareCount.textContent = `${compareList.length} item${compareList.length > 1 ? 's' : ''} selected to compare`;
        compareBar.style.bottom = "30px";
    } else {
        compareBar.style.bottom = "-100px"; 
        compareModal.style.display = "none"; 
    }

    compareGrid.innerHTML = "";

    compareList.forEach(laptop => {
        const column = document.createElement("div");
        column.style.flex = "1";
        column.style.minWidth = "220px";
        column.style.border = "1px solid #eee";
        column.style.borderRadius = "8px";
        column.style.padding = "15px";
        column.style.background = "#f9f9f9";

        column.innerHTML = `
            <img src="${laptop.image}" alt="${laptop.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;">
            <h4 style="margin: 0 0 5px 0; font-size: 16px;">${laptop.name}</h4>
            <h3 style="margin: 0 0 15px 0; color: #007bff;">$${laptop.price}</h3>
            
            <div style="font-size: 13px; line-height: 1.6; border-top: 1px solid #ddd; padding-top: 10px;">
                <p><strong>Category:</strong> ${laptop.category}</p>
                <p><strong>CPU:</strong> ${laptop.specs?.cpu || 'N/A'}</p>
                <p><strong>GPU:</strong> ${laptop.specs?.gpu || 'N/A'}</p>
                <p><strong>RAM:</strong> ${laptop.specs?.ram || 'N/A'}</p>
            </div>
        `;
        compareGrid.appendChild(column);
    });
}

openCompareBtn.addEventListener('click', () => {
    compareModal.style.display = "flex";
});

closeCompareBtn.addEventListener('click', () => {
    compareModal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target === compareModal) {
        compareModal.style.display = "none";
    }
});

getMyLaptop();