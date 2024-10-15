import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E8F5FE',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#3B82F6',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#3B82F6',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: {
    fontSize: 16,
  },
  createAccountButton: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
});

export default styles;
