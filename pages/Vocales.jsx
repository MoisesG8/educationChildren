import * as React from 'react';
import { Button, Card } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import letras from '../utils/DataLetras';

// Declare the component
const Vocales = () => {
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

    // Render the component
    return (
        // Render the ScrollView
        <ScrollView style={{ marginTop: 10 }}>
            {letras.map((letra, index) => {
                return (
                    // Render a card for each letter
                    <Card key={index}>
                        <Card.Title>Letra {letra.letraMayuscula}  {letra.letraMinuscula}</Card.Title>
                        <Card.Divider />
                        <Card.Image source={letra.imagen} style={{ width: '92%', aspectRatio: 1 }} resizeMode="cover"></Card.Image>
                        <Card.Divider />
                        <Button title="Reproducir" onPress={() => playSound(letra.sonido)} />
                    </Card>
                )
            }
            )}
        </ScrollView>

    )
}

export default Vocales;

