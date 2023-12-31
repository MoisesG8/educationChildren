import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Vocales from '../pages/Vocales';
import Home from '../pages/Home';
import Preguntas from '../pages/Preguntas';
import { Ionicons, Octicons, FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Números" component={Home} options={{
                headerShown: true,
                headerBackground: () => <Header screenName="Números" sesionIniciada={true} />,
                tabBarIcon: ({ color, size }) => (
                    <Octicons name="number" size={size} color="black" />
                )
            }} />
            <Tab.Screen name="Vocales" component={Vocales} options={{
                headerShown: true,
                headerBackground: () => <Header screenName="Vocales" sesionIniciada={true} />,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="library" size={size} color="black" />
                )
            }} />
            <Tab.Screen name="Preguntas" component={Preguntas} options={{
                headerShown: true,
                headerBackground: () => <Header screenName="Preguntas" sesionIniciada={true} />,
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="question" size={24} color="black" />
                )
            }} />
        </Tab.Navigator>
    )
}

export default Tabs