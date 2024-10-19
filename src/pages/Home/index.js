import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        // Aqui você pode adicionar a lógica para deslogar o usuário
        // Por enquanto, vamos redirecionar para a tela de login
        navigation.navigate('home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à Tela Home!</Text>
            <Text style={styles.subtitle}>Estamos felizes em tê-lo aqui.</Text>

            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <LinearGradient
                    colors={['#0052D4', '#4364F7', '#6FB1FC']}
                    style={styles.gradientButton}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#005BB5',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    gradientButton: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Home;
