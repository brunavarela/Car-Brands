import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { signIn } from "../services/api";  

type FormData = {
  username: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await signIn(data.username, data.password);
      console.log('Login bem-sucedido:', response);
      setErrorMessage(null);  
    } catch (err) {
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      console.error('Erro no login', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Controller
        name="username"
        control={control}
        defaultValue={username}
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              placeholder="Username"
              value={value || username}
              onChangeText={(text) => {
                onChange(text);
                setUsername(text);
              }}
              style={styles.input}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>  // Corrigido para Text
            )}
          </View>
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue={password}
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={value || password}
              onChangeText={(text) => {
                onChange(text);
                setPassword(text);
              }}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text> 
            )}
          </View>
        )}
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <Button title="Sign In" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 10,
  },
});
