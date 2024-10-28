import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007ACC', 
        justifyContent: 'center',
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        paddingBottom: 80,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
        color: '#005BB5', 
    },
    text: {
        color: '#003F73', 
        marginBottom: 30,
        lineHeight: 20,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007ACC', 
        borderRadius: 10,
        paddingVertical: 25,
        width: '100%',
        marginBottom: 15,
    },
    registerButton: {
        backgroundColor: '#69B7E2', 
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
    },
    logo: {
        width: 500,
        height: 600,
    },
});

export default styles;
