import React from 'react';
import { View, Image, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomTabBar from '../CustomTabar/Index'; 

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIcon}>
                    <MaterialIcons name="menu" size={24} color="#121212" /> 
                </TouchableOpacity>

                <Image 
                    source={{ uri: "https://github.com/Devwillmarinho.png" }} 
                    style={styles.img}
                />

                <View style={styles.user}>
                    <Text style={styles.hi}>Olá,</Text>
                    <Text style={styles.username}>Willian Marinho</Text>
                </View>
            </View>
        </View>
    );
}

function AgendaScreen() {
    return (
        <View style={styles.container}>
            <Text>Agenda Screen</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        </View>
    );
}

// Configuração das Abas com CustomTabBar
export default function Home() {
    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Agenda" component={AgendaScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 32,
        backgroundColor: "#FFFFFF",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 12,
    },
    user: {
        flex: 1,
        justifyContent: "center",
    },
    hi: {
        fontSize: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: "700",
    },
    menuIcon: {
        marginRight: 10, 
    },
});
