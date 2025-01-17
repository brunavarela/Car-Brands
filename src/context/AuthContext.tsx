import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

interface AuthContextData {
  user: { id: number; name: string; token: string } | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode; 
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser) setUser(JSON.parse(storedUser));
    })();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        'https://test-api-y04b.onrender.com/signIn', 
        {
          user: username, 
          password: password
        }, 
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data); 
    } catch (error) {
      console.error('Erro ao fazer login', error);
      alert("Login failed");
    }
  };
  

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("@user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children} 
    </AuthContext.Provider>
  );
};
