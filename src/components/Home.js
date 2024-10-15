import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/HomeStyles'; 

function Home({ navigation }) {
  const handleNavigate = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
