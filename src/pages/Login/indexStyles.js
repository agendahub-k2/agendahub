import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#005BB5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    containerHeader: {
        marginBottom: 14,
        marginTop: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subMessage: {
        color: 'white',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: '5%',
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    inputContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 9,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
        borderWidth: 0,
    },
    inputError: {
        borderColor: 'red',
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007ACC',
        width: '100%',
        borderRadius: 8,
        paddingVertical: 15,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonregister: {
        marginTop: 14,
        alignSelf: 'center',
    },
    registerText: {
        color: '#a1a1a1',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputPhone: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    countryPicker: {
        marginRight: 10,
    },
    gradientButton: {
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    neonText: {
        color: '#FFFFFF',
        textShadowColor: '#00FFFF',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    alertContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 10,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    successAlert: {
        backgroundColor: '#4CAF50', // Verde para sucesso
    },
    errorAlert: {
        backgroundColor: '#f44336', // Vermelho para erro
    },
    alertText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default styles;
