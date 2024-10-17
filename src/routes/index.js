import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../pages/Welcom"; 
import Login from "../pages/Login"; 
import Register from "../pages/Registro";


const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
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
        </Stack.Navigator>
    );
}
