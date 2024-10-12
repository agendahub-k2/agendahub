import React, { useState } from 'react';
import { 
  StyleSheet, 
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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async () => {

    Alert.alert('Testando Alert', 'Este é um teste');
    if (email.trim() === '' || password.trim() === '') {
      setShowAlert(true);
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8080/user/login', userData);
      const token = response.data.token; // Supondo que o token está na propriedade 'token'
      
      // Salvar o token usando AsyncStorage
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

        {/* Alerta customizado para Web */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? '60%' : '50%', // Ajusta tamanho no Web e Mobile
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgb(62, 62, 219)',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: Platform.OS === 'web' ? '20%' : '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: '#007BFF',
  },
});
