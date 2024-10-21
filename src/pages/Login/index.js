import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import styles from './indexStyles';

export default function Login() {
    const navigation = useNavigation();
    const route = useRoute();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const animRef = useRef(null);

    useEffect(() => {
        if (route.params?.clearFields) {
            setEmail('');
            setPassword('');
        }
    }, [route.params]);

    // Função de tratamento de login
    const handleLoginPress = () => {
        if (!email || !password) {
            showAlertMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }

        setLoading(true);

        // Simulação de autenticação
        setTimeout(() => {
            setLoading(false);
            showAlertMessage('Você foi logado com sucesso!', 'success');

            // Redireciona para a tela Home após 3 segundos (tempo do alerta)
            setTimeout(() => {
                navigation.navigate('Home');
            }, 3000);
        }, 2000);
    };

    const showAlertMessage = (message, type) => {
        setAlertMessage(message);
        setShowAlert(type); // 'success' ou 'error'
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <View style={styles.container}>
            {showAlert && (
                <Animatable.View
                    style={[styles.alertContainer, showAlert === 'success' ? styles.successAlert : styles.errorAlert]}
                    animation="slideInDown"
                    duration={700}
                >
                    <Text style={styles.alertText}>{alertMessage}</Text>
                </Animatable.View>
            )}

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerHeader}>
                <Text style={styles.message}>LOGIN</Text>
                <Text style={styles.neonText}>Preencha os campos abaixo para acessar sua conta.</Text>
            </View>

            <Animatable.View ref={animRef} style={styles.containerForm} animation="fadeInUp">
                <FormField
                    label="E-mail"
                    placeholder="Digite seu E-mail..."
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <PasswordField
                    passwordVisible={passwordVisible}
                    setPasswordVisible={setPasswordVisible}
                    password={password}
                    setPassword={setPassword}
                />

                <TouchableOpacity onPress={handleLoginPress} style={{ marginTop: 20 }}>
                    <LinearGradient
                        colors={['#0052D4', '#4364F7', '#6FB1FC']}
                        style={styles.button}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Entrar</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonregister}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={[styles.registerText, { textAlign: 'center', marginTop: 20 }]}>
                        Não possui uma conta? <Text style={{ color: 'blue' }}>Cadastre-se</Text>
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

// Campos de formulário
const FormField = ({ label, placeholder, keyboardType, value, onChangeText }) => (
    <>
        <Text style={styles.title}>{label}</Text>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                keyboardType={keyboardType}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    </>
);

const PasswordField = ({ passwordVisible = false, setPasswordVisible, password, setPassword }) => (
    <>
        <Text style={styles.title}>Senha</Text>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Digite sua senha..."
                style={styles.input}
                secureTextEntry={!passwordVisible}
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#666" />
            </TouchableOpacity>
        </View>
    </>
);
