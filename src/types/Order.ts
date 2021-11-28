interface OrderItem {
  _id: {} | string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  paymentMethod: 'stripe' | 'cod';
  shippingDetails: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  price: {
    items: number;
    shipping: number;
    tax: number;
    total: number;
  };
  isDelivered: boolean;
  isPaid: boolean;
  paidAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
