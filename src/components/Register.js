import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import styles from '../styles/RegisterStyles';

function Register({ navigation }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const handleRegister = () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = form;
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    } else if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
    } else {
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Cadastro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Insira Seu Nome"
        value={form.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={form.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={form.phone}
        onChangeText={(value) => handleChange('phone', value)}
        keyboardType="phone-pad"
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          value={form.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
          <Icon name={showPassword ? "visibility-off" : "visibility"} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Repita a Senha"
          value={form.confirmPassword}
          onChangeText={(value) => handleChange('confirmPassword', value)}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconButton}>
          <Icon name={showConfirmPassword ? "visibility-off" : "visibility"} size={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Register;
