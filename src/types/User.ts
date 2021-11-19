export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  emailVerified: boolean;
  emailVerifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
