import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import styles from './indexStyles'; // Certifique-se de que o caminho esteja correto

export default function Login() {
    const navigation = useNavigation(); 
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // Estado para controlar o alerta
    const [alertMessage, setAlertMessage] = useState(''); // Mensagem do alerta
    const animRef = useRef(null);

    const handleLogin = () => {
        if (!email || !password) {
            showAlertMessage('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true); 

        animRef.current.fadeOut(600).then(() => {
            setTimeout(() => {
                setLoading(false); 
                showAlertMessage('Login Realizado! Você foi logado com sucesso.');
            }, 2000);
        });
    };

    const showAlertMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // O alerta desaparece após 3 segundos
    };

    return (
        <View style={styles.container}>
            {showAlert && (
                <View style={styles.alertContainer}>
                    <Text style={styles.alertText}>{alertMessage}</Text>
                </View>
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
                    label="Seu E-mail" 
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

                <TouchableOpacity onPress={handleLogin} style={{ marginTop: 20 }}>
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
                    <Text style={styles.neonGrayText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

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
        <Text style={styles.title}>Digite sua Senha</Text>
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
