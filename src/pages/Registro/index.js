import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CountryPicker from 'react-native-country-picker-modal';
import styles from './indexStyles'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

export default function Login() {
    const navigation = useNavigation(); 
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [countryCode, setCountryCode] = useState({ cca2: 'BR', callingCode: ['55'] });
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
                <Text style={styles.message}>CADASTRE-SE</Text>
                <Text style={{ color: 'white' }}>Preencha os campos abaixo para criar sua agenda.</Text>
            </View>

            <Animatable.View ref={animRef} style={styles.containerForm} animation="fadeInUp">
                <FormField 
                    label="Seu Nome Completo" 
                    placeholder="Digite seu nome completo..." 
                    keyboardType="default" 
                />
                
                <PhoneField 
                    countryCode={countryCode} 
                    setCountryCode={setCountryCode} 
                />

                <FormField 
                    label="Seu E-mail" 
                    placeholder="Digite seu E-mail..." 
                    keyboardType="email-address" 
                />

                <PasswordField 
                    passwordVisible={passwordVisible} 
                    setPasswordVisible={setPasswordVisible} 
                />

                <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
                    <LinearGradient
                        colors={['#0052D4', '#4364F7', '#6FB1FC']} 
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Finalizar Cadastro</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonRegister} 
                    onPress={() => navigation.navigate('Register')} 
                >
                    {/* <Text style={styles.registerText}>Já possui uma conta? Faça login</Text> */}
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const FormField = ({ label, placeholder, keyboardType }) => (
    <>
        <Text style={styles.title}>{label}</Text>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                keyboardType={keyboardType}
                placeholderTextColor="#999"
            />
        </View>
    </>
);

const PhoneField = ({ countryCode, setCountryCode }) => (
    <>
        <Text style={styles.title}>Seu Telefone</Text>
        <View style={styles.inputContainer}>
            <View style={styles.phoneContainer}>
                <CountryPicker
                    countryCode={countryCode.cca2}
                    withFlag
                    withCallingCode
                    onSelect={(country) => setCountryCode(country)}
                    containerButtonStyle={styles.countryPicker}
                />
                <TextInput
                    placeholder="Telefone"
                    style={styles.inputPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                />
            </View>
        </View>
    </>
);

const PasswordField = ({ passwordVisible, setPasswordVisible }) => (
    <>
        <Text style={styles.title}>Digite sua Senha</Text>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Digite sua senha..."
                style={styles.input}
                secureTextEntry={!passwordVisible}
                placeholderTextColor="#999"
            />
            <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeIcon}
            >
                <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#666" />
            </TouchableOpacity>
        </View>
    </>
);
