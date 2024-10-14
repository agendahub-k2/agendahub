import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16, 
  },
  formContainer: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? '60%' : '90%', 
    backgroundColor: '#fff',
    padding: 24, 
    borderRadius: 12, 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20, 
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: 'rgb(62, 62, 219)',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20, 
    paddingHorizontal: 16, 
    borderRadius: 8,
    width: '100%',
    fontSize: 16, 
    backgroundColor: '#fafafa', 
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14, 
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20, 
    fontWeight: 'bold',
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20, 
  },
  alertBox: {
    width: Platform.OS === 'web' ? '30%' : '80%', 
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5, 
  },
  alertText: {
    fontSize: 20, 
    marginBottom: 24,
    textAlign: 'center', 
  },
  closeButton: {
    fontSize: 18,
    color: '#007BFF',
    fontWeight: 'bold', 
  },
  createAccountButton: {
    fontSize: 16,
    color: 'blue', 
  }, textButton: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
});

export default styles;
