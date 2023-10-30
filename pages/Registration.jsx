import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, TextInput, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../Firebase';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleContainerPress = () => {
        // Oculta el teclado
        Keyboard.dismiss();
    };

    const navigation = useNavigation();
    const auth = firebase.auth();

    const registerUser = async (email, password, firstName, lastName) => {
        if (firstName == '' || lastName == '' || email == '' || password == '') {
            return alert('Debe llenar todos los campos')
        }
        await auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                auth.currentUser.sendEmailVerification({
                    url: 'https://educationchildren-6b427.firebaseapp.com'
                })
                    .then(() => {
                        alert('Usuario registrado correctamente, revise su correo para verificar su cuenta')
                    }).catch((error) => {
                        alert("error 1 " + error.message)
                    }).then(() => {
                        firebase.firestore().collection('usuarios').doc(auth.currentUser.uid).set({
                            firstName,
                            lastName,
                            email,
                        })
                    })
                    .catch((error) => {
                        alert("error 2 " + error.message)
                    })
            })
            .catch((error) => {
                console.log(error.message)
                alert("error 3 " + error.message)
            })
    }

    return (
        <TouchableWithoutFeedback onPress={handleContainerPress}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled">

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombres</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Apellidos</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Correo Electrónico</Text>
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
                    title="Registrarse"
                    onPress={() => registerUser(email, password, firstName, lastName)}
                />
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    )
}

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

export default Registration