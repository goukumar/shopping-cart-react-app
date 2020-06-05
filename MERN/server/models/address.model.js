const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema(
            {
                userid: String,
                street: String,
                city: String,
                sector: String,
                pin: String,
                state: String
            }
);

module.exports = mongoose.model('Address', AddressSchema);
