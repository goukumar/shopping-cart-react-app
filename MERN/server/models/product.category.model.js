const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdCategorySchema = new Schema(
            {
                "Category": String,
                "description": String,
                "image": String,
            }
        
);

module.exports = mongoose.model('category', ProdCategorySchema);