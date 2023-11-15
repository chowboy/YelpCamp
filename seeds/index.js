const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '650f4a1c968b5af9f522cb00',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus facere culpa facilis dignissimos consequatur maiores veritatis magni mollitia. Pariatur accusantium commodi aliquid laborum provident illo incidunt adipisci aspernatur ab molestiae.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwcyjru1m/image/upload/v1696959820/YelpCamp/nj9gkmasafeppyv6jl3j.jpg',
                    filename: 'YelpCamp/nj9gkmasafeppyv6jl3j'
                },
                {
                    url: 'https://res.cloudinary.com/dwcyjru1m/image/upload/v1696959820/YelpCamp/ggbyud4dbcfrj5qsrnnk.jpg',
                    filename: 'YelpCamp/ggbyud4dbcfrj5qsrnnk'
                }
            ]
        })
        await camp.save();
    }


}

seedDB().then(() => {
    mongoose.connection.close()
})