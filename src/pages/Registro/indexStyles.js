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
    error: '#ff4444', // Cor para mensagens de erro
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
        marginBottom: sizes.baseMargin,
        marginTop: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: sizes.largeFontSize,
        fontWeight: 'bold',
        color: colors.textLight,
    },
    containerForm: {
        backgroundColor: colors.background,
        flex: 1,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingStart: '5%',
        paddingEnd: '5%',
        paddingBottom: sizes.mediumMargin,
    },
    title: {
        fontSize: sizes.mediumFontSize,
        marginTop: sizes.smallMargin,
    },
    inputContainer: {
        backgroundColor: colors.border,
        borderRadius: 10,
        marginBottom: sizes.baseMargin,
        paddingHorizontal: 9,
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
    eyeIcon: {
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: colors.secondary,
        width: '100%',
        borderRadius: 8,
        paddingVertical: 15,
        marginTop: sizes.baseMargin,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.textLight,
        fontSize: sizes.smallFontSize,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    buttonRegister: {
        marginTop: sizes.baseMargin,
        alignSelf: 'center',
        marginTop: sizes.mediumMargin,
    },
    registerText: {
        color: colors.registerText,
        alignItems: 'center',
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
    gradientButton: {
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: sizes.baseMargin,
    },
    picker: {
        height: 50,
        width: 100,
    },
    inputPhone: {
        flex: 1,
        padding: 10,
        color: colors.textDark,
        textAlign: 'justify',
        fontSize: sizes.smallFontSize,
    },
    neonText: {
        color: colors.textLight,
        textShadowColor: '#00FFFF',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    alertContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.error,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 5,
        zIndex: 1000,
    },
    alertText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Estilo para o checkbox e a caixinha de "Provedor"
    providerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: sizes.mediumMargin,
        padding: sizes.baseMargin,
        backgroundColor: 'linear-gradient(135deg, #6FB1FC, #4364F7)', // Gradiente azul
        borderRadius: 50, // Bordas arredondadas
        shadowColor: '#000', // Sombra
    },
    providerCheckbox: {
        marginRight: sizes.baseMargin,
        padding: sizes.smallMargin,
        borderRadius: 50, // Formato circular
        backgroundColor: '#fff', // Fundo branco para o checkbox
        shadowColor: '#000', // Sombra para o checkbox
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    // Estilo para mensagens de erro nos campos
    errorText: {
        color: colors.error,
        fontSize: sizes.smallFontSize,
        marginTop: 5,
    },
});

export default styles;
