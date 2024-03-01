const Wellness = require('../models/Wellness')

const createWellness = async (req, res) => {
    const data = {
        name: req.body.name,
        url: req.body.url,
        rating: req.body.rating,
        categories: req.body.categories
    }    
    try {
        const wellness = await Wellness.create(data);
        res.status(200).json({ wellness: wellness._id });
    } catch (err) {
        res.status(400).send("Error creating wellness");
    }
}

// method to retrieve all stores in the database
const wellnesss_get = async (req, res) => {
    try {
        const wellnesss = await Wellness.find();
        res.status(200).json({wellnesss: wellnesss});
    } catch (err) {
        res.status(400).send("error getting wellness");
    }
}

// method to update wellness by id 
const updatewellnessById = async (req, res) =>{
    const id = {id: req.params.id} 
    const data = {
        name: req.body.name,
        url: req.body.url,
        rating: req.body.rating,
        categories: req.body.categories
    }
    try { 
        const wellness = await Wellness.findByIdAndUpdate(id, data)
        res.status(200).json(wellness);
        console.log(wellness) 
        } catch (err) {
            res.status(400).send(`error updating wellness${err.message}`);
        }
}

// method to delete a wellness by id 
const deletewellnessById = async (req, res) =>{
    const id = {id: req.params.id} 
    try { 
        const wellness = await Wellness.findByIdAndDelete(id)
        res.status(200).json("wellness deleted seccessfully");
        console.log("wellness deleted successfully") 
        } catch (err) {
            res.status(400).send(`error deleting wellness${err.message}`);
        }
}

// method to get wellnesss by categori from the database
const getwellnesssByCategory = async (req, res) => {
    const categories = {
        categories: req.body.categories
    }
    
    try { 
        const wellnesss = await Wellness.find(categories)
        res.status(200).json(wellnesss);
        console.log(wellnesss) 
        } catch (err) {
            res.status(400).send(`error getting wellnesss by category${err}`);
        }
}


module.exports = {
    createWellness,
    wellnesss_get,
    updatewellnessById,
    deletewellnessById,
    getwellnesssByCategory
}