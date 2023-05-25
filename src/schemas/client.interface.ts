export interface Client {
  firstName: string;
  lastName: string;
  phone: number;
  address: {
    city: string;
    zone: string;
    street: string;
  };
}
