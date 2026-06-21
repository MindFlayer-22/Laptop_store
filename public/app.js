const container = document.getElementById("product-container");
const compareBar = document.getElementById("compare-bar");
const compareCount = document.getElementById("compare-count");
const openCompareBtn = document.getElementById("open-compare-btn");
const compareModal = document.getElementById("compare-modal");
const closeCompareBtn = document.getElementById("close-compare-btn");
const compareGrid = document.getElementById("compare-grid");
 
const cartBtn = document.getElementById("floating-cart-btn");
const cartPanel = document.getElementById("cart-panel");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCountElement = document.getElementById("cart-count");
const cartTotalPriceElement = document.getElementById("cart-total-price");
 
let compareList = [];
let cart = [];
 
async function getMyLaptop() {
    try {
        let response = await fetch('/api/laptops');
        let data = await response.json();

        data.forEach(laptop => {
            const card = document.createElement("div");
            card.classList.add('product-card');
            
            card.innerHTML = `
                <div class="product-img">
                    <img src="${laptop.image}" alt="${laptop.name}" style="width: 100%; border-radius: 8px;">
                </div>
                <h3 class="product-title">${laptop.name}</h3>
                <p style="text-align: center; font-weight: bold; margin-bottom: 15px; color: var(--accent-neon);">$${laptop.price}</p>
                <div class="card-buttons" style="display: flex; gap: 10px;">
                    <button class="btn-enquire add-cart-btn" style="flex: 1; padding: 10px; border-radius: 6px; border: none; cursor: pointer; background: #007bff; color: white;">Add to Cart</button>
                    <button class="btn-know compare-btn" style="flex: 1; padding: 10px; border-radius: 6px; border: none; cursor: pointer; background: #333; color: white;">Compare</button> 
                </div>
            `;
             
            const compareBtn = card.querySelector(".compare-btn");
            compareBtn.addEventListener('click', () => {
                const isAlreadyAdded = compareList.some(item => item.name === laptop.name);

                if (isAlreadyAdded) {
                    compareList = compareList.filter(item => item.name !== laptop.name);
                    compareBtn.textContent = "Compare";
                    compareBtn.style.backgroundColor = "#333"; 
                } else {
                    compareList.push(laptop);
                    compareBtn.textContent = "Remove";
                    compareBtn.style.backgroundColor = "#dc3545"; 
                }
                updateCompareUI();
            });
 
            const addToCartBtn = card.querySelector(".add-cart-btn");
            addToCartBtn.addEventListener('click', () => { 
                const existingItem = cart.find(item => item.name === laptop.name);

                if (existingItem) { 
                    existingItem.quantity += 1;
                } else { 
                    cart.push({ ...laptop, quantity: 1 });
                }
                 
                addToCartBtn.textContent = "Added!";
                addToCartBtn.style.backgroundColor = "#28a745";  
                setTimeout(() => {
                    addToCartBtn.textContent = "Add to Cart";
                    addToCartBtn.style.backgroundColor = "#007bff";  
                }, 1000);

                updateCartUI();
            });

            container.appendChild(card);
        });
    } catch (error) {
        console.log("Error loading storefront pipeline:", error);
    }
}
 
function updateCartUI() {
   
    cartItemsContainer.innerHTML = "";
    
    let runningTotal = 0;
    let totalItems = 0;

    cart.forEach(item => { 
        runningTotal += (item.price * item.quantity);
        totalItems += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.style.display = "flex";
        cartItem.style.alignItems = "center";
        cartItem.style.gap = "15px";
        cartItem.style.background = "var(--bg-deep)";
        cartItem.style.padding = "10px";
        cartItem.style.borderRadius = "8px";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 5px 0; font-size: 14px;">${item.name}</h4>
                <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 13px;">
                    <span>Qty: ${item.quantity}</span>
                    <span style="color: var(--accent-neon); font-weight: bold;">$${item.price * item.quantity}</span>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
 
    cartCountElement.textContent = totalItems;
    cartTotalPriceElement.textContent = `$${runningTotal}`;
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
        column.style.border = "1px solid #222";
        column.style.borderRadius = "8px";
        column.style.padding = "15px";
        column.style.background = "var(--bg-deep)";

        column.innerHTML = `
            <img src="${laptop.image}" alt="${laptop.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;">
            <h4 style="margin: 0 0 5px 0; font-size: 16px;">${laptop.name}</h4>
            <h3 style="margin: 0 0 15px 0; color: var(--accent-neon);">$${laptop.price}</h3>
            <div style="font-size: 13px; line-height: 1.6; border-top: 1px solid #222; padding-top: 10px; color: var(--text-muted);">
                <p><strong>CPU:</strong> ${laptop.specs?.cpu || 'N/A'}</p>
                <p><strong>GPU:</strong> ${laptop.specs?.gpu || 'N/A'}</p>
                <p><strong>RAM:</strong> ${laptop.specs?.ram || 'N/A'}</p>
            </div>
        `;
        compareGrid.appendChild(column);
    });
}
 
openCompareBtn.addEventListener('click', () => compareModal.style.display = "flex");
closeCompareBtn.addEventListener('click', () => compareModal.style.display = "none");
window.addEventListener('click', (e) => {
    if (e.target === compareModal) compareModal.style.display = "none";
});
 
cartBtn.addEventListener('click', () => {
    cartPanel.style.right = "0";  
});
closeCartBtn.addEventListener('click', () => {
    cartPanel.style.right = "-400px";  
});

getMyLaptop();