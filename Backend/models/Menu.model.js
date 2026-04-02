import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Beverage", "Pastry", "Breakfast", "Lunch", "Dessert"],
    },
    imageUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
