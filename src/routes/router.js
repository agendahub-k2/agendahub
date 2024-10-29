import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home/index';
import HomeProvider from '../pages/HomeProvider';
import Agenda from '../pages/Agenda'; 
import Perfil from '../pages/Perfil'; 
import CustomTabBar from '../pages/CustomTabar/Index';


const Tab = createBottomTabNavigator();


// Função das Bottom Tabs
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
            tabBar={(props) => <CustomTabBar {...props} />} 
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="HomeProvider" component={HomeProvider} options={{ headerShown: false }} />
            <Tab.Screen name="Agenda" component={Agenda} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

