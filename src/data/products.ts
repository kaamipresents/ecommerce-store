export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "glass-meal-prep-set-5-pack",
    name: "Glass Meal Prep Set (5-Pack)",
    category: "glass",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584263347432-84381180b5cb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Experience premium kitchen organization with our 5-pack borosilicate glass storage set. Each container features a crystal-clear body and a robust, snap-locking lid that ensures an airtight and leak-proof seal. Built to withstand temperature changes, these containers are perfect for taking meals from the freezer directly to the oven or microwave."
  },
  {
    id: 2,
    slug: "airtight-cereal-dispenser",
    name: "Airtight Cereal Dispenser",
    category: "specialty",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f114307be4?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f114307be4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Keep your dry goods fresh and your pantry organized with our sleek, airtight cereal dispenser. The contoured design makes it easy to hold and pour with one hand, while the silicone seal on the flip-top lid ensures maximum freshness for cereals, grains, pasta, or snacks."
  },
  {
    id: 3,
    slug: "stackable-bento-lunch-box",
    name: "Stackable Bento Lunch Box",
    category: "plastic",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1594610330025-e4367c821443?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594610330025-e4367c821443?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610132827133-741300067a5e?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Versatile and stylish, our 3-tier bento box is designed for the modern lifestyle. featuring leak-proof compartments to keep your mains and sides separate, it's perfect for portion control and varied meals. Includes high-quality reusable utensils and a dedicated dressing container."
  },
  {
    id: 4,
    slug: "16-piece-storage-set",
    name: "16-Piece Storage Set",
    category: "sets",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584263347432-84381180b5cb?q=80&w=800&auto=format&fit=crop"
    ],
    description: "The ultimate solution for a cluttered kitchen. This 16-piece set (8 containers and 8 lids) covers all your storage needs from small snacks to large meal portions. The stackable and nestable design maximizes your cabinet space while the uniform lids simplify organization."
  },
  {
    id: 5,
    slug: "mason-jar-storage-set-6pc",
    name: "Mason Jar Storage Set (6pc)",
    category: "glass",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1536964541075-e392f416557e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1536964541075-e392f416557e?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Classic design meets modern functionality. These high-quality glass jars feature brushed metal lids with silicone seals for an airtight finish. Ideal for overnight oats, fermentation projects, or simply creating a Pinterest-worthy pantry."
  },
  {
    id: 6,
    slug: "spice-jar-organizer-24-bottles",
    name: "Spice Jar Organizer (24 Bottles)",
    category: "specialty",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1599940859674-a7fef05b94ae?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599940859674-a7fef05b94ae?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Level up your cooking with our comprehensive spice organization kit. Includes 24 glass jars with shaker lids, and a minimalist wire rack. Keep your essential flavors within reach and beautifully displayed."
  },
  {
    id: 7,
    slug: "large-bulk-storage-bins-2-pack",
    name: "Large Bulk Storage Bins (2-Pack)",
    category: "plastic",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Durable, high-capacity bins designed for the heavy lifters in your kitchen. Perfect for 10kg bags of rice or flour. The included measuring cups and smooth-rolling wheels make access effortless."
  },
  {
    id: 8,
    slug: "deluxe-glass-container-set",
    name: "Deluxe Glass Container Set",
    category: "sets",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1584263347432-84381180b5cb?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584263347432-84381180b5cb?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Our crown jewel of glass storage. This set features premium borosilicate glass paired with naturally antimicrobial bamboo lids. These aren't just storage containers; they're elegant enough to go straight from the fridge to your dinner table."
  },
  {
    id: 9,
    slug: "produce-saver-containers",
    name: "Produce Saver Containers",
    category: "specialty",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1622325375529-65b750131102?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1622325375529-65b750131102?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Stop wasting fresh produce. These specialized containers feature FreshVent technology that regulates oxygen and carbon dioxide flow, while the elevated base keeps moisture away from your fruits and vegetables."
  },
  {
    id: 10,
    slug: "soup-stew-thermos",
    name: "Soup & Stew Thermos",
    category: "plastic",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Enjoy a hot meal anywhere. This double-walled vacuum insulated thermos maintains temperature for hours. The wide-mouth design is easy to fill, easy to eat from, and easy to clean."
  },
  {
    id: 11,
    slug: "divided-snack-containers",
    name: "Divided Snack Containers",
    category: "sets",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1610132827133-741300067a5e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610132827133-741300067a5e?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Perfectly portioned for your day. These divided containers are ideal for grazing-style lunches or keeping kids' snacks organized. BPA-free, dishwasher safe, and conveniently sized for most bags."
  },
  {
    id: 12,
    slug: "oven-safe-baking-dishes",
    name: "Oven-Safe Baking Dishes",
    category: "glass",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1590131495944-1f41ed52554e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590131495944-1f41ed52554e?q=80&w=800&auto=format&fit=crop"
    ],
    description: "From oven to table to fridge. These high-grade glass baking dishes come with BPA-free lids for easy storage of leftovers. Perfect for casseroles, roasts, or meal prepping for the week."
  }
];

