import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

/**
 * Screens
 */
import IncidentsScreen from './screens/Incidents/incidents'
import DetailsScreen from './screens/Details/details'


const App = createStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <App.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <App.Screen
                    component={IncidentsScreen}
                    name='Incidents'/>
                <App.Screen
                    component={DetailsScreen}
                    name='Details'/>
            </App.Navigator>
        </NavigationContainer>
    )
}

export default Routes;