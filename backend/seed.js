const mongoose = require("mongoose");
const Food = require("./models/Food");
const mongoURI = ""; 

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected for Seeding..."))
  .catch(err => console.error("Connection Error:", err));

const foodData = [
  // --- HOTEL 1: Saravana Bhavan ---
  { name: "Mini Idli (14 Pcs)", description: "Ghee topped small idlis served with sambar", price: 120, image: "idli.jpg", category: "Veg", hotelName: "Saravana Bhavan", location: "T.Nagar" },
  { name: "Ghee Roast Dosa", description: "Crispy golden dosa roasted with pure ghee", price: 140, image: "dosa.jpg", category: "Veg", hotelName: "Saravana Bhavan", location: "T.Nagar" },
  { name: "Special South Indian Meals", description: "Full course traditional Tamil meals", price: 220, image: "meals.jpg", category: "Veg", hotelName: "Saravana Bhavan", location: "T.Nagar" },
  { name: "Medhu Vada", description: "Deep fried lentil donuts (2 pieces)", price: 60, image: "vada.jpg", category: "Veg", hotelName: "Saravana Bhavan", location: "T.Nagar" },
  { name: "Pongal", description: "Classic rice and lentil mash with cashews", price: 95, image: "pongal.jpg", category: "Veg", hotelName: "Saravana Bhavan", location: "T.Nagar" },
  { name: "Rava Khichdi", description: "Semolina cooked with vegetables and ghee", price: 85, image: "khichdi.jpg", category: "Veg", hotelName: "Saravana Bhavan", location: "T.Nagar" },

  // --- HOTEL 2: Thalappakatti ---
  { name: "Mutton Biryani", description: "Authentic Dindigul style seeraga samba biryani", price: 380, image: "mutton_biryani.jpg", category: "Non-Veg", hotelName: "Thalappakatti", location: "Anna Nagar" },
  { name: "Chicken 65", description: "Spicy boneless deep fried chicken", price: 240, image: "chicken_65.jpg", category: "Non-Veg", hotelName: "Thalappakatti", location: "Anna Nagar" },
  { name: "Egg Biryani", description: "Seeraga samba rice cooked with boiled eggs", price: 210, image: "egg_biryani.jpg", category: "Non-Veg", hotelName: "Thalappakatti", location: "Anna Nagar" },
  { name: "Pepper Chicken Fry", description: "Chicken tossed in fresh black pepper masala", price: 260, image: "pepper_chicken.jpg", category: "Non-Veg", hotelName: "Thalappakatti", location: "Anna Nagar" },
  { name: "Chicken Lollipop", description: "Batter fried chicken wings drumettes", price: 280, image: "lollipop.jpg", category: "Non-Veg", hotelName: "Thalappakatti", location: "Anna Nagar" },
  { name: "Tandoori Chicken", description: "Clay oven roasted chicken with spices", price: 320, image: "tandoori.jpg", category: "Non-Veg", hotelName: "Thalappakatti", location: "Anna Nagar" },

  // --- HOTEL 3: A2B - Adyar Ananda Bhavan ---
  { name: "Sambar Vada", description: "Vada soaked in piping hot sambar", price: 85, image: "sambar_vada.jpg", category: "Veg", hotelName: "A2B", location: "Adyar" },
  { name: "Rava Masala Dosa", description: "Thin crispy semolina dosa with potato masala", price: 160, image: "rava_dosa.jpg", category: "Veg", hotelName: "A2B", location: "Adyar" },
  { name: "Poori Masala", description: "Fluffy wheat poories with potato curry", price: 110, image: "poori.jpg", category: "Veg", hotelName: "A2B", location: "Adyar" },
  { name: "Onion Uttapam", description: "Thick pancake topped with fresh onions", price: 130, image: "uttapam.jpg", category: "Veg", hotelName: "A2B", location: "Adyar" },
  { name: "Gulab Jamun", description: "Soft milk solids in sugar syrup (2 Pcs)", price: 70, image: "jamun.jpg", category: "Veg", hotelName: "A2B", location: "Adyar" },
  { name: "Rasmalai", description: "Cottage cheese balls in saffron milk", price: 90, image: "rasmalai.jpg", category: "Veg", hotelName: "A2B", location: "Adyar" },

  // --- HOTEL 4: Buhari ---
  { name: "Buhari Chicken 65", description: "The original legendary recipe from 1965", price: 310, image: "buhari_65.jpg", category: "Non-Veg", hotelName: "Buhari", location: "Mount Road" },
  { name: "Chicken Fried Rice", description: "Indo-Chinese style rice with chicken bits", price: 220, image: "fried_rice.jpg", category: "Non-Veg", hotelName: "Buhari", location: "Mount Road" },
  { name: "Mutton Paya", description: "Spicy lamb trotter stew served hot", price: 350, image: "paya.jpg", category: "Non-Veg", hotelName: "Buhari", location: "Mount Road" },
  { name: "Ceylon Egg Parotta", description: "Stuffed parotta with egg and spices", price: 140, image: "ceylon_parotta.jpg", category: "Non-Veg", hotelName: "Buhari", location: "Mount Road" },
  { name: "Chicken Noodles", description: "Stir-fried noodles with chicken and veggies", price: 210, image: "noodles.jpg", category: "Non-Veg", hotelName: "Buhari", location: "Mount Road" },
  { name: "Bread Halwa", description: "Rich dessert made with bread, ghee and nuts", price: 60, image: "halwa.jpg", category: "Veg", hotelName: "Buhari", location: "Mount Road" },

  // --- HOTEL 5: Sangeetha Veg ---
  { name: "North Indian Thali", description: "Complete meal with Roti, Paneer and Dal", price: 250, image: "north_thali.jpg", category: "Veg", hotelName: "Sangeetha", location: "Velachery" },
  { name: "Paneer Butter Masala", description: "Cottage cheese in rich tomato gravy", price: 210, image: "pbm.jpg", category: "Veg", hotelName: "Sangeetha", location: "Velachery" },
  { name: "Butter Naan", description: "Soft leavened bread with butter", price: 60, image: "naan.jpg", category: "Veg", hotelName: "Sangeetha", location: "Velachery" },
  { name: "Mushroom Masala", description: "Spicy button mushrooms in onion gravy", price: 190, image: "mushroom.jpg", category: "Veg", hotelName: "Sangeetha", location: "Velachery" },
  { name: "Veg Pulao", description: "Fragrant rice cooked with mild spices", price: 180, image: "pulao.jpg", category: "Veg", hotelName: "Sangeetha", location: "Velachery" },
  { name: "Channa Masala", description: "Chickpeas cooked in spicy Punjabi style", price: 170, image: "channa.jpg", category: "Veg", hotelName: "Sangeetha", location: "Velachery" },

  // --- HOTEL 6: Junior Kuppanna ---
  { name: "Chicken Pallipalayam", description: "Dry chicken cooked with shallots and coconut", price: 270, image: "pallipalayam.jpg", category: "Non-Veg", hotelName: "Junior Kuppanna", location: "Koyambedu" },
  { name: "Mutton Chukka", description: "Pan roasted tender mutton pieces", price: 340, image: "chukka.jpg", category: "Non-Veg", hotelName: "Junior Kuppanna", location: "Koyambedu" },
  { name: "Fish Fry (Vanjaram)", description: "King Fish marinated in special spices", price: 450, image: "fish_fry.jpg", category: "Non-Veg", hotelName: "Junior Kuppanna", location: "Koyambedu" },
  { name: "Parotta (2 Pcs)", description: "Flaky multi-layered flatbread", price: 60, image: "parotta.jpg", category: "Veg", hotelName: "Junior Kuppanna", location: "Koyambedu" },
  { name: "Mutton Soup", description: "Traditional spicy bone broth", price: 140, image: "mutton_soup.jpg", category: "Non-Veg", hotelName: "Junior Kuppanna", location: "Koyambedu" },
  { name: "Egg Kothu Parotta", description: "Shredded parotta tossed with eggs", price: 160, image: "kothu_parotta.jpg", category: "Non-Veg", hotelName: "Junior Kuppanna", location: "Koyambedu" },

  // --- HOTEL 7: Anjappar ---
  { name: "Chettinad Chicken Curry", description: "Spicy and aromatic chettinad gravy", price: 280, image: "chettinad_chicken.jpg", category: "Non-Veg", hotelName: "Anjappar", location: "Nungambakkam" },
  { name: "Rabbit Roast", description: "Lean rabbit meat cooked in dry spices", price: 390, image: "rabbit.jpg", category: "Non-Veg", hotelName: "Anjappar", location: "Nungambakkam" },
  { name: "Quail (Kaadai) Fry", description: "Whole quail deep fried in spices", price: 220, image: "kaadai.jpg", category: "Non-Veg", hotelName: "Anjappar", location: "Nungambakkam" },
  { name: "Egg Masala", description: "Boiled eggs in thick spicy gravy", price: 140, image: "egg_masala.jpg", category: "Non-Veg", hotelName: "Anjappar", location: "Nungambakkam" },
  { name: "Mutton Keema Dosa", description: "Dosa stuffed with minced mutton", price: 260, image: "keema_dosa.jpg", category: "Non-Veg", hotelName: "Anjappar", location: "Nungambakkam" },
  { name: "Chicken Biryani", description: "Spicy Anjappar style chicken biryani", price: 270, image: "anjappar_biryani.jpg", category: "Non-Veg", hotelName: "Anjappar", location: "Nungambakkam" },

  // --- HOTEL 8: Murugan Idli Shop ---
  { name: "Podi Idli", description: "Idlis tossed in spicy gunpowder and oil", price: 115, image: "podi_idli.jpg", category: "Veg", hotelName: "Murugan Idli", location: "Besant Nagar" },
  { name: "Podi Dosa", description: "Thin dosa topped with spicy chutney powder", price: 170, image: "podi_dosa.jpg", category: "Veg", hotelName: "Murugan Idli", location: "Besant Nagar" },
  { name: "Sweet Paniyaram", description: "Fluffy rice balls sweetened with jaggery", price: 90, image: "paniyaram.jpg", category: "Veg", hotelName: "Murugan Idli", location: "Besant Nagar" },
  { name: "Jigarthanda", description: "Famous Madurai cool drink with ice cream", price: 120, image: "jigarthanda.jpg", category: "Veg", hotelName: "Murugan Idli", location: "Besant Nagar" },
  { name: "Lemon Rice", description: "Tangy rice with peanuts and curry leaves", price: 100, image: "lemon_rice.jpg", category: "Veg", hotelName: "Murugan Idli", location: "Besant Nagar" },

  // --- HOTEL 9: Cream Centre ---
  { name: "Channa Bhatura", description: "Giant fluffy bhatura with spicy chole", price: 290, image: "bhatura.jpg", category: "Veg", hotelName: "Cream Centre", location: "Mylapore" },
  { name: "Cheese Corn Balls", description: "Melting cheese and corn snack (6 Pcs)", price: 240, image: "cheese_balls.jpg", category: "Veg", hotelName: "Cream Centre", location: "Mylapore" },
  { name: "Margherita Pizza", description: "Classic tomato and cheese thin pizza", price: 350, image: "pizza.jpg", category: "Veg", hotelName: "Cream Centre", location: "Mylapore" },
  { name: "Veg Sizzler", description: "Hot plate serving rice, patties and veggies", price: 450, image: "sizzler.jpg", category: "Veg", hotelName: "Cream Centre", location: "Mylapore" },
  { name: "Pasta Alfredo", description: "Penne pasta in creamy white sauce", price: 320, image: "pasta.jpg", category: "Veg", hotelName: "Cream Centre", location: "Mylapore" },

  // --- HOTEL 10: Foodie Hub (Fast Food) ---
  { name: "Zinger Burger", description: "Crispy fried chicken burger with mayo", price: 190, image: "burger.jpg", category: "Non-Veg", hotelName: "Foodie Hub", location: "Marina" },
  { name: "French Fries", description: "Classic salted crispy potato strips", price: 120, image: "fries.jpg", category: "Veg", hotelName: "Foodie Hub", location: "Marina" },
  { name: "Chicken Wings", description: "Spicy BBQ glazed wings (6 Pcs)", price: 250, image: "wings.jpg", category: "Non-Veg", hotelName: "Foodie Hub", location: "Marina" },
  { name: "Veg Sandwich", description: "Grilled sandwich with fresh veggies", price: 140, image: "sandwich.jpg", category: "Veg", hotelName: "Foodie Hub", location: "Marina" },
  { name: "Chocolate Shake", description: "Thick creamy chocolate milkshake", price: 150, image: "shake.jpg", category: "Veg", hotelName: "Foodie Hub", location: "Marina" }
];

const seedDB = async () => {
  try {
    await Food.deleteMany({});
    await Food.insertMany(foodData);
    console.log("60+ Foods Added Successfully! Database Seeded.");
  } catch (err) {
    console.error("Seeding Error:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();