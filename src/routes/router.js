import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome';  
import Login from '../pages/Login';
import Register from '../pages/Registro';
import EstabelecimentoRegister from '../pages/EstabelecimentoRegister';
import Home from '../pages/Home/index';

const Stack = createNativeStackNavigator();

export default function Routes({ isAuthenticated, handleLogin }) {
    return (
        <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Welcome"}>
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
                </>
            )}
        </Stack.Navigator>
    );
}
