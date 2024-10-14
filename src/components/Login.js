import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  Platform, 
  Alert 
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/LoginStyles.js';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(''); 

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setShowAlert(true);
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/user/login', userData);
      const token = response.data.token; 
      
      await AsyncStorage.setItem('userToken', token);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha inválidos');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>AgendaHub</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {Platform.OS === 'web' && (
          <Modal
            transparent={true}
            visible={showAlert}
            animationType="slide"
            onRequestClose={() => setShowAlert(false)}
          >
            <View style={styles.alertContainer}>
              <View style={styles.alertBox}>
                <Text style={styles.alertText}>Email ou senha inválido</Text>
                <TouchableOpacity onPress={() => setShowAlert(false)}>
                  <Text style={styles.closeButton}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>

      <View style={styles.footer}>
        {message ? <Text style={styles.textButton}>{message}</Text> : null}
        <Text style={styles.textButton}>
          Não tem conta? 
          <Text 
            style={styles.createAccountButton} 
            onPress={() => navigation.navigate('Register')}
          >
            {''} Crie agora!
          </Text>
        </Text>
      </View>
    </View>
  );
}
