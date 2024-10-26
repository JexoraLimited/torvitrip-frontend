export interface ICreateTravelerPayload {
  title?: string;
  given_name?: string;
  surname: string;
  nationality: string;
  gender: string;
  email: string;
  phone: string;
  birth_date: string;
  frequent_flyer_number?: string;
  passport_number: string;
  passport_expiry_date: string;
  passport_issue_date: string;
  passport_img: string;
  visa_img: string;
}
