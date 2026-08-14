import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const menuData = [
  { name: "Ethiopian Macchiato", category: "Drinks", price: 100, badge: "Signature", image: "/images/ethiopian-coffee.jpg", description: "A rich Ethiopian coffee experience with smooth espresso and perfectly steamed milk.", isFeatured: true },
  { name: "Jebena Buna", category: "Drinks", price: 50, badge: "Traditional", image: "/images/jebena-buna.jpg", description: "Authentic Ethiopian coffee roasted, ground, and brewed in a traditional clay pot." },
  { name: "Spris Juice", category: "Drinks", price: 120, badge: "Fresh", image: "/images/spris-juice.jpg", description: "A beautiful and delicious layered fresh juice of avocado, mango, and papaya." },
  { name: "Ethiopian Spiced Tea", category: "Drinks", price: 30, image: "/images/spiced-tea.jpg", description: "Hot black tea steeped with aromatic spices including cardamom, cinnamon, and cloves." },
  { name: "Ambo Mineral Water", category: "Drinks", price: 40, image: "/images/ambo.jpg", description: "Refreshing naturally carbonated mineral water sourced locally." },
  { name: "Enjera Firfir", category: "Breakfast", price: 250, badge: "Classic", image: "/images/frfr.jpg", description: "Torn pieces of fresh injera soaked in a rich, spicy berbere and tomato sauce." },
  { name: "Fresh Avocado Toast", category: "Breakfast", price: 350, badge: "Fresh", image: "/images/avocado-toast.jpg", description: "A modern breakfast favorite made with fresh avocado and quality ingredients.", isFeatured: true },
  { name: "Chechebsa", category: "Breakfast", price: 350, badge: "Local Favorite", image: "/images/Chechebsa.jpg", description: "Lightly fried flatbread shredded and mixed with spiced butter and traditional berbere." },
  { name: "Enkulal Firfir", category: "Breakfast", price: 250, image: "/images/scrambled-egg.jpg", description: "Ethiopian-style scrambled eggs cooked with tomatoes, onions, and jalapeños, served with fresh bread." },
  { name: "Special Ful", category: "Breakfast", price: 300, badge: "Popular", image: "/images/full.jpg", description: "Hearty fava bean stew topped with scrambled eggs, fresh tomatoes, onions, and a drizzle of oil." },
  { name: "Special Tibs", category: "Lunch & Dinner", price: 550, badge: "Popular", image: "/images/tibs.jpg", description: "Tender pieces of meat sautéed with fresh ingredients and traditional Ethiopian spices.", isFeatured: true },
  { name: "Shiro Tegamino", category: "Lunch & Dinner", price: 350, image: "/images/shiro.jpg", description: "A delicious and creamy spiced chickpea stew served bubbling hot in a traditional clay pot." },
  { name: "Beyaynetu", category: "Lunch & Dinner", price: 450, badge: "Vegan Friendly", image: "/images/aynet.jpg", description: "A colorful mixed platter of various vegetable and lentil stews served over fresh injera." },
  { name: "Classic Beef Burger", category: "Fast Food", price: 400, image: "/images/burger.jpg", description: "Juicy beef patty with fresh lettuce, tomato, onions, and house sauce, served with crispy fries." },
  { name: "X Cafe Special Pizza", category: "Fast Food", price: 550, badge: "Signature", image: "/images/special-pizza.jpg", description: "Oven-baked pizza topped with a rich tomato sauce, melted mozzarella, seasonal veggies, and seasoned meat." },
  { name: "Doro Wat", category: "Specialties", price: 650, badge: "Chef's Pick", image: "/images/doro-wat.jpg", description: "A traditional Ethiopian dish prepared with slow-cooked chicken, spices, and authentic flavors.", isFeatured: true },
  { name: "Almond Croissant", category: "Pastries", price: 200, image: "/images/croissants.jpg", description: "Flaky, buttery croissant baked fresh daily and topped with toasted almonds." },
  { name: "Lentil Sambusa", category: "Pastries", price: 50, badge: "Bite Sized", image: "/images/sambusa.jpg", description: "Crispy, savory pastry filled with spiced brown lentils, onions, and fresh herbs." },
  { name: "Bombolino", category: "Pastries", price: 60, image: "/images/bombolino.jpg", description: "A warm, fluffy Ethiopian-style donut lightly dusted with powdered sugar." },
];

async function main() {
  // Check if already seeded
  const existing = await prisma.menuItem.count();
  if (existing > 0) {
    console.log("Menu already seeded. Skipping.");
    return;
  }

  // Extract unique categories
  const categoryNames = Array.from(new Set(menuData.map((i) => i.category)));

  // Create categories
  for (const name of categoryNames) {
    await prisma.category.create({
      data: { name },
    });
  }

  // Create items
  for (const item of menuData) {
    const category = await prisma.category.findUnique({
      where: { name: item.category },
    });

    if (!category) continue;

    await prisma.menuItem.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        badge: item.badge || null,
        isAvailable: true,
        isFeatured: item.isFeatured || false,
        categoryId: category.id,
      },
    });
  }

  console.log("Menu seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });