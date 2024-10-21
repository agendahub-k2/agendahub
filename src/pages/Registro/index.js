import React, { useRef, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { useForm, Controller } from 'react-hook-form';
import styles from './indexStyles';

export default function Login() {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isProvider, setIsProvider] = useState(false);
    const animRef = useRef(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Inicializando o hook useForm
    const { control, handleSubmit, formState: { errors }, watch } = useForm();

    const limparForm = () => {
    };

    useFocusEffect(
        useCallback(() => {
            limparForm();
        }, [])
    );

    const onSubmit = async (data) => {
        const userData = {
            name: data.fullName,
            email: data.email,
            password: data.password,
            userType: isProvider ? "PROVEDOR" : "SOLICITANTE",
            phone: data.phone,
        };

        setLoading(true);

        try {
            if (isProvider) {
                navigation.navigate('EstabelecimentoRegister', { userData });
            } else {
                const response = await fetch('http://localhost:8080/user/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });
                const result = await response.json();
                if (response.ok) {
                    triggerAlert('Cadastro realizado com sucesso!');
                    limparForm();
                    navigation.navigate('Login');
                } else {
                    console.log('Resposta da API:', result.message);
                    if (result.message === "Validation failed") {
                        result.errors.forEach(error => {
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
                    }else{
                        triggerAlert('Erro - por favor, tente novamente mais tarde.');
                    }
                }
            }
        } catch (error) {
            console.log('3');
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

    const showProviderAlert = () => {
        Alert.alert(
            'Confirmação de Provedor',
            'Você selecionou a opção de provedor, o que significa que poderá oferecer serviços ou produtos na nossa plataforma. Certifique-se de que seus dados estão corretos para prosseguir com o cadastro.',
            [{ text: 'OK' }]
        );
    };

    const toggleProvider = () => {
        setIsProvider(!isProvider);
        if (!isProvider) {
            showProviderAlert();
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
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
                <Controller
                    control={control}
                    rules={{
                        required: 'Campo obrigatório.',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormField
                            label="Nome Completo"
                            placeholder="Digite seu nome completo..."
                            keyboardType="default"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="fullName"
                />
                {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

                <Controller
                    control={control}
                    rules={{
                        required: 'Campo obrigatório.',
                        pattern: {
                            value: /^\(\d{2}\) \d{5}-\d{4}$/,
                            message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX.',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PhoneField
                            phone={value}
                            setPhone={onChange}
                        />
                    )}
                    name="phone"
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

                <Controller
                    control={control}
                    rules={{
                        required: 'Campo obrigatório.',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'E-mail inválido.',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormField
                            label="E-mail"
                            placeholder="Digite seu E-mail..."
                            keyboardType="email-address"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                <Controller
                    control={control}
                    rules={{
                        required: 'Campo obrigatório.',
                        minLength: {
                            value: 6,
                            message: 'A senha deve ter pelo menos 6 caracteres.',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PasswordField
                            label="Senha"
                            passwordVisible={passwordVisible}
                            setPasswordVisible={setPasswordVisible}
                            password={value}
                            setPassword={onChange}
                            onBlur={onBlur}
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                <Controller
                    control={control}
                    rules={{
                        required: 'Campo obrigatório.',
                        validate: (value) => value === watch('password') || 'As senhas não coincidem.',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PasswordField
                            label="Confirme a Senha"
                            passwordVisible={confirmPasswordVisible}
                            setPasswordVisible={setConfirmPasswordVisible}
                            password={value}
                            setPassword={onChange}
                            onBlur={onBlur}
                        />
                    )}
                    name="confirmPassword"
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

                <View style={styles.providerContainer}>
                    <TouchableOpacity onPress={toggleProvider} style={styles.providerCheckbox}>
                        <Icon name={isProvider ? "checkbox" : "checkbox-outline"} size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={[styles.title, { fontSize: 14, lineHeight: 20 }]}>É um provedor?</Text>
                </View>

                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitButtonContainer}>
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
        </KeyboardAvoidingView>
    );
}

const Header = ({ navigation }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
    </View>
);

const FormField = ({ label, placeholder, keyboardType, value, onChangeText, onBlur }) => (
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
                onBlur={onBlur} 
            />
        </View>
    </>
);

const PasswordField = ({ label, password, setPassword, passwordVisible, setPasswordVisible, onBlur }) => (
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
                onBlur={onBlur}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon name={passwordVisible ? "eye" : "eye-off"} size={24} color="#000" />
            </TouchableOpacity>
        </View>
    </>
);

const PhoneField = ({ phone, setPhone }) => {
    const handleChange = (text) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length <= 11) {
            let formatted = '';
            if (cleaned.length > 2) {
                formatted += `(${cleaned.slice(0, 2)}) `;
                if (cleaned.length > 6) {
                    formatted += `${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
                } else {
                    formatted += cleaned.slice(2);
                }
            } else {
                formatted += cleaned;
            }
            setPhone(formatted);
        }
    };

    return (
        <>
            <Text style={[styles.title, { fontSize: 14 }]}>Telefone</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Digite seu telefone..."
                    style={[styles.input, { height: 40 }]}
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                    value={phone}
                    onChangeText={handleChange}
                />
            </View>
        </>
    );
};
