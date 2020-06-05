const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
            {
                uniqid: String,
                productid: String,
                qty:Number,
                userid: { type: String, default: 'guest' },
                products:[{
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                }] 
            }
);

module.exports = mongoose.model('Cart', CartSchema);