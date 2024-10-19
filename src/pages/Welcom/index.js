import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './indexStyles';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {
    const navigation = useNavigation();
    const animRef = useRef(null);

    const handleNavigation = (screen) => {
        // Faz o fadeOut e navega para a tela especificada
        animRef.current.fadeOut(600).then(() => {
            navigation.navigate(screen);
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            // Animação de fadeIn quando a tela é focada
            animRef.current.fadeIn();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../../assets/Logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            
            <Animatable.View 
                ref={animRef} 
                delay={600} 
                animation="fadeInUp" 
                style={styles.containerForm}
            >
                <Text style={styles.title}>SEJA BEM-VINDO(A)!</Text>
                <Text style={styles.text}>
                    Monitore, planeje e organize seu dia a dia para alcançar seus objetivos e transformar seu futuro.
                    Entre para fazer seu login ou cadastre-se.
                </Text>
                
                <View style={styles.buttonContainer}>
                    <LinearGradient 
                        colors={['#0052D4', '#4364F7', '#6FB1FC']} 
                        style={styles.button}
                    >
                        <TouchableOpacity 
                            onPress={() => handleNavigation('Login')}
                        >
                            <Text style={styles.buttonText}>ENTRAR</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    
                    <LinearGradient 
                        colors={['#0052D4', '#4364F7', '#6FB1FC']} 
                        style={[styles.button, styles.registerButton]}
                    >
                        <TouchableOpacity 
                            onPress={() => handleNavigation('Register')}
                        >
                            <Text style={styles.buttonText}>CADASTRE-SE</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </Animatable.View>
        </View>
    );
}
