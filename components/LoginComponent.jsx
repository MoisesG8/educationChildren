import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../Firebase';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const auth = firebase.auth();
    const handleContainerPress = () => {
        // Oculta el teclado
        Keyboard.dismiss();
    };


    const LoginUSer = async () => {

        if (email == '' || password == '') {
            return alert('Debe ingresar usuario y contraseña')
        }
        await auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user.email);
        }).then(() => {
            setPassword('');
            setEmail('');
            Keyboard.dismiss();
            navigation.navigate('Tabs');
        }).catch((error) => {
            alert("Usuario o contraseña incorrecta");
        });
    };

    return (
        <TouchableWithoutFeedback onPress={handleContainerPress}>

            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Usuario</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry
                    />
                </View>
                <Button
                    style={styles.button}
                    title="Iniciar sesión"
                    onPress={LoginUSer}
                />
                <Button
                    style={styles.button}
                    title="Registrate"
                    onPress={() => navigation.navigate('Registration')}
                />
            </KeyboardAwareScrollView>

        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerGeneral: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: 250,
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    input: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: 250,
        height: 40,
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 10,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
    },
});

export default LoginComponent;
