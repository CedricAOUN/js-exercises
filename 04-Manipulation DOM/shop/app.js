const products = [
  {
    title: "Graphic Tee Classic",
    image: "assets/images1.jpg",
    alt: "A classic graphic tee in black",
    price: 15,
    category: "tshirt",
    attributes: ["100% cotton", "unisex fit", "soft touch"],
    rating: 4.5
  },
  {
    title: "Vintage Logo Hoodie",
    image: "assets/images2.jpg",
    alt: "Vintage hoodie with logo print",
    price: 35,
    category: "hoodie",
    attributes: ["warm fleece", "oversized fit", "machine washable"],
    rating: 4.7
  },
  {
    title: "Sports Tank Top",
    image: "assets/images3.jpg",
    alt: "Lightweight sports tank top in grey",
    price: 20,
    category: "tank top",
    attributes: ["breathable fabric", "sleeveless", "quick dry"],
    rating: 4.2
  },
  {
    title: "High-Waisted Joggers",
    image: "assets/images4.jpg",
    alt: "Comfortable high-waisted joggers in navy",
    price: 30,
    category: "pants",
    attributes: ["stretch waistband", "relaxed fit", "side pockets"],
    rating: 4.6
  },
  {
    title: "Slim Fit Jeans",
    image: "assets/images5.jpg",
    alt: "Dark blue slim fit jeans",
    price: 40,
    category: "jeans",
    attributes: ["stretch denim", "fitted cut", "durable material"],
    rating: 4.3
  },
  {
    title: "Casual Polo Shirt",
    image: "assets/images6.jpg",
    alt: "Classic casual polo in white",
    price: 25,
    category: "polo",
    attributes: ["soft cotton", "short sleeve", "breathable"],
    rating: 4.1
  },
  {
    title: "Long Sleeve Henley",
    image: "assets/images7.jpg",
    alt: "Henley shirt with buttons in light grey",
    price: 22,
    category: "shirt",
    attributes: ["button collar", "long sleeves", "slim fit"],
    rating: 4.4
  },
  {
    title: "Running Shorts",
    image: "assets/images8.jpg",
    alt: "Lightweight running shorts in black",
    price: 18,
    category: "shorts",
    attributes: ["lightweight", "elastic waistband", "quick-dry"],
    rating: 4.5
  },
  {
    title: "Graphic Print Sweatshirt",
    image: "assets/images9.jpg",
    alt: "Sweatshirt with bold graphic print",
    price: 28,
    category: "sweatshirt",
    attributes: ["cotton blend", "round neck", "bold design"],
    rating: 4.6
  },
  {
    title: "Classic Leather Belt",
    image: "assets/images10.jpg",
    alt: "Classic leather belt in brown",
    price: 12,
    category: "accessory",
    attributes: ["genuine leather", "adjustable buckle", "durable"],
    rating: 4.0
  },
  {
    title: "Casual Chino Pants",
    image: "assets/images11.jpg",
    alt: "Slim-fit casual chinos in beige",
    price: 32,
    category: "pants",
    attributes: ["slim fit", "cotton blend", "multiple pockets"],
    rating: 4.3
  },
  {
    title: "Baseball Cap",
    image: "assets/images12.jpg",
    alt: "Casual baseball cap in navy blue",
    price: 10,
    category: "accessory",
    attributes: ["adjustable size", "cotton material", "embroidered logo"],
    rating: 4.2
  },
  {
    title: "Cozy Knit Scarf",
    image: "assets/images13.jpg",
    alt: "Warm knit scarf in grey",
    price: 15,
    category: "accessory",
    attributes: ["soft knit", "warm material", "long length"],
    rating: 4.4
  },
  {
    title: "Waterproof Windbreaker",
    image: "assets/images14.jpg",
    alt: "Lightweight waterproof windbreaker in green",
    price: 45,
    category: "jacket",
    attributes: ["water-resistant", "lightweight", "hooded"],
    rating: 4.8
  },
  {
    title: "Basic White Tee",
    image: "assets/images15.jpg",
    alt: "Simple and soft white tee",
    price: 10,
    category: "tshirt",
    attributes: ["100% cotton", "crew neck", "short sleeve"],
    rating: 4.1
  }
]


const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const searchBtn = document.getElementById('search-btn');
const resultDiv = document.getElementById('results');

let currentResults = [];

for (let p of products) {
  console.log(p);
  currentResults.push(createCard(p.title, p.img, p.alt, p.price, p.category, p.attributes, p.rating));
}


displayResults(currentResults);



function createCard(title, img, alt, price, category, attributes, rating) {
  let card = document.createElement('div');

  console.log(title);

  let h3Title = document.createElement('h3');
  h3Title.innerText = title;

  let imageElement = document.createElement('img');
  imageElement.src = img;
  imageElement.alt = alt;

  let categorySubText = document.createElement('p');
  categorySubText.className = 'category';
  categorySubText.textContent = category;

  let priceAndRating = document.createElement('div');
  priceAndRating.className = 'price-and-rating';
  
  let priceElement = document.createElement('p');
  priceElement.className = 'price';
  priceElement.textContent = price;

  let ratingElement = document.createElement('p');
  ratingElement.className = 'rating';
  ratingElement.textContent = rating;

  priceAndRating.appendChild(priceElement);
  priceAndRating.appendChild(ratingElement);

  card.appendChild(h3Title);
  card.appendChild(imageElement);
  card.appendChild(categorySubText);
  card.appendChild(createAttributeList(attributes));
  card.appendChild(priceAndRating);

  return card;
}

function createAttributeList(attr) {
  let ul = document.createElement('ul');

  if (attr) {
      for (let a of attr) {
      let listItem = document.createElement('li');
      listItem.textContent = a;
      ul.appendChild(listItem);
    }
  }
  
  
  return ul;
}


function displayResults(res) {
  resultDiv.innerHTML = ""; // empty the div;

  for (let r of res) {
    resultDiv.appendChild(r);
  }
  
}