import { View, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key]; 
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    // Definindo ícones atualizados com base no nome da rota
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = 'home-outline'; // Ícone atualizado para Home
                            break;
                        case 'HomeProvider':
                            iconName = 'storefront'; // Ícone atualizado para HomeProvider
                            break;
                        case 'Agenda':
                            iconName = 'calendar'; // Ícone atualizado para Agenda
                            break;
                        case 'Perfil':
                            iconName = 'account'; // Ícone atualizado para Perfil
                            break;
                        default:
                            iconName = 'home-outline'; // Ícone padrão
                    }

                    return (
                        <TouchableOpacity
                            key={route.key} 
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.buttonTab}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: isFocused ? '#87CEFA' : '#fff' }]}>
                                <MaterialCommunityIcons
                                    name={iconName} 
                                    size={24} // Tamanho do ícone
                                    color="#000" // Mantém a cor do ícone preta
                                />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20, // Distância do fundo da tela
        left: 20, 
        right: 20, 
        backgroundColor: "white", // Barra flutuante
        borderRadius: 99, 
        elevation: 10, // Sombra para Android
        shadowColor: '#000', // sombra para iOS
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,  
        shadowRadius: 3.80, 
        paddingVertical: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        alignItems: 'center',
    },
    buttonTab: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50, 
        height: 50, 
        borderRadius: 25,
    },
});
