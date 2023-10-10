import { useMutation } from '@tanstack/react-query';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

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
  loading: boolean;
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
    onSuccess: (data) => {
      setRole(data.data.role);
    },
  });

  const userSignUpMutation = useMutation({
    mutationFn: userSignUpFn,
    onSuccess: (data) => {
      setRole(data.data.role);
    },
  });

  const businessSignUpMutation = useMutation({
    mutationFn: businessSignUpFn,
    onSuccess: (data) => {
      setRole(data.data.role);
    },
  });

  async function logIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  async function signOut() {
    await getAuth().signOut();
    setCurrentUser(null);
    setRole(null);
  }

  async function userSignUp({ email, fullName, username, password }: UserSignUpData) {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password!);
      if (response.user) {
        userSignUpMutation.mutate({ email, fullName, username });
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  async function businessSignUp({
    email,
    address,
    phoneNumber,
    name,
    password,
  }: BusinessSignUpData) {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password!);
      if (response.user) {
        businessSignUpMutation.mutate({ email, address, phoneNumber, name });
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        logInMutation.mutate();
      }
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    role,
    loading,
    logIn,
    signOut,
    userSignUp,
    businessSignUp,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
