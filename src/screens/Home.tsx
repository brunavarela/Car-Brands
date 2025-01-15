import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";

interface Brand {
  codigo: string;
  nome: string; 
}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export const Home: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);
  const [brands, setBrands] = useState<Brand[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://parallelum.com.br/fipe/api/v1/carros/marcas");
        setBrands(response.data);
      } catch (error) {
        alert("Failed to fetch car brands.");
      }
    };
    fetchBrands();
  }, []);

  const handleBrandPress = (brand: Brand) => {
    navigation.navigate("Model", { brandCode: brand.codigo, brandName: brand.nome });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
        Welcome, {user?.name}!
      </Text>
      <Button title="Logout" onPress={signOut} />
      <FlatList
        data={brands}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleBrandPress(item)}
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
