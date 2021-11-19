const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connnection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 25) + 10;
        const camp = new Campground({
            // MY USER ID
            author: '61949a19d4efee54711ec383',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo beatae ipsum veniam alias vitae rerum amet iste qui similique inventore, unde minus provident laborum consequuntur enim quidem sed quasi neque.',
            price,
            geometry:{
                type: "Point",
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },  
            images: [
                {
                    url: 'https://res.cloudinary.com/dueps81qk/image/upload/v1637217993/YelpCamp/bvvf2o1qpwaoh68oydl3.png',
                    filename: 'YelpCamp/bvvf2o1qpwaoh68oydl3',
                },
                {
                    url: 'https://res.cloudinary.com/dueps81qk/image/upload/v1637217996/YelpCamp/icd1kccsykl02yptjvmf.png',
                    filename: 'YelpCamp/icd1kccsykl02yptjvmf',
                },
                {
                    url: 'https://res.cloudinary.com/dueps81qk/image/upload/v1637217998/YelpCamp/kzmxc7msh5fo1wy7g29o.png',
                    filename: 'YelpCamp/kzmxc7msh5fo1wy7g29o',
                },
                {
                    url: 'https://res.cloudinary.com/dueps81qk/image/upload/v1637217998/YelpCamp/fw7flmklhvuddhtyzv9r.png',
                    filename: 'YelpCamp/fw7flmklhvuddhtyzv9r',
                },
                {
                    url: 'https://res.cloudinary.com/dueps81qk/image/upload/v1637217999/YelpCamp/mqxclajqxzuc1xeygu0y.png',
                    filename: 'YelpCamp/mqxclajqxzuc1xeygu0y',
                },
                {
                    url: 'https://res.cloudinary.com/dueps81qk/image/upload/v1637218001/YelpCamp/pzgg9tmgbbs0rtnvolca.png',
                    filename: 'YelpCamp/pzgg9tmgbbs0rtnvolca',
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        db.close();
    })
