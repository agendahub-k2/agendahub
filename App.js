import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Home from './components/Home'; // Verifique o nome correto dos componentes

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado para controle de autenticação
  const [loading, setLoading] = useState(true); // Estado de loading

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Pegando o token armazenado no AsyncStorage
        const token = await AsyncStorage.getItem('userToken');
        console.log('token: ' + token);
        
        if (token) {
          // Fazendo a requisição com o token recuperado
          const response = await fetch('http://localhost:8080/user/authenticate', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Passando o token no cabeçalho
            },
          });

          if (response.ok) {
            setIsAuthenticated(true); // Usuário está autenticado
          } else {
            setIsAuthenticated(false); // Usuário não está autenticado
          }
        } else {
          setIsAuthenticated(false); // Se não tiver token, não está autenticado
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false); // Se houver erro, considerar como não autenticado
      } finally {
        setLoading(false); // Remover loading após verificar
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" /> {/* Indicador de carregamento */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
