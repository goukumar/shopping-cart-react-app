const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
            {
                product:Object,
                userid: String,
                address:Object,
                orederDate: { type: Date, default: Date.now }
            }
);

module.exports = mongoose.model('Order', OrderSchema);
