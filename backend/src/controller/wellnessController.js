const Wellness = require('../models/Wellness')

const createWellness = async (req, res) => {
    const { name, url, rating, categories } = req.body;
    try {
        const wellness = await Wellness.create({ name, url, rating, categories });
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
    const {id} = req.params.id;
    const { name, url, rating, categories } = req.body;
    try { 
        const wellness = await Wellness.findByIdAndUpdate(id, {name, url, rating, categories})
        res.status(200).json(wellness);
        console.log(wellness) 
        } catch (err) {
            res.status(400).send(`error updating wellness${err.message}`);
        }
}

// method to delete a wellness by id 
const deletewellnessById = async (req, res) =>{
    const {id} = req.params.id;
    try { 
        const wellness = await Wellness.findByIdAndDelete(id)
        res.status(200).json("wellness deleted seccessfully");
        console.log("wellness deleted successfully") 
        } catch (err) {
            res.status(400).send(`error deleting wellness${err.message}`);
        }
}

// method to get wellnesss by categori from the database
const getwellnesssByCategory = async (req, res) =>{
    const {category} = req.body

    try { 
        const wellnesss = await Wellness.find(category)
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