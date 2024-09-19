const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateReviews = (num, numProducts) => {
  const reviews = [];

  for (let i = 0; i < num; i++) {
    const review = {
      id: i + 1, // Incremental ID for each review
      product_id: faker.number.int({ min: 1, max: numProducts }), // Link to a random product
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }), // Generate a rating between 1 and 5
      review_text: faker.lorem.sentences(2), // Generate a fake review
      review_name: faker.person.firstName() + " " + faker.person.lastName(), // Random reviewer name
      avatar_url: faker.image.avatar(), // Generate a random avatar
      created_at: faker.date.past().toISOString(), // Random date in the past
    };

    reviews.push(review);
  }

  return reviews;
};

// Number of reviews to generate
const numReviews = 200;

// Number of products (assuming you've already generated products)
const numProducts = 50;

// Generate reviews
const reviews = generateReviews(numReviews, numProducts);

// Save reviews as JSON file
fs.writeFileSync("reviews.json", JSON.stringify(reviews, null, 2));

console.log("Fake reviews generated!");
