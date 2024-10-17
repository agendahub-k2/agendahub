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
});

export default styles;
