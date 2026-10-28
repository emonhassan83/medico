export interface IRegisterUser {
  password: string;
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    profilePhoto?: string;
    address?: string;
  };
}