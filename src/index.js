import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import {api} from './services/api';


export default function App() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get('tech').then(response => {
      setTechs(response.data);
    });
  }, []);

  async function handleInputData() {
    const response = await api.post('tech', {    
      name : `Nova Tecnologia ${Date.now()}`,
      description : "Descrição da tecnologia"      
    })

    const newTechs = response.data;

    setTechs([...techs, newTechs]);
  }

  return (
    <>
      <StatusBar backgroundColor="green"/>

      <SafeAreaView style={estilo.container}>
        <FlatList          
          data={techs}
          keyExtractor={techs.id}
          renderItem={({item}) => <Text style={estilo.fonteLista}>{item.name}</Text>}
        />

        <TouchableOpacity 
          activeOpacity={0.5} 
          style={estilo.botao} 
          onPress={handleInputData}
        >
          <Text style={estilo.botaoTexto}>Add Tech</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
    );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  fonte: {
    color: 'white',
  },
  fonteLista: {
    color: "white",
    fontSize: 24
  },
  botao: {
    backgroundColor: 'white',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  botaoTexto: {
    fontWeight: 'bold',
    fontSize: 16
  }
});