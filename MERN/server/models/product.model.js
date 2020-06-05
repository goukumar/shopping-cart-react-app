const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
            {
                name: String,
                price: Number,
                description: String,
                image: String,
                category: { type: Schema.Types.ObjectId, ref: 'category'}
            }
);

module.exports = mongoose.model('Product', ProductSchema);
