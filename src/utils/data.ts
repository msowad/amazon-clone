import bcrypt from 'bcryptjs';

export const data = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      password: bcrypt.hashSync('password', 10),
      isAdmin: true,
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@email.com',
      password: bcrypt.hashSync('password', 10),
      isAdmin: false,
    },
  ],
  // An array of product with id,name,slug,category,image,price,brand,rating,description,numReviews,countInStock
  products: [
    {
      id: 1,
      name: 'Google Pixel - Black',
      slug: 'google-pixel-black',
      category: 'Electronics',
      image: 'http://localhost:3000/products/product-1.jpg',
      price: 10,
      brand: 'Google',
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.',
    },
    {
      id: 2,
      name: 'Samsung S7',
      slug: 'samsung-s7',
      category: 'Electronics',
      image: 'http://localhost:3000/products/product-2.jpg',
      price: 16,
      brand: 'Samsung',
      rating: 4.2,
      numReviews: 5,
      countInStock: 6,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.',
    },
    {
      id: 3,
      name: 'HTC 10 - Black',
      slug: 'htc-10-black',
      category: 'Electronics',
      image: 'http://localhost:3000/products/product-3.jpg',
      price: 8,
      brand: 'HTC',
      rating: 3.2,
      numReviews: 12,
      countInStock: 6,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.',
    },
    {
      id: 4,
      name: 'HTC 10 - White',
      slug: 'htc-10-white',
      category: 'Electronics',
      image: 'http://localhost:3000/products/product-4.jpg',
      price: 18,
      brand: 'HTC',
      rating: 4.2,
      numReviews: 5,
      countInStock: 6,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.',
    },
    {
      id: 5,
      name: 'Vintage Iphone',
      slug: 'vintage-iphone',
      category: 'Electronics',
      image: 'http://localhost:3000/products/product-5.jpg',
      price: 12,
      brand: 'Apple',
      rating: 4.2,
      numReviews: 5,
      countInStock: 6,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.',
    },
  ],
};
