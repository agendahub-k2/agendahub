import { StyleSheet } from 'react-native';

const colors = {
    primary: '#005BB5',
    secondary: '#007ACC',
    background: '#fff',
    textLight: '#fff',
    textDark: '#333',
    placeholder: '#999',
    border: '#f0f0f0',
    registerText: '#a1a1a1',
};

const sizes = {
    baseMargin: 10,
    smallMargin: 5,
    mediumMargin: 20,
    largeFontSize: 28,
    mediumFontSize: 18,
    smallFontSize: 16,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    containerHeader: {
        marginVertical: sizes.baseMargin,
        paddingHorizontal: '5%',
    },
    message: {
        fontSize: sizes.largeFontSize,
        fontWeight: 'bold',
        color: colors.textLight 
    },
    containerForm: {
        flex: 1,
        backgroundColor: colors.background,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: sizes.baseMargin,
    },
    title: {
        fontSize: sizes.mediumFontSize,
        marginTop: sizes.smallMargin,
    },
    inputContainer: {
        backgroundColor: colors.border,
        borderRadius: 10,
        marginBottom: sizes.baseMargin,
        paddingHorizontal: 10,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: sizes.smallFontSize,
        color: colors.textDark,
    },
    button: {
        backgroundColor: colors.secondary,
        // width: '100%',
        borderRadius: 8,
        // paddingVertical: 20,
        // marginTop: sizes.mediumMargin,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.textLight,
        fontSize: sizes.smallFontSize,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    headerTitle: {
        fontSize: sizes.mediumFontSize,
        marginLeft: 16,
        fontWeight: 'bold',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: sizes.baseMargin,
    },
    picker: {
        height: 50,
        width: 150, // Ajustado para maior flexibilidade
    },
    neonText: {
        color: colors.textLight,
        textShadowColor: '#00FFFF',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: sizes.baseMargin,
    },
    addressInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.background,
        marginRight: 10,
    },
    houseNumberInput: {
        width: 80,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.background,
    },
    
    alertContainer: {
        position: 'absolute',
        top: 5, 
        left: 0,
        right: 0,
        backgroundColor: '#ff4444',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        elevation: 5,
        zIndex: 1000, // Adicionei zIndex para garantir que apareça acima de outros componentes//
    },
    alertText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;
