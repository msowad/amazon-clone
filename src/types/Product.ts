export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  publicId: string;
  price: number;
  brand: string;
  rating: number;
  description: string;
  numReviews: number;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
}
