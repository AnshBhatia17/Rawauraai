    const dbConfig = require("../config/db.config.js");

    const mongoose = require("mongoose");
    mongoose.Promise = global.Promise;

    const db = {};
    db.mongoose = mongoose;
    db.url = dbConfig.DB_URL;

    // db.users = require("./users.model.js")(mongoose);
    // db.categories = require("./category.model.js")(mongoose);
    // db.roles = require("./roles.model.js")(mongoose)
    // db.staff = require("./staff.model.js")(mongoose);
    // db.stores = require("./Store.model.js")(mongoose);
    // db.Inventory = require("./InventoryManagement.model.js");
    // db.cart = require("./cart.model.js")(mongoose);
    // db.subcategories = require("./subcategory.model.js")(mongoose);
    // db.type=require("./type.model.js")(mongoose);
    // db.subtype=require("./subtype.model.js")(mongoose);
    // db.deliverypartners = require("./deliveryPartner.model.js")(mongoose);
    // db.Order= require("./order.model.js")(mongoose);
    // db.Address=require("./Address.model.js")(mongoose);
    // db.Discount=require("./discount.model.js")(mongoose);
    db.Prompt = require("./prompts.js")(mongoose);

    module.exports = db;