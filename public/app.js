/**
 * =======================================================================
 * Project: Predator Laptop Storefront
 * File: app.js
 * Description: Core application logic. Handles fetching inventory data,
 * dynamic DOM generation, and reactive state management for 
 * both the Compare tool and the Shopping Cart.
 * =======================================================================
 */

/* --- 1. DOM ELEMENT CACHE --- */
// Storing references to HTML elements so the browser doesn't have to 
// search for them every time a function runs.

// Container for dynamic product cards
const container = document.getElementById("product-container");

// Compare Tool Elements
const compareBar = document.getElementById("compare-bar");
const compareCount = document.getElementById("compare-count");
const openCompareBtn = document.getElementById("open-compare-btn");
const compareModal = document.getElementById("compare-modal");
const closeCompareBtn = document.getElementById("close-compare-btn");
const compareGrid = document.getElementById("compare-grid");

// Shopping Cart Elements
const cartBtn = document.getElementById("floating-cart-btn");
const cartPanel = document.getElementById("cart-panel");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCountElement = document.getElementById("cart-count");
const cartTotalPriceElement = document.getElementById("cart-total-price");


/* --- 2. GLOBAL STATE BUCKETS --- */
// These arrays act as the temporary database (state) while the user navigates the page.
let compareList = [];
let cart = [];


/* --- 3. CORE ENGINE: FETCH & RENDER --- */
/**
 * getMyLaptop()
 * Async function that fetches the master inventory list from the backend API,
 * loops through the data, constructs the HTML cards, and wires up individual
 * event listeners for each product's buttons.
 */
async function getMyLaptop() {
    try {
        let response = await fetch('/api/laptops');
        let data = await response.json();

        // Loop through the array and build a card for each laptop
        data.forEach(laptop => {
            const card = document.createElement("div");
            card.classList.add('product-card');
            
            // Build the physical HTML layout for the card
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
             
            /* --- CARD EVENT: COMPARE BUTTON TOGGLE --- */
            const compareBtn = card.querySelector(".compare-btn");
            compareBtn.addEventListener('click', () => {
                // Check if item exists to act as an On/Off switch
                const isAlreadyAdded = compareList.some(item => item.name === laptop.name);

                if (isAlreadyAdded) {
                    // Remove item if already present
                    compareList = compareList.filter(item => item.name !== laptop.name);
                    compareBtn.textContent = "Compare";
                    compareBtn.style.backgroundColor = "#333"; 
                } else {
                    // Add item if missing
                    compareList.push(laptop);
                    compareBtn.textContent = "Remove";
                    compareBtn.style.backgroundColor = "#dc3545"; // Warning Red
                }
                
                // Trigger visual update
                updateCompareUI();
            });
 
            /* --- CARD EVENT: ADD TO CART LOGIC --- */
            const addToCartBtn = card.querySelector(".add-cart-btn");
            addToCartBtn.addEventListener('click', () => { 
                // Prevent duplicate entries by checking if the laptop is already in the cart
                const existingItem = cart.find(item => item.name === laptop.name);

                if (existingItem) { 
                    // Bump quantity if it exists
                    existingItem.quantity += 1;
                } else { 
                    // Push new object with a default quantity of 1
                    cart.push({ ...laptop, quantity: 1 });
                }
                 
                // Temporary visual feedback animation
                addToCartBtn.textContent = "Added!";
                addToCartBtn.style.backgroundColor = "#28a745";  
                setTimeout(() => {
                    addToCartBtn.textContent = "Add to Cart";
                    addToCartBtn.style.backgroundColor = "#007bff";  
                }, 1000);

                // Trigger visual update
                updateCartUI();
            });

            // Finally, inject the completed card into the DOM
            container.appendChild(card);
        });
    } catch (error) {
        console.log("Error loading storefront pipeline:", error);
    }
}
 

/* --- 4. UI RENDERERS --- */
// These functions strictly handle updating the screen to match the data inside our State Buckets.

/**
 * updateCartUI()
 * Clears the cart panel, calculates retail math (quantities/totals), 
 * and redraws the current items.
 */
function updateCartUI() {
    // Clear out old HTML to prevent duplicate stacking
    cartItemsContainer.innerHTML = "";
    
    let runningTotal = 0;
    let totalItems = 0;

    cart.forEach(item => { 
        // Math calculation per item
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
 
    // Update master totals
    cartCountElement.textContent = totalItems;
    cartTotalPriceElement.textContent = `$${runningTotal}`;
}
 
/**
 * updateCompareUI()
 * Handles the sliding notification bar logic and rebuilds the side-by-side
 * technical specifications columns inside the modal.
 */
function updateCompareUI() {
    // 1. Manage Floating Notification Bar visibility
    if (compareList.length > 0) {
        compareCount.textContent = `${compareList.length} item${compareList.length > 1 ? 's' : ''} selected to compare`;
        compareBar.style.bottom = "30px"; // Slide up
    } else {
        compareBar.style.bottom = "-100px"; // Hide offscreen
        compareModal.style.display = "none";
    }

    // 2. Rebuild the Modal Columns
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
 

/* --- 5. GLOBAL EVENT LISTENERS (Modals & Panels) --- */

// Compare Modal Triggers
openCompareBtn.addEventListener('click', () => compareModal.style.display = "flex");
closeCompareBtn.addEventListener('click', () => compareModal.style.display = "none");
// Close modal if user clicks outside the white box onto the dark overlay
window.addEventListener('click', (e) => {
    if (e.target === compareModal) compareModal.style.display = "none";
});
 
// Cart Panel Slide Triggers (Modifying CSS right property)
cartBtn.addEventListener('click', () => {
    cartPanel.style.right = "0";  
});
closeCartBtn.addEventListener('click', () => {
    cartPanel.style.right = "-400px";  
});


/* --- 6. INITIALIZATION --- */
// Kick off the whole pipeline when the script loads
getMyLaptop();