import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from './src/routes/router';
import Home from './src/pages/Home/index';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        
        if (token) {
          const response = await fetch('http://localhost:8080/user/authenticate', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          setIsAuthenticated(response.ok);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#005BB5" barStyle="light-content" />
      <Routes isAuthenticated={isAuthenticated} />
    </NavigationContainer>
  );
}
