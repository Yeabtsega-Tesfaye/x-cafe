// data/menu.ts

export const CATEGORIES = [
  "All", 
  "Coffee", 
  "Traditional", 
  "Breakfast", 
  "Pastries"
];

export const FULL_MENU = [
  // COFFEE
  {
    name: "Ethiopian Macchiato",
    category: "Coffee",
    price: "ETB 100",
    badge: "Signature",
    image: "/images/ethiopian-coffee.jpg",
    description: "A rich Ethiopian coffee experience with smooth espresso and perfectly steamed milk.",
  },
  {
    name: "Jebena Buna",
    category: "Coffee",
    price: "ETB 50",
    badge: "Traditional",
    image: "/images/ethiopian-coffee.jpg",
    description: "Authentic Ethiopian coffee roasted, ground, and brewed in a traditional clay pot.",
  },
  
  // TRADITIONAL
  {
    name: "Doro Wat",
    category: "Traditional",
    price: "ETB 650",
    badge: "Chef's Pick",
    image: "/images/doro-wat.jpg",
    description: "A traditional Ethiopian dish prepared with slow-cooked chicken, spices, and authentic flavors.",
  },
  {
    name: "Special Tibs",
    category: "Traditional",
    price: "ETB 550",
    badge: "Popular",
    image: "/images/tibs.jpg",
    description: "Tender pieces of meat sautéed with fresh ingredients and traditional Ethiopian spices.",
  },
  {
    name: "Shiro Tegamino",
    category: "Traditional",
    price: "ETB 350",
    image: "/images/doro-wat.jpg", 
    description: "A delicious and creamy spiced chickpea stew served bubbling hot in a traditional clay pot.",
  },

  // BREAKFAST
  {
    name: "Fresh Avocado Toast",
    category: "Breakfast",
    price: "ETB 350",
    badge: "Fresh",
    image: "/images/avocado-toast.jpg",
    description: "A modern breakfast favorite made with fresh avocado and quality ingredients.",
  },
  {
    name: "Chechebsa",
    category: "Breakfast",
    price: "ETB 350",
    badge: "Local Favorite",
    image: "/images/avocado-toast.jpg", 
    description: "Lightly fried flatbread shredded and mixed with spiced butter and traditional berbere.",
  },

  // PASTRIES
  {
    name: "Almond Croissant",
    category: "Pastries",
    price: "ETB 200",
    image: "/images/avocado-toast.jpg", 
    description: "Flaky, buttery croissant baked fresh daily and topped with toasted almonds.",
  }
];