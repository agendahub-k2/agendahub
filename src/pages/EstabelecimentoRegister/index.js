import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import styles from './indexStyles';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const EstablishmentRegister = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userData } = route.params;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cep: '',
        address: '',
        houseNumber: '',
        establishmentType: '',
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('');

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showAlertMessage = (message) => {
        setAlertMessage(message);
        setAlertColor(color = '#4CAF50'); // Definindo a cor do alerta//
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const validateForm = () => {
        const { cep, houseNumber, establishmentType } = formData;
        if (!cep || !houseNumber || !establishmentType) {
            showAlertMessage('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;
        
        const requestBody = {
            ...userData,
            providerRequest: {
                numero: formData.houseNumber,
                descricaoRua: formData.address,
                typeProvider: formData.establishmentType,
                numCep: formData.cep.replace('-', '')
            }
        };
    
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/user/create', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 201) {
                showAlertMessage('Provedor Cadastrado.');
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 3000);
        } else {
            console.log('Resposta da API:', response.data.message);
            if (response.data.errors) {
                response.data.errors.forEach(err => {
                    console.log(`Campo: ${err.field}, Erro: ${err.error}`);
                });
            }
            showAlertMessage('Erro ao cadastrar o usuário. Tente novamente.');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            console.log('Mensagem de erro da API:', error.response.data.message);

            if(error.response.data.message == "Email já cadastrado."){
                showAlertMessage(error.response.data.message);
                navigation.navigate('Register');
                return;
            }

            if (error.response.data.errors) {
                error.response.data.errors.forEach(err => {
                    console.log(`Campo: ${err.field}, Erro: ${err.error}`);
                });
            }
            showAlertMessage('Erro ao cadastrar o usuário. Verifique os campos e tente novamente.');
        } else {
            console.log('Erro:', error.message);
            showAlertMessage('Ocorreu um erro inesperado. Tente novamente.');
        }
        } finally {
            setLoading(false);
        }
    };

    const fetchAddress = useCallback(async () => {
        const { cep } = formData;
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
            if (response.data && !response.data.erro) {
                handleChange('address', response.data.logradouro);
            } else {
                showAlertMessage('CEP inválido. Por favor, verifique.', '#FFFF00'); // Amarelo para CEP inválido
            }
        } catch {
            showAlertMessage('Erro ao buscar endereço.', '#ff4444'); // vermelho para erro de BUSCA
        }
    }, [formData]);

    const handleCepChange = (value) => {
        const formattedCep = value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
        handleChange('cep', formattedCep); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerHeader}>
                <Text style={styles.message}>CADASTRO</Text>
                <Text style={[styles.subMessage, styles.neonText]}>
                    Provedor, preencha os campos abaixo para finalizar!
                </Text>
            </View>

            <ScrollView style={styles.containerForm} keyboardShouldPersistTaps="handled">
                <Animatable.View animation="fadeInUp">
                    <FormField 
                        label="CEP" 
                        placeholder="Digite o CEP..." 
                        value={formData.cep}
                        onChangeText={handleCepChange}
                        onBlur={fetchAddress}
                    />

                    <View style={styles.addressContainer}>
                        <FormField 
                            placeholder="Confirmar Endereço..." 
                            value={formData.address}
                            editable={false}
                            style={{ flex: 1 }} 
                        />
                        <FormField 
                            label="N°" 
                            placeholder="N°" 
                            value={formData.houseNumber}
                            onChangeText={(value) => handleChange('houseNumber', value.replace(/[^0-9]/g, ''))}
                            style={{ width: 80 }} 
                        />
                    </View>

                    <Text style={styles.title}>Tipo de Provedor</Text>
                    <View style={styles.inputContainer}>
                        <Picker
                            selectedValue={formData.establishmentType}
                            onValueChange={(itemValue) => handleChange('establishmentType', itemValue)}
                            style={[styles.input, { height: 40, marginTop: 10 }]}
                        >
                            <Picker.Item label="Qual a finalidade da agenda" value="" />
                            <Picker.Item label="Consultório Médico" value="Consultório Médico" />
                            <Picker.Item label="Clínica de Estética" value="Clínica de Estética" />
                            <Picker.Item label="Academia" value="Academia" />
                            <Picker.Item label="Barbearia" value="Barbearia" />
                            <Picker.Item label="Clínica de Oftalmologia" value="Clínica de Oftalmologia" />
                            <Picker.Item label="Clínica de Quiropraxia" value="Clínica de Quiropraxia" />
                            <Picker.Item label="Estúdio de Maquiagem" value="Estúdio de Maquiagem" />
                            <Picker.Item label="Clínica de Medicina Esportiva" value="Clínica de Medicina Esportiva" />
                            <Picker.Item label="Clínica de Geriatria" value="Clínica de Geriatria" />
                            <Picker.Item label="Clínica de Fisioterapia Esportiva" value="Clínica de Fisioterapia Esportiva" />
                            <Picker.Item label="Clínica de Reabilitação" value="Clínica de Reabilitação" />
                            <Picker.Item label="Estúdio de Personal Trainer" value="Estúdio de Personal Trainer" />
                            <Picker.Item label="Centro de Terapias Alternativas" value="Centro de Terapias Alternativas" />
                            <Picker.Item label="Consultório de Psiquiatria" value="Consultório de Psiquiatria" />
                            <Picker.Item label="Consultório de Otorrinolaringologia" value="Consultório de Otorrinolaringologia" />
                            <Picker.Item label="Consultório de Nutrologia" value="Consultório de Nutrologia" />
                            <Picker.Item label="Centro de Terapia Ocupacional" value="Centro de Terapia Ocupacional" />
                            <Picker.Item label="Estúdio de Depilação" value="Estúdio de Depilação" />
                            <Picker.Item label="Clínica de Podologia Esportiva" value="Clínica de Podologia Esportiva" />
                            <Picker.Item label="Clínica de Endocrinologia" value="Clínica de Endocrinologia" />
                            <Picker.Item label="Centro de Acupuntura" value="Centro de Acupuntura" />
                            <Picker.Item label="Clínica de Terapia Cognitivo-Comportamental" value="Clínica de Terapia Cognitivo-Comportamental" />
                            <Picker.Item label="Consultório de Cardiologia" value="Consultório de Cardiologia" />
                            <Picker.Item label="Centro de Estética Avançada" value="Centro de Estética Avançada" />
                            <Picker.Item label="Consultório de Pediatria" value="Consultório de Pediatria" />
                            <Picker.Item label="Centro de Reabilitação Postural" value="Centro de Reabilitação Postural" />
                            <Picker.Item label="Clínica de Estética Facial" value="Clínica de Estética Facial" />
                            <Picker.Item label="Consultório de Dermatologia Estética" value="Consultório de Dermatologia Estética" />
                            <Picker.Item label="Centro de Reabilitação Neurológica" value="Centro de Reabilitação Neurológica" />
                            <Picker.Item label="Clínica de Cirurgia Plástica" value="Clínica de Cirurgia Plástica" />
                            <Picker.Item label="Centro de Medicina do Sono" value="Centro de Medicina do Sono" />
                            <Picker.Item label="Clínica de Psicoterapia" value="Clínica de Psicoterapia" />
                            <Picker.Item label="Clínica de Medicina Ocupacional" value="Clínica de Medicina Ocupacional" />
                            <Picker.Item label="Centro de Psicologia Infantil" value="Centro de Psicologia Infantil" />
                            <Picker.Item label="Clínica de Reabilitação Esportiva" value="Clínica de Reabilitação Esportiva" />
                        </Picker>

                    </View>

                    <TouchableOpacity onPress={handleRegister} style={{ marginTop: 20 }}>
                        <LinearGradient
                            colors={['#0052D4', '#4364F7', '#6FB1FC']} 
                            style={[styles.button, { height: 70, justifyContent: 'center' }]} 
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text style={[styles.buttonText, { fontSize: 18 }]}>Cadastrar</Text> 
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>

            {showAlert && (
                <View style={[styles.alertContainer, { backgroundColor: alertColor }]}>
                    <Text style={styles.alertText}>{alertMessage}</Text>
                </View>
            )}
        </View>
    );
};

const FormField = ({ label, placeholder, value, onChangeText, editable = true, onBlur, style }) => (
    <>
        {label && <Text style={[styles.title, { fontSize: 14 }]}>{label}</Text>}
        <View style={[styles.inputContainer, style]}>
            <TextInput
                placeholder={placeholder}
                style={[styles.input, { height: 40 }]}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
                editable={editable}
                onBlur={onBlur}
            />
        </View>
    </>
);

export default EstablishmentRegister;
