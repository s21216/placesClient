import { ReactNode, createContext, useContext, useState } from 'react';
import { z } from 'zod';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const schema = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(9).regex(phoneRegex, 'Invalid number'),
  password: z.string().min(6),
  location: z.object({
    address: z.string().min(2),
    latitude: z.number(),
    longitude: z.number(),
  }),
});
type FormData = z.infer<typeof schema>;

type BusinessSignUpContextType = {
  setForm: (form: FormData) => void;
  getForm: () => FormData;
};

export const BusinessSignUpContext = createContext<BusinessSignUpContextType | undefined>(
  undefined
);

export function BusinessSignUpProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FormData>({
    name: '',
    type: '',
    email: '',
    phoneNumber: '',
    password: '',
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const setForm = (value: FormData) => {
    setState(value);
  };

  const getForm = () => {
    return state;
  };

  const value: BusinessSignUpContextType = {
    setForm,
    getForm,
  };
  return <BusinessSignUpContext.Provider value={value}>{children}</BusinessSignUpContext.Provider>;
}

export function useBusinessSignUp() {
  const context = useContext(BusinessSignUpContext);
  if (!context) {
    throw new Error('useBusinessSignUp must be used within the AppProvider');
  }
  return context;
}
