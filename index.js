const express=require("express");
const app = express();

let port =3000;

const laptops = [
    {
        id: 1,
        name: "ASUS Zenbook 14",
        brand: "ASUS",
        price: 1299,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=500",
        category: "For AI / Copilot PC",
        specs: {
            cpu: "Intel Core Ultra 7",
            ram: "16GB LPDDR5",
            storage: "1TB SSD",
            gpu: "Intel Arc Graphics"
        }
    },
    {
        id: 2,
        name: "Predator Helios Neo 16",
        brand: "Acer",
        price: 1849,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=500",
        category: "For Gaming",
        specs: {
            cpu: "Intel Core i9-14900HX",
            ram: "32GB DDR5",
            storage: "2TB NVMe SSD",
            gpu: "NVIDIA RTX 4080"
        }
    },
    {
        id: 3,
        name: "HP Spectre x360",
        brand: "HP",
        price: 1599,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500",
        category: "For Creators",
        specs: {
            cpu: "Intel Core i7-1355U",
            ram: "16GB",
            storage: "1TB SSD",
            gpu: "Intel Iris Xe"
        }
    },
    {
        id: 4,
        name: "Lenovo Legion Pro 7i",
        brand: "Lenovo",
        price: 2199,
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=500",
        category: "For Gaming",
        specs: {
            cpu: "Intel Core i9-13900HX",
            ram: "32GB DDR5",
            storage: "2TB Gen4 SSD",
            gpu: "NVIDIA RTX 4090"
        }
    }
];

app.use(express.static('public'));

app.get(`/api/laptops`,(req,res)=>{
    res.json(laptops);
});

app.listen(port,()=>{
    console.log(`Server is running! Click here: http://localhost:${port}`);
})