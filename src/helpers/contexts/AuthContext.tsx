import { useMutation } from '@tanstack/react-query';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { FIREBASE_AUTH } from '../../../firebase-config';
import {
  BusinessSignUpData,
  UserSignUpData,
  businessSignUpFn,
  logInFn,
  userSignUpFn,
} from '../../api/auth';

type AuthContextType = {
  currentUser?: User | null;
  role?: string | null;
  logIn: (email: string, password: string) => void;
  signOut: () => Promise<void>;
  userSignUp: ({ email, fullName, username, password }: UserSignUpData) => void;
  businessSignUp: ({ email, name, phoneNumber, password }: BusinessSignUpData) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('No AuthContext.Provider found when calling useAuth.');
  }
  return authContext;
}

const auth = FIREBASE_AUTH;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [role, setRole] = useState<string | null>();
  const [loading, setLoading] = useState(true);

  const logInMutation = useMutation({
    mutationFn: logInFn,
  });

  const userSignUpMutation = useMutation({
    mutationFn: userSignUpFn,
  });

  const businessSignUpMutation = useMutation({
    mutationFn: businessSignUpFn,
  });

  async function logIn(email: string, password: string) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response.user) {
      logInMutation.mutate();
      if (logInMutation.isSuccess) {
        setRole(logInMutation.data.data.role);
      }
    }
  }

  async function signOut() {
    await getAuth().signOut();
    setCurrentUser(null);
    setRole(null);
  }

  async function userSignUp({ email, fullName, username, password }: UserSignUpData) {
    const response = await createUserWithEmailAndPassword(auth, email, password!);
    if (response.user) {
      userSignUpMutation.mutate({ email, fullName, username });
      if (userSignUpMutation.isSuccess) {
        setRole(userSignUpMutation.data.data.role);
      }
    }
  }

  async function businessSignUp({
    email,
    address,
    phoneNumber,
    name,
    password,
  }: BusinessSignUpData) {
    const response = await createUserWithEmailAndPassword(auth, email, password!);
    if (response.user) {
      businessSignUpMutation.mutate({ email, address, phoneNumber, name });
    }
  }

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    role,
    logIn,
    signOut,
    userSignUp,
    businessSignUp,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
