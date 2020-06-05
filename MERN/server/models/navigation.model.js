const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NavigationSchema = new Schema(
            {
                "lebel": String,
                "link": String,
                "subcategory":[
                    {
                        "lebel": String,
                        "link": String
                    }
                ]
            }
        
);

module.exports = mongoose.model('Navigation', NavigationSchema);