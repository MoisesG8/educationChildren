import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import LoginComponent from '../components/LoginComponent';
import Tabs from './Tabs';
import Registration from '../pages/Registration';
import Header from '../components/Header';
import { firebase } from '../Firebase';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [isLogged, setIsLogged] = React.useState(true);
    const [user, setUser] = React.useState(null);
    const auth = firebase.auth();
    //Handler user state changes
    const onLogin = (user) => {
        setUser(user);
        if (isLogged) {
            setIsLogged(false);
        }
    }

    React.useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onLogin);
        return subscriber;
    }, []);

    if (isLogged) return null;

    if (!user) {
        return (
            <Stack.Navigator initialRouteName='Login' screenOptions={{ headerTransparent: true }}>
                <Stack.Screen name="Inicio de sesión" component={LoginComponent} />
                <Stack.Screen name="Registration" component={Registration} />
            </Stack.Navigator>
        )
    }


    return (
        <Stack.Navigator >
            <Stack.Screen options={{
                headerShown: false,
            }} name="Tabs" component={Tabs} />
        </Stack.Navigator>
    )
}

export default () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Navigation />
        </NavigationContainer>
    )
}