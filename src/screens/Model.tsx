import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";

interface RouteParams {
  brandCode: string;
  brandName: string;
}

interface Model {
  codigo: string;
  nome: string;
}

export const Model: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { brandCode, brandName } = route.params as RouteParams;
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos`
        );
        setModels(response.data.modelos);
      } catch (error) {
        alert("Failed to fetch car models.");
      }
    };
    fetchModels();
  }, [brandCode]);

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4">Models of {brandName}</Text>
      <FlatList
        data={models}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-300">
            <Text>{item.nome}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        className="mt-4 p-2 bg-blue-500 rounded"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white text-center">Back</Text>
      </TouchableOpacity>
    </View>
  );
};
