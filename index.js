const express=require("express");
const app = express();

let port =3000;
const laptops = [
    // --- GAMING ---
    {
        name: "Predator Helios Neo 16",
        price: 1499,
        category: "For Gaming",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=500",
        specs: { cpu: "Intel Core i7-14700HX", gpu: "NVIDIA RTX 4070", ram: "16GB DDR5" }
    },
    {
        name: "ROG Strix SCAR 18",
        price: 2999,
        category: "For Gaming",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=500",
        specs: { cpu: "Intel Core i9-14900HX", gpu: "NVIDIA RTX 4090", ram: "32GB DDR5" }
    },
    {
        name: "Lenovo Legion Pro 5i",
        price: 1349,
        category: "For Gaming",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=500",
        specs: { cpu: "Intel Core i7-13700HX", gpu: "NVIDIA RTX 4060", ram: "16GB DDR5" }
    },

    // --- AI / COPILOT PC ---
    {
        name: "ASUS Zenbook 14 OLED",
        price: 1099,
        category: "For AI / Copilot PC",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500",
        specs: { cpu: "Intel Core Ultra 7 155H", gpu: "Intel Arc Graphics", ram: "16GB LPDDR5X" }
    },
    {
        name: "Microsoft Surface Laptop 7",
        price: 1299,
        category: "For AI / Copilot PC",
        image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?q=80&w=500",
        specs: { cpu: "Snapdragon X Elite", gpu: "Qualcomm Adreno", ram: "16GB LPDDR5X" }
    },

    // --- CREATORS ---
    {
        name: "MacBook Pro 16-inch",
        price: 2499,
        category: "For Creators",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500",
        specs: { cpu: "Apple M3 Pro", gpu: "18-Core GPU", ram: "18GB Unified" }
    },
    {
        name: "ASUS ProArt Studiobook 16",
        price: 1999,
        category: "For Creators",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=500",
        specs: { cpu: "Intel Core i9-13980HX", gpu: "NVIDIA RTX 4070", ram: "32GB DDR5" }
    },

    // --- STUDENTS ---
    {
        name: "MacBook Air 13-inch",
        price: 999,
        category: "For Students",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=500",
        specs: { cpu: "Apple M2", gpu: "8-Core GPU", ram: "8GB Unified" }
    },
    {
        name: "Acer Swift Go 14",
        price: 749,
        category: "For Students",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=500",
        specs: { cpu: "Intel Core i5-1335U", gpu: "Intel Iris Xe", ram: "16GB LPDDR5" }
    },

    // --- ACCESSORIES ---
    {
        name: "Predator Cestus 330 Mouse",
        price: 65,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1527814050087-379381547910?q=80&w=500",
        specs: { cpu: "N/A", gpu: "N/A", ram: "N/A" }
    },
    {
        name: "ROG Delta S Headset",
        price: 199,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=500",
        specs: { cpu: "N/A", gpu: "N/A", ram: "N/A" }
    }
];
app.use(express.static('public'));

app.get(`/api/laptops`,(req,res)=>{
    res.json(laptops);
});

app.listen(port,()=>{
    console.log(`Server is running! Click here: http://localhost:${port}`);
})