import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    containerHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    message: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subMessage: {
        fontSize: 16,
        color: '#999',
    },
    containerForm: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
