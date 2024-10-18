import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import styles from './indexStyles'; 

export default function Login() {
    const navigation = useNavigation(); 
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [countryCode, setCountryCode] = useState({ cca2: 'BR', callingCode: ['55'] });
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isProvider, setIsProvider] = useState(false);
    const animRef = useRef(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleLogin = () => {
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            setAlertMessage('Por favor, preencha todos os campos.');
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000); // Alerta desaparece após 3 segundos
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage('As senhas não coincidem.');
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000); // Alerta desaparece após 3 segundos
            return;
        }

        setLoading(true); 

        animRef.current.fadeOut(600).then(() => {
            setTimeout(() => {
                setLoading(false); 
                navigation.navigate(isProvider ? 'EstabelecimentoRegister' : 'Welcom');
            }, 2000);
        });
    };

    return (
        <View style={styles.container}>
            {alertVisible && (
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
                <Text style={styles.message}>CADASTRE-SE</Text>
                <Text style={[styles.subMessage, styles.neonText]}>
                    Preencha os campos abaixo para realizar seu cadastro!
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

                <ConfirmPasswordField 
                    confirmPasswordVisible={confirmPasswordVisible}
                    setConfirmPasswordVisible={setConfirmPasswordVisible}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                    <TouchableOpacity onPress={() => setIsProvider(!isProvider)} style={{ marginRight: 5 }}>
                        <Icon name={isProvider ? "checkbox" : "checkbox-outline"} size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={[styles.title, { fontSize: 14, lineHeight: 20 }]}>É um provedor?</Text>
                </View>

                <TouchableOpacity onPress={handleLogin} style={{ marginTop: 15 }}>
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
                    onPress={() => navigation.navigate('Login')} 
                >
                    <Text style={[styles.registerText, { textAlign: 'center', marginTop: 20 }]}>
                        Já possui uma conta? Faça login
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const FormField = ({ label, placeholder, keyboardType, value, onChangeText }) => (
    <>
        <Text style={[styles.title, { fontSize: 14 }]}>{label}</Text>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholder}
                style={[styles.input, { height: 40 }]}
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
        <Text style={[styles.title, { fontSize: 14 }]}>Seu Telefone</Text>
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
                    style={[styles.input, { height: 40 }]}
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
        <Text style={[styles.title, { fontSize: 14 }]}>Digite sua Senha</Text>
        <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                placeholder="Digite sua senha..."
                style={[styles.input, { height: 40 }]}
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

const ConfirmPasswordField = ({ confirmPasswordVisible, setConfirmPasswordVisible, confirmPassword, setConfirmPassword }) => (
    <>
        <Text style={[styles.title, { fontSize: 14 }]}>Confirme sua Senha</Text>
        <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                placeholder="Confirme sua senha..."
                style={[styles.input, { height: 40 }]}
                secureTextEntry={!confirmPasswordVisible}
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
                <Icon name={confirmPasswordVisible ? "eye-off" : "eye"} size={20} color="#666" />
            </TouchableOpacity>
        </View>
    </>
);
