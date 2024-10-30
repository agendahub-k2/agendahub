import React from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper'; // Importando Avatar do react-native-paper
import CustomTabBar from '../CustomTabar/Index';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIcon}>
                    <MaterialIcons name="menu" size={24} color="#121212" /> 
                </TouchableOpacity>

                <Avatar.Image 
                    size={50}
                    source={{ uri: "https://github.com/Devwillmarinho.png" }}
                    style={styles.avatar}
                />

                <View style={styles.user}>
                    <Text style={styles.hi}>Olá bem-vindo a Home,</Text>
                    <Text style={styles.username}>Willian Marinho</Text>
                </View>
            </View>

            {/* Adicionando um botão para navegar à tela de serviços */}
            <Button 
                title="Ir para Serviços" 
                onPress={() => navigation.navigate('Serviços')} 
            />
        </View>
    );
}

function ServicosScreen() {
    return (
        <View style={styles.serviceContainer}>
            <Text style={styles.serviceTitle}>Nome do Serviço: Corte de Cabelo</Text>
            <Text style={styles.serviceDetail}>DURAÇÃO DE CORTE: 30 minutos</Text>
            <Text style={styles.serviceDetail}>PREÇO DO SERVIÇO: R$ 50,00</Text>
        </View>
    );
}

export default function Home() {
    return (
        <Tab.Navigator 
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Serviços" component={ServicosScreen} />
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
    avatar: {
        backgroundColor: "#e1e1e1", 
    },
    user: {
        flex: 1,
        justifyContent: "center",
    },
    hi: {
        fontSize: 10,
        color: "#333",
    },
    username: {
        fontSize: 16,
        fontWeight: "700",
        color: "#121212",
    },
    menuIcon: {
        marginRight: 10, 
    },
    serviceContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    serviceDetail: {
        fontSize: 16,
        color: "#555",
        marginVertical: 5,
    },
});
