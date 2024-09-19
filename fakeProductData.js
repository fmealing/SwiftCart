const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateProducts = (num) => {
  const products = [];

  for (let i = 0; i < num; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: {
        title: faker.commerce.productDescription(),
        details: [
          { title: "Feature 1", text: faker.commerce.productAdjective() },
          { title: "Feature 2", text: faker.commerce.productAdjective() },
        ],
      },
      image_url: faker.image.url(640, 480, "tech", true), // Corrected method
      brand: faker.company.name(),
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }), // Updated method
      created_at: faker.date.past().toISOString(),
    };

    products.push(product);
  }

  return products;
};

// Generate 50 products
const products = generateProducts(50);

// Save as JSON file
fs.writeFileSync("products.json", JSON.stringify(products, null, 2));

console.log("Fake products generated!");

// Reviews Schema
// id: number
// product_id: number - points to product id
// rating: number
// review_text: string
// review_name: string
// avatar_url: string
// created_at: date
