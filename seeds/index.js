const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6358075a2dec12274c3ec31b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae neque cumque, impedit nobis voluptate, quos fuga omnis, quisquam earum magni animi dicta hic aliquid quas sed. Aut odit iusto ducimus.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/redwanhq/image/upload/v1661679924/YelpCamp/w9wjhl1cuf4z3rkcdwfb.jpg",
          filename: "YelpCamp/w9wjhl1cuf4z3rkcdwfb",
        },
        {
          url: "https://res.cloudinary.com/redwanhq/image/upload/v1661680524/YelpCamp/pgbmdwrzrc0br1irfz0h.jpg",
          filename: "YelpCamp/pgbmdwrzrc0br1irfz0h",
        },
      ],
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
