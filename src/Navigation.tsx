import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from './screens/SignIn';  
import { Home } from './screens/Home';  
import { Model } from './screens/Model'; 

export type RootStackParamList = {
  SignIn: undefined; 
  Home: undefined;   
  Model: { brandCode: string; brandName: string }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Model" component={Model} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;