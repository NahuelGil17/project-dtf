import { Profile } from 'src/app/features/auth/interfaces/auth.interface';

export const prepareProfileObject = (data: any): Profile => {
  const profile: Profile = {
    fullName: data.fullName,
    birthDate: data.birthDate,
    location: data.location,
    phoneNumber: data.phoneNumber,
    avatar: '',
    certificates: [],
    services: data.services,
    description: data.description,
    specialities: data.specialities ? data.specialities : [],
  };
  return profile;
};
