import { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import {onAuthStateChanged, signOut, type User} from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig'

interface AuthContextType{
    loading: boolean;
    user: User | null;
    logout: ()=> Promise<void>
}

const AuthContext = createContext<AuthContextType| undefined>(undefined);

interface AuthProviderProps{
    children: ReactNode
}


export function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

        setLoading(false);

      }
    );

    return () => unsubscribe();

  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{
      user,loading,logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const context = useContext(AuthContext)
  if(!context) throw new Error('UseAuth must be used inside Authprovider')

  return context;
}