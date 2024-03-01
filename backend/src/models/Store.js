const storeJson = require('../public/stores.json');
const mongoose = require('mongoose');

// Define a schema for the store
const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: String,
    district: String,
    categories: [String]
});

// Create a mongoose model based on the schema
const Store = mongoose.model('store', storeSchema);

// Loop through the data in the JSON file and save each store to the database
// const insertStoresFromStoresData = async () => {
//     for (storeData of storeJson) {
//         try {
//             // Create a new store document using the Store model
//             const newStore = new Store({
//                 name: storeData.name,
//                 url: storeData.url,
//                 district: storeData.district,
//                 categories: storeData.categories
//             });
//             // Save the store document to the database
//             await newStore.save();
//             console.log(`Store ${storeData.name} created successfully`);
//         } catch (error) {
//             console.error(`Error creating store ${storeData.name}:`, error);
//         }
//     };

// }

console.log('Hej')

module.exports = Store
