// Home.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Usuário Logado</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5', // Cor de fundo
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Cor do texto
    },
});

export default Home;
