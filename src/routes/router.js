import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../pages/Welcom"; 
import Login from "../pages/Login"; 
import Register from "../pages/Registro";
import EstabelecimentoRegister from '../pages/EstabelecimentoRegister/index';
import Home from '../pages/Home/Home';

const Stack = createNativeStackNavigator();

export default function Routes({ isAuthenticated }) {
    return (
        <Stack.Navigator>
            {isAuthenticated ? (
                <Stack.Screen
                    name="Home" 
                    component={Home}
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
                        component={Login}
                        options={{ headerShown: false }}
                    />
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
                </>
            )}
        </Stack.Navigator>
    );
}