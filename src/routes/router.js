import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Registro';
import EstabelecimentoRegister from '../pages/EstabelecimentoRegister';
import Home from '../pages/Home/index';
import HomeProvider from '../pages/HomeProvider';
import Agenda from '../pages/Agenda'; 
import Perfil from '../pages/Perfil'; 
import CustomTabBar from '../pages/CustomTabar/Index';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Função que define as tabs para o usuário
function HomeTabs() {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false, 
                tabBarActiveTintColor: "#121212",
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: "#FFF",
                },
            }}
            tabBar={ (props) => <CustomTabBar {...props} /> }
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="HomeProvider" 
                component={HomeProvider}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="business-center" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Agenda" 
                component={Agenda} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="view-agenda" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Perfil" 
                component={Perfil} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" color={color} size={size} />
                    ),
                }} 
            />
        </Tab.Navigator>
    );
}

// Função principal que gerencia as rotas do aplicativo
export default function Routes({ isAuthenticated, handleLogin }) {
    return (
        <Stack.Navigator initialRouteName={isAuthenticated ? "HomeTabs" : "Welcome"}>
            {isAuthenticated ? (
                <Stack.Screen
                    name="HomeTabs"
                    component={HomeTabs} 
                    options={{ headerShown: false }} 
                />
            ) : (
                <>
                    <Stack.Screen
                        name="Welcome"
                        component={Welcome}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        options={{ headerShown: false }}
                    >
                        {props => <Login {...props} handleLogin={handleLogin} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="EstabelecimentoRegister"
                        component={EstabelecimentoRegister}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen     ///possivelmente tenha que tirar essa parte verificar//
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                     <Stack.Screen
                        name="HomeProvider"
                        component={HomeProvider}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
