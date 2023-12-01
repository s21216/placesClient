import { useMutation } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
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
  currentUser?: User;
  role?: string | null;
  loading: boolean;
  mutationLoading: boolean;
  logIn: (email: string, password: string) => void;
  signOut: () => Promise<void>;
  userSignUp: ({ email, fullName, username, password }: UserSignUpData) => void;
  businessSignUp: ({ email, name, phoneNumber, password, location }: BusinessSignUpData) => void;
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
  const [currentUser, setCurrentUser] = useState<User>();
  const [role, setRole] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  const { mutate, isLoading } = useMutation({
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

  const mutationLoading =
    isLoading || userSignUpMutation.isLoading || businessSignUpMutation.isLoading;

  async function logIn(email: string, password: string) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  async function signOut() {
    await getAuth().signOut();
    setCurrentUser(undefined);
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
    phoneNumber,
    name,
    type,
    password,
    location,
  }: BusinessSignUpData) {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password!);
      if (response.user) {
        businessSignUpMutation.mutate({ email, phoneNumber, name, type, location });
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        mutate();
        setCurrentUser(user);
      }
      SplashScreen.hideAsync();
    });
    setLoading(false);
    return unsubscribe;
  }, [mutate]);

  const value: AuthContextType = {
    currentUser,
    role,
    loading,
    mutationLoading,
    logIn,
    signOut,
    userSignUp,
    businessSignUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
