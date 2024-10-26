export interface IUpdateProfilePayload {
  title?: string;
  summary?: string;
  hourly_rate?: number;
  image?: string;
  skills?: string[];
  tools?: string[];
  languages?: {
    name: string;
    level: string;
  }[];
  address?: {
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country_code: string;
    phone: string;
  };
  education?: {
    degree_title: string;
    description: string;
    country: string;
    start_date: {
      month: string;
      year: string;
    };
    end_date: {
      month: string;
      year: string;
    };
  }[];
  work_experience?: {
    title: string;
    description: string;
    company: string;
    country: string;
    employment: string;
    website: string;
    start_date: {
      month: string;
      year: string;
    };
    end_date?: {
      month: string;
      year: string;
    };
  }[];
}

export interface IUpdateUserProfile {
  id: string;
  payload: IUpdateProfilePayload;
}

export interface ISignUp {
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: "traveler";
}

export interface ISignIn {
  password: string;
  email: string;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  exp: string;
}
