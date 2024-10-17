import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './indexStyles'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

export default function Login() {
    const navigation = useNavigation(); 
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const animRef = useRef(null);

    const handleLogin = () => {
        animRef.current.fadeOut(600).then(() => {
            navigation.navigate('Welcom');
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerHeader}>
                <Text style={styles.message}>Bem-vindo(a)</Text>
            </View>

            <Animatable.View ref={animRef} style={styles.containerForm} animation="slideInUp">
                <Text style={styles.title}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite seu email..."
                        style={styles.input}
                        keyboardType="email-address"
                    />
                </View>

                <Text style={styles.title}>Senha</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite sua senha..."
                        style={styles.input}
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        style={styles.eyeIcon}
                    >
                        <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleLogin}>
                    <LinearGradient
                        colors={['#0052D4', '#4364F7', '#6FB1FC']}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>ACESSAR</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonregister} 
                    onPress={() => navigation.navigate('Register')} 
                >
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}
