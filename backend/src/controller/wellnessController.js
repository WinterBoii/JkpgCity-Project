const wellness = require('../models/Wellness')

const wellness_post = async (req, res) => {
    const { name, url, rating, categories } = req.body;
    try {
        const wellness = await wellness.create({ name, url, rating, categories });
        res.status(200).json({ wellness: wellness._id });
    } catch (err) {
        res.status(400).send("Error creating wellness");
    }
}


const wellnesss_get = async (req, res) => {
    try {
        const wellnesss = await wellness.find();
        res.status(200).json({wellnesss: wellnesss});
    } catch (err) {
        res.status(400).send("error getting wellness");
    }
}

// method to update wellness from the database
const updateWellnessById = async (req, res) =>{
    const id = req.params.id;
    const wellness = await this.findOne({id})  // 'this' refers to the wellness model instance
    if (wellness) {
        this.name = name;
        this.url = url;
        this.rating = rating;
        this.categories = categories;
        await this.save();
    } throw  Error('wellness not found')
}


module.exports = {
    wellness_post,
    wellnesss_get,
    updateWellnessById
}