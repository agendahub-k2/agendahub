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

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showAlertMessage = (message) => {
        setAlertMessage(message);
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
            }
        } catch {
            showAlertMessage('Erro ao buscar endereço.');
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
                            <Picker.Item label="Qual finalidade da agenda" value="" />
                            <Picker.Item label="Consultório Médico" value="Consultório Médico" />
                            <Picker.Item label="Clínica de Estética" value="Clínica de Estética" />
                            <Picker.Item label="Academia" value="Academia" />
                            <Picker.Item label="Barbearia" value="Barbearia" />
                            <Picker.Item label="Salão de Beleza" value="Salão de Beleza" />
                            <Picker.Item label="Escola de Idiomas" value="Escola de Idiomas" />
                            <Picker.Item label="Estúdio de Yoga" value="Estúdio de Yoga" />
                            <Picker.Item label="Pet Shop" value="Pet Shop" />
                            <Picker.Item label="Centro de Fisioterapia" value="Centro de Fisioterapia" />
                            <Picker.Item label="Autoescola" value="Autoescola" />
                            <Picker.Item label="Escritório de Advocacia" value="Escritório de Advocacia" />
                            <Picker.Item label="Consultório Odontológico" value="Consultório Odontológico" />
                            <Picker.Item label="Centro Médico" value="Centro Médico" />
                            <Picker.Item label="Estúdio de Fotografia" value="Estúdio de Fotografia" />
                            <Picker.Item label="Clínica de Psicologia" value="Clínica de Psicologia" />
                            <Picker.Item label="Clínica de Massagem" value="Clínica de Massagem" />
                            <Picker.Item label="Estúdio de Pilates" value="Estúdio de Pilates" />
                            <Picker.Item label="Tatuador" value="Tatuador" />
                            <Picker.Item label="Escola de Música" value="Escola de Música" />
                            <Picker.Item label="Consultoria Financeira" value="Consultoria Financeira" />
                            <Picker.Item label="Consultoria de TI" value="Consultoria de TI" />
                            <Picker.Item label="Clínica de Nutrição" value="Clínica de Nutrição" />
                            <Picker.Item label="Clínica de Dermatologia" value="Clínica de Dermatologia" />
                            <Picker.Item label="Estúdio de Dança" value="Estúdio de Dança" />
                            <Picker.Item label="Oficina Mecânica" value="Oficina Mecânica" />
                            <Picker.Item label="Atelier de Costura" value="Atelier de Costura" />
                            <Picker.Item label="Clínica de Cardiologia" value="Clínica de Cardiologia" />
                            <Picker.Item label="Estúdio de Design de Sobrancelhas" value="Estúdio de Design de Sobrancelhas" />
                            <Picker.Item label="Clínica de Urologia" value="Clínica de Urologia" />
                            <Picker.Item label="Clínica de Ginecologia" value="Clínica de Ginecologia" />
                            <Picker.Item label="Consultório de Ortopedia" value="Consultório de Ortopedia" />
                            <Picker.Item label="Consultório de Endocrinologia" value="Consultório de Endocrinologia" />
                            <Picker.Item label="Clínica de Psicopedagogia" value="Clínica de Psicopedagogia" />
                            <Picker.Item label="Clínica de Oncologia" value="Clínica de Oncologia" />
                            <Picker.Item label="Clínica de Nefrologia" value="Clínica de Nefrologia" />
                            <Picker.Item label="Centro de Terapias Holísticas" value="Centro de Terapias Holísticas" />
                            <Picker.Item label="Clínica de Fonoaudiologia" value="Clínica de Fonoaudiologia" />
                            <Picker.Item label="Estúdio de Crossfit" value="Estúdio de Crossfit" />
                            <Picker.Item label="Centro de Podologia" value="Centro de Podologia" />
                            <Picker.Item label="Clínica de Geriatria" value="Clínica de Geriatria" />
                            <Picker.Item label="Consultório de Neurologia" value="Consultório de Neurologia" />
                            <Picker.Item label="Centro de Treinamento Funcional" value="Centro de Treinamento Funcional" />
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
                <View style={styles.alertContainer}>
                    <Text style={styles.alertText}>{alertMessage}</Text>
                </View>
            )}
        </View>
    );
};

const FormField = ({ label, placeholder, value, onChangeText, editable = true, onBlur, style }) => (
    <>
        <Text style={[styles.title, { fontSize: 14 }]}>{label}</Text>
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
