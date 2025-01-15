import React, { useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

type FormData = {
  username: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const { signIn } = useContext(AuthContext);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await signIn(data.username, data.password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Controller
        name="username"
        control={control}
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Username"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

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
