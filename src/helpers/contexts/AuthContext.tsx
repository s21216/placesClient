import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { FIREBASE_AUTH } from '../../../firebase-config';

type AuthContextType = {
  currentUser?: User | null;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
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
  const [loading, setLoading] = useState(true);

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signOut() {
    await getAuth().signOut();
    setCurrentUser(null);
  }

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
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
    logIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
