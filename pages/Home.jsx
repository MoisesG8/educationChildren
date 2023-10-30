import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Audio } from 'expo-av';
import numeros from '../utils/DataNumeros';

export default function Home() {
    const [sound, setSound] = React.useState();

    async function playSound(urlSonido) {
        console.log('Loading Sound');
        console.log('nombres archivos ', urlSonido);
        const path = '../assets/sounds/' + urlSonido;
        console.log('path', path);
        const { sound: newSound } = await Audio.Sound.createAsync(
            urlSonido
        );

        setSound(newSound);

        console.log('Playing Sound');
        await newSound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <ScrollView style={{ marginTop: 10 }}>
            {numeros.map((numero, index) => {
                console.log("URLs de los sonidos ", numero.sonido);
                return (
                    <Card key={index}>
                        <Card.Title>Número {numero.numero} </Card.Title>
                        <Card.Divider />
                        <Card.Image source={numero.imagen} style={{ width: '92%', aspectRatio: 1 }} resizeMode="contain"></Card.Image>
                        <Card.Divider />
                        <Button title="Reproducir" onPress={() => playSound(numero.sonido)} />
                    </Card>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerGeneral: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
});
