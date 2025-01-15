import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

interface AuthContextData {
  user: { id: number; name: string; token: string } | null;
  signIn: (user: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser) setUser(JSON.parse(storedUser));
    })();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post("https://test-api-y04b.onrender.com/signIn", {
        user: username,
        password,
      });
      if (!response.data.error) {
        const userData = response.data.user;
        setUser(userData);
        await AsyncStorage.setItem("@user", JSON.stringify(userData));
      }
    } catch (error) {
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
