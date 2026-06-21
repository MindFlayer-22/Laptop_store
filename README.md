# Laptop_store

<br>
Predator Laptop Store
A custom full-stack e-commerce storefront built from the ground up. I built this project to practice connecting a Node.js backend to a vanilla JavaScript frontend, specifically focusing on building custom state management and interactive UI features without relying on heavy frontend frameworks.

Features
Dynamic Data Rendering: The storefront is not hardcoded. The frontend fetches product data from a custom REST API (/api/laptops) and paints the DOM dynamically using JavaScript.

Smart Compare Tool: Users can select multiple laptops to compare specs side-by-side. Features a reactive state toggle, a sliding bottom notification bar, and a glass-morphism modal popup.

Functional Shopping Cart: Features a slide-out side panel that handles real retail math—tracking item quantities, preventing duplicate cart entries, and calculating running totals in real-time.

Custom Styling: Fully responsive dark mode gaming theme built entirely with CSS variables, flexbox, and smooth CSS transitions.

Tech Stack
Frontend: HTML5, CSS3, Vanilla JavaScript (DOM manipulation, Fetch API, Async/Await)

Backend: Node.js, Express.js

How to Run Locally
Clone this repository to your local machine.

Open your terminal and navigate into the main project folder.

Install the required Node dependencies:

Bash
npm install
Start the backend server:

Bash
node index.js
(Or use nodemon index.js for hot-reloading during development).

Open your web browser and navigate to http://localhost:3000
