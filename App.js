import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Home from './src/pages/Home'; 
import Agenda from './src/pages/Agenda'; 
import HomeProvider from './src/pages/HomeProvider'; 
import Perfil from './src/pages/Perfil';
import CustomTabBar from './src/pages/CustomTabar/Index';
import Login from './src/pages/Login'; 
import Routes from './src/routes/router'; 

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Agenda" component={Agenda} />
            <Tab.Screen name="HomeProvider" component={HomeProvider} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
};

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

                    console.log("logado " + token);
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
            {isAuthenticated ? (
                <Drawer.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
                    <Drawer.Screen name="Main" component={MainTabNavigator} />
                    <Drawer.Screen name="Agenda" component={Agenda} />
                    <Drawer.Screen name="HomeProvider" component={HomeProvider} />
                    <Drawer.Screen name="Perfil" component={Perfil} />
                    {/* Aqui você pode adicionar mais telas no Drawer, se necessário */}
                </Drawer.Navigator>
            ) : (
                <Routes isAuthenticated={isAuthenticated} />
            )}
        </NavigationContainer>
    );
}
