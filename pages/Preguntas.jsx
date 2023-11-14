import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, ScrollView } from 'react-native'
import { Card, Divider, Text } from 'react-native-elements';
import { Audio } from 'expo-av';
import { Button } from '@rneui/themed';
import { respuestaLetras, respuestasNumeros } from '../utils/DataRespuestas';
import { preguntasLetras, preguntasNumeros } from '../utils/DataPreguntas';
import { AntDesign } from '@expo/vector-icons';

export default function Preguntas() {

    // Declare a state variable to hold the sound
    const [sound, setSound] = React.useState();

    // Declare an async function to play the sound
    async function playSound(urlSonido) {
        console.log('Loading Sound');
        console.log('urlSonido', urlSonido);
        // Create a new sound object
        const { sound } = await Audio.Sound.createAsync(
            urlSonido
        );
        // Store the sound in the state variable
        setSound(sound);

        console.log('Playing Sound');
        // Play the sound
        await sound.playAsync();
    }

    // Declare a function to unload the sound
    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


    const evaluarRespuesta = (pregunta, respuesta) => {
        if (pregunta.idRespuestaCorrecta == respuesta) {
            alert('Respuesta correcta')
        } else {
            alert('Respuesta incorrecta')
        }
    }


    return (
        <ScrollView style={{ marginTop: 10 }}>
            {preguntasLetras.map((pregunta, index) => {

                return (

                    <Card key={index}>
                        <Card.Title>{pregunta.textoPregunta} </Card.Title>
                        <Card.Divider />
                        <Button onPress={() => playSound(pregunta.preguntaAudio)} buttonStyle={styles.button}>
                            <AntDesign name="sound" size={30} color="white" />
                        </Button>
                        <Card.Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                respuestaLetras.map((respuesta, index1) => {
                                    /*if (pregunta.idPregunta == respuesta.id) {
                                        respuestas = [respuesta.respuesta1, respuesta.respuesta2, respuesta.respuesta3]
                                        respuestasId = respuesta.id;
                                    }*/
                                    return (
                                        <Button key={index1} title={respuesta.respuesta} color={'success'} buttonStyle={styles.button} onPress={() => evaluarRespuesta(pregunta, respuesta.id)} />
                                    )
                                })
                            }
                        </View>
                    </Card>
                )
            })}
            <Divider style={{ textAlign: 'center', marginHorizontal: 10 }} />
            <Text h1={true} style={{ textAlign: 'center' }}>Preguntas de números</Text>
            <Divider style={{ textAlign: 'center', marginHorizontal: 10 }}></Divider>
            {
                preguntasNumeros.map((pregunta, index) => {

                    return (

                        <Card key={index}>
                            <Card.Title>{pregunta.textoPregunta} </Card.Title>
                            <Card.Divider />
                            <Button onPress={() => playSound(pregunta.preguntaAudio)} buttonStyle={styles.button}>
                                <AntDesign name="sound" size={30} color="white" />
                            </Button>
                            <Card.Divider />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    respuestasNumeros.map((respuesta, index1) => {
                                        return (
                                            <Button key={index1} title={respuesta.respuesta} color={'success'} buttonStyle={styles.button} onPress={() => evaluarRespuesta(pregunta, respuesta.id)} />
                                        )
                                    })
                                }
                            </View>
                        </Card>
                    )
                })
            }
        </ScrollView>

    )
}

const styles = {
    button: {
        marginHorizontal: 5,
        marginVertical: 10, // Ajusta este valor según sea necesario
    },
};

