export interface Client {
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    city: string;
    zone: string;
    street: string;
  };
}
