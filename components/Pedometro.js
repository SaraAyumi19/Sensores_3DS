import { View, Text, Platform, PermissionsAndroid } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { useState, useEffect } from 'react';

export default function Pedometro() {
  
  const [disponivel, setDispponivel] = useState(false);
  const [passosPassados, setPassosPassados] = useState(0);
  const [passosAtuais, setPassosAtuais] = useState(0);

  useEffect(() => {
    let inscricao = null;

    async function consiguraPedometro() {
      
    }
  }, []);

  
  return(
    <View>
      <Text>Tela do Pedômetro</Text>
    </View>
  );
}