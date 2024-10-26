export interface IEditAccountPayload {
  first_name: string;
  last_name: string;
  address: {
    street?: string;
    city?: string;
    country?: string;
    postal_code?: string;
  };
}
