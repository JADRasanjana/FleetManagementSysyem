const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    
    supplier_id : {
        type : String,
        required : true
    },

    supplier_name : {
        type : String,
        required : true
    },

    supplier_NIC : {
        type : String,
        required : true
    },

    phone_number : {
        type : String,
        required : true
    },

    supplier_possition : {
        type : String,
        required : true
    },
    
    company_name : {
        type : String,
        required : true
    },
    
    item_type : {
        type : String,
        required : true
    },
    
    item_code : {
        type : String,
        required : true
    },
    
    quntity : {
        type : Number,
        required : true
    },
    
    unit_price : {
        type : Number,
        required : true
    },
    
    total_price : {
        type : Number,
       required : true
    },

    order_given_date : {
        type : Date,
        required : true
    },

    manufatured_date : {
        type : Date,
        required : true
    },

    expired_date : {
        type : Date,
        required : true
    },

    invoice_number : {
        type : String,
        required : true
    }
})

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;