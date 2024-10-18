import React, { useRef, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import styles from './indexStyles';
import axios from 'axios';

const EstablishmentRegister = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        establishmentName: '',
        cep: '',
        address: '',
        houseNumber: '',
        phone: '',
        cnpj: '',
        email: '',
        establishmentType: '',
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const animRef = useRef(null);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const showAlertMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000); // 3 seconds
    };

    const validateForm = () => {
        const { establishmentName, cep, phone, houseNumber } = formData;
        if (!establishmentName || !cep || !phone || !houseNumber) {
            showAlertMessage('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Simulação de chamada de API
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigation.navigate('CompleteEstablishmentInfo');
        } catch (error) {
            showAlertMessage('Ocorreu um erro ao cadastrar o estabelecimento.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAddress = useCallback(async () => {
        const { cep } = formData;
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.data && !response.data.erro) {
                handleChange('address', response.data.logradouro);
            }
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        }
    }, [formData]);

    const formatCNPJ = (value) => {
        value = value.replace(/\D/g, '');
        if (value.length > 12) {
            return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        } else if (value.length > 8) {
            return value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
        } else if (value.length > 5) {
            return value.replace(/(\d{2})(\d{3})/, '$1.$2');
        } else if (value.length > 2) {
            return value.replace(/(\d{2})/, '$1.');
        }
        return value;
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
                    Preencha os campos abaixo para cadastrar o seu estabelecimento!
                </Text>
            </View>

            <ScrollView style={styles.containerForm} keyboardShouldPersistTaps="handled">
                <Animatable.View ref={animRef} animation="fadeInUp">
                    <FormField 
                        label="Nome do Estabelecimento" 
                        placeholder="Digite o nome do estabelecimento..." 
                        value={formData.establishmentName}
                        onChangeText={(value) => handleChange('establishmentName', value)}
                    />

                    <FormField 
                        label="CEP" 
                        placeholder="Digite o CEP..." 
                        value={formData.cep}
                        onChangeText={(value) => handleChange('cep', value)}
                        onBlur={fetchAddress}
                    />

                    <View style={styles.addressContainer}>
                        <FormField 
                            // label="" 
                            placeholder="Confirmar Endereço..." 
                            value={formData.address}
                            editable={false}
                            style={{ flex: 1 }} 
                        />
                        <FormField 
                            label="N°" 
                            placeholder="N°" 
                            value={formData.houseNumber}
                            onChangeText={(value) => handleChange('houseNumber', value)}
                            style={{ width: 80 }} 
                        />
                    </View>

                    <View style={styles.inputContainer}>
                    
                        <TextInput
                            placeholder="Digite o telefone..."
                            style={[styles.input, { height: 40, marginLeft: 10, flex: 1 }]}
                            placeholderTextColor="#999"
                            value={formData.phone}
                            onChangeText={(text) => handleChange('phone', text.replace(/[^0-9]/g, ''))} // Permite apenas números
                            keyboardType="numeric"
                        />
                    </View>

                    <FormField 
                        label="Email do Estabelecimento (opcional)" 
                        placeholder="Digite o email..." 
                        value={formData.email}
                        onChangeText={(value) => handleChange('email', value)}
                    />

                    <Text style={[styles.title, { fontSize: 14 }]}>Tipo de Estabelecimento</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={formData.establishmentType}
                            editable={false} 
                            style={[styles.input, { height: 40, marginTop: 10 }]}  
                            placeholder="Tipo selecionado"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <FormField 
                        label="CNPJ (opcional)" 
                        placeholder="Digite o CNPJ..." 
                        value={formData.cnpj}
                        onChangeText={(text) => handleChange('cnpj', formatCNPJ(text))} 
                        keyboardType="numeric"
                    />

                    <TouchableOpacity onPress={handleRegister} style={{ marginTop: 20 }}>
                        <LinearGradient
                            colors={['#0052D4', '#4364F7', '#6FB1FC']} 
                            style={[styles.button, { paddingVertical: 15 }]}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text style={[styles.buttonText, { fontSize: 16 }]}>Cadastrar Estabelecimento</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>

            {/* Alerta Dinâmico */}
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
