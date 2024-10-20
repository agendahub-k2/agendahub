import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import styles from './indexStyles'; // Arquivo de estilos

export default function Login() {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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

    function limparForm() {
        setEmail('');
        setFullName('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
    }

    const handleNext = async () => {
        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            triggerAlert('Por favor, preencha todos os campos.');
            return;
        }

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            triggerAlert('As senhas não coincidem.');
            return;
        }

        setLoading(true);

        const userData = {
            name: fullName,
            email: email,
            password: password,
            userType: isProvider ? "PROVEDOR" : "SOLICITANTE",
            phone: phone,
        };

        try {

            if (isProvider) {
                navigation.navigate('EstabelecimentoRegister'); // Navega para o cadastro de estabelecimento
            }else{
                const response = await fetch('http://localhost:8080/user/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });
    
                const data = await response.json();
                if (response.ok) {
                    console.log('Resposta da API:', response.ok, data);
                    triggerAlert('Cadastro realizado com sucesso!');
                    limparForm();
    
                    navigation.navigate('Login'); // Navega para a tela de login
    
                } else {
                    console.log('Resposta da API:', data);
                    if (data.message === "Validation failed") {
                        // Percorre o array de erros
                        data.errors.forEach(error => {
                            // Verifica o campo que causou o erro
                            if (error.field === "phone") {
                                triggerAlert('O campo de telefone não pode estar vazio.');
                            } else if (error.field === "password") {
                                triggerAlert('A senha deve ter entre 6 e 255 caracteres.');
                            }
                            else if (error.field === "name") {
                                triggerAlert('Nome deve ter entre 6 e 255 caracteres.');
                            }
                            else if (error.field === "email") {
                                triggerAlert('E-mail não é válido.');
                            }
                        });
                    }
                }
            }
        } catch (error) {
            console.log('Erro ao conectar com o servidor:', error);
            triggerAlert('Erro ao conectar com o servidor. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const triggerAlert = (message) => {
        setAlertMessage(message);
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 5000);
    };

    return (
        <View style={styles.container}>
            {alertVisible && (
                <Animatable.View animation="fadeInDown" duration={500} style={styles.alertContainer}>
                    <Text style={styles.alertText}>{alertMessage}</Text>
                </Animatable.View>
            )}

            <Header navigation={navigation} />

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
                    label="Digite sua Senha"
                    passwordVisible={passwordVisible}
                    setPasswordVisible={setPasswordVisible}
                    password={password}
                    setPassword={setPassword}
                />

                <PasswordField
                    label="Confirme sua Senha"
                    passwordVisible={confirmPasswordVisible}
                    setPasswordVisible={setConfirmPasswordVisible}
                    password={confirmPassword}
                    setPassword={setConfirmPassword}
                />

                <View style={styles.providerContainer}>
                    <TouchableOpacity onPress={() => setIsProvider(!isProvider)} style={styles.providerCheckbox}>
                        <Icon name={isProvider ? "checkbox" : "checkbox-outline"} size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={[styles.title, { fontSize: 14, lineHeight: 20 }]}>É um provedor?</Text>
                </View>

                <TouchableOpacity onPress={handleNext} style={styles.submitButtonContainer}>
                    <LinearGradient
                        colors={['#0052D4', '#4364F7', '#6FB1FC']}
                        style={styles.button}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonregister}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={[styles.registerText, { textAlign: 'center', marginTop: 20 }]}>
                        Já possui uma conta? <Text style={{ color: 'blue' }}>Faça login</Text>
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const Header = ({ navigation }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
    </View>
);

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

const PhoneField = ({ phone, setPhone }) => (
    <>
        <Text style={[styles.title, { fontSize: 14 }]}>Seu Telefone</Text>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Digite seu telefone..."
                style={[styles.input, { height: 40 }]}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
            />
        </View>
    </>
);

const PasswordField = ({ label, passwordVisible, setPasswordVisible, password, setPassword }) => (
    <>
        <Text style={[styles.title, { fontSize: 14 }]}>{label}</Text>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Digite sua senha..."
                style={[styles.input, { height: 40 }]}
                secureTextEntry={!passwordVisible}
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon name={passwordVisible ? "eye-off" : "eye"} size={24} color="#000" />
            </TouchableOpacity>
        </View>
    </>
);
