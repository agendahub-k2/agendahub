import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import styles from './indexStyles.js';

export default function EstablishmentRegister() {
    const navigation = useNavigation(); 
    const [loading, setLoading] = useState(false);
    const [establishmentName, setEstablishmentName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const animRef = useRef(null);

    const handleRegister = () => {
        if (!establishmentName || !address || !phone) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true); 

        animRef.current.fadeOut(600).then(() => {
            setTimeout(() => {
                setLoading(false); 
                Alert.alert('Cadastro de Estabelecimento!', 'Seu estabelecimento foi cadastrado com sucesso.');
                navigation.navigate('Login'); // alterar esse campo para mudar a rota apos fazer o cadastro da empresa//
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
                <Text style={styles.message}>CADASTRE O SEU ESTABELECIMENTO</Text>
                <Text style={[styles.subMessage, styles.neonText]}>
                    Preencha os campos abaixo para cadastrar o seu estabelecimento!
                </Text>
            </View>

            <Animatable.View ref={animRef} style={styles.containerForm} animation="fadeInUp">
                <FormField 
                    label="Nome do Estabelecimento" 
                    placeholder="Digite o nome do estabelecimento..." 
                    value={establishmentName}
                    onChangeText={setEstablishmentName}
                />

                <FormField 
                    label="Endereço" 
                    placeholder="Digite o endereço..." 
                    value={address}
                    onChangeText={setAddress}
                />

                <FormField 
                    label="Telefone" 
                    placeholder="Digite o telefone..." 
                    value={phone}
                    onChangeText={setPhone}
                />

                <TouchableOpacity onPress={handleRegister} style={{ marginTop: 15 }}>
                    <LinearGradient
                        colors={['#0052D4', '#4364F7', '#6FB1FC']} 
                        style={styles.button}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Cadastrar Estabelecimento</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const FormField = ({ label, placeholder, value, onChangeText }) => (
    <>
        <Text style={[styles.title, { fontSize: 14 }]}>{label}</Text>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholder}
                style={[styles.input, { height: 40 }]}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    </>
);
