import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    price: Number,
    rating: Number,
    brand: String,
    model: String,
    image: String,
});

export default mongoose.models.Product ||
    mongoose.model('Product', ProductSchema);
