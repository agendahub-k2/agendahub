import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#005BB5',
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
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    inputContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    
    headerTitle: {
        fontSize: 20,
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
    
});

export default styles;
