import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { UserListScreen } from '../screens/UserListScreen';
import { UserDetailScreen } from '../screens/UserDetailScreen';
import { CreateUserScreen } from '../screens/CreateUserScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="UserListScreen" component={ UserListScreen } />
            <Stack.Screen name="UserDetailScreen" component={ UserDetailScreen } />
            <Stack.Screen name="CreateUserScreen" component={ CreateUserScreen } />
        </Stack.Navigator>        
    )
}
