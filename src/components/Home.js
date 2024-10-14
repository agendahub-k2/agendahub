import React from 'react';
import { View, Button } from 'react-native';

function Home({ navigation }) {
  const handleNavigate = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <Button title="Deslogar" onPress={handleNavigate} />
    </View>
  );
}

export default Home;
