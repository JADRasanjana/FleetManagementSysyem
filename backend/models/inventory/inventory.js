const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({

    pid : {
        type: String,
        required: true,
    },
    type : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    brand : {
        type: String,
        required: true
    },
    qty : {
        type: Number,
        required: true
    },
    unit_price : {
        type: Number,
        required: true
    },
    size : {
        type: Number,
        required: false
    },
    voltage : {
        type: Number,
        required: false
    },
    amp_hrs : {
        type: Number,
        required: false
    },
    man_date : {
        type: Date,
        required: false
    },
    exp_date : {
        type: Date,
        required: false
    },
    reorder_level : {
        type: Number,
        required: true
    }

})

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;  // exporting the schema

// what is the name of the filke 