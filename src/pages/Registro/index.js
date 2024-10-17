import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import styles from './indexStyles'; 

export default function Login() {
    const navigation = useNavigation(); 
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [countryCode, setCountryCode] = useState({ cca2: 'BR', callingCode: ['55'] });
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const animRef = useRef(null);

    const handleLogin = () => {
        if (!fullName || !email || !phone || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true); 

        animRef.current.fadeOut(600).then(() => {
            setTimeout(() => {
                setLoading(false); 
                Alert.alert('Cadastro Realizado!', 'Seu cadastro foi realizado com sucesso.');
            }, 2000);
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
                <Text style={[styles.subMessage, styles.neonText]}>
                    Preencha os campos abaixo para criar sua agenda.
                    </Text>
            </View>

            <Animatable.View ref={animRef} style={styles.containerForm} animation="fadeInUp">
                <FormField 
                    label="Seu Nome Completo" 
                    placeholder="Digite seu nome completo..." 
                    keyboardType="default" 
                    value={fullName}
                    onChangeText={setFullName}
                />
                
                <PhoneField 
                    countryCode={countryCode} 
                    setCountryCode={setCountryCode} 
                    phone={phone}
                    setPhone={setPhone}
                />

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
                            <Text style={styles.buttonText}>Finalizar Cadastro</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonregister} 
                    onPress={() => navigation.navigate('Register')} 
                >
                    {/* <Text style={{ color: '#a1a1a1' }}>Já possui uma conta? Faça login</Text> */}
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

const PhoneField = ({ countryCode, setCountryCode, phone, setPhone }) => (
    <>
        <Text style={styles.title}>Seu Telefone</Text>
        <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CountryPicker
                    countryCode={countryCode.cca2}
                    withFlag
                    withCallingCode
                    onSelect={(country) => setCountryCode(country)}
                    containerButtonStyle={{ padding: 0 }}
                />
                <TextInput
                    placeholder="Telefone"
                    style={styles.input}
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>
        </View>
    </>
);

const PasswordField = ({ passwordVisible, setPasswordVisible, password, setPassword }) => (
    <>
        <Text style={styles.title}>Digite sua Senha</Text>
        <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
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
