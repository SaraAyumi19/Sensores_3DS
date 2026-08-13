import { View, Text, Platform, PermissionsAndroid } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { useState, useEffect } from 'react';

export default function Pedometro() {
  
  const [disponivel, setDispponivel] = useState(false);
  const [passosPassados, setPassosPassados] = useState(0);
  const [passosAtuais, setPassosAtuais] = useState(0);

  useEffect(() => {
    let inscricao = null;

    async function configurarPedometro() {
      const estaDisponivel = await Pedometer.isAvailableAsync();
      setDispponivel(estaDisponivel);

      const inicio = new Date();
      const fim = new Date();
      inicio.setDate(fim.getDate() - 1);

      let resultado;
      if (Plataforma.OS == "ios") {
        resultado = await Pedometer.getStepCountAsync(inicio, fim);

        setPassosPassados(resultado.steps);

        inscricao = Pedometer.watchStepCount((monitor) => {
          setPassosAtuais(monitor.steps);
        });
      }
      else {
        const autorizado = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
        );

        if (autorizado === PermissionsAndroid.RESULTS.GRANTED){
          inscricao = Pedometer.watchStepCount((monitor) => {
            setPassosAtuais(monitor.steps);
          })
        }

      }
    }

    configurarPedometro();

  }, []);

  function passosNoDia() {
    if (Platform.OS == "ios") {
      return <Text>Passos Hoje: {passosPassados}</Text>
    }
    else {
      <Text>Sem Contagem Anterior Disponível</Text>
    }
  }

  
  return(
    <View>
      <Text>Contador de Passos</Text>
      <View>
        <Text>Sensor Disponível: 
          { disponivel === true ? "Sim" : "Não"}
        </Text>

        {passosNoDia()}

        <Text>Passos Atuais: 
          {passosAtuais}
        </Text>
      </View>
    </View>
  );
}