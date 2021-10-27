import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import firebase from '../database/firebase';

export const UserDetailScreen = ({ navigation, route }) => {

    const [ datos, setDatos ] = useState({
        id: '',
        name: '',
        email: '',
        phone: ''
    });

    const handleChangeText = ( name, value ) => {
        setDatos({
            ...datos,
            [ name ] : value
        });
    };

    const updateUser = async () => {
        await firebase.db.collection('users').doc( datos.id ).set({
            name: datos.name,
            email: datos.email,
            phone: datos.phone
        });
        alert('User updated');
        navigation.navigate('UserListScreen');
    };

    const deleteUser = async () => {
        try {
            await firebase.db.collection('users').doc( datos.id ).delete();
            alert('User deleted');
            navigation.navigate('UserListScreen');
        } catch (error) {
            alert('No fue posible eliminar', error);
        }    
    }

    const openConfirmationAlert = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure do you want to delete this user?', 
            [
                { text: 'Yes', onPress: () => deleteUser() },
                { text: 'No', onPress: () => console.log('Cancelado') }
            ]
        )
    }

    useEffect(() => {
        const { params } = route;
        setDatos( params.user );
    }, []);

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.title }>User details</Text>
            <ScrollView style={[ styles.scrollView, styles.topSeparation ]}>
                <View style={ styles.inputGroup }>
                    <TextInput placeholder='Name user'  value={ datos.id } editable={ false }/>
                </View>
                <View style={ styles.inputGroup }>
                    <TextInput placeholder='Name user' onChangeText={ value => handleChangeText('name', value) } value={ datos.name } />
                </View>
                <View style={ styles.inputGroup }>
                    <TextInput placeholder='Email user' onChangeText={ value => handleChangeText('email', value) } value={ datos.email }/>
                </View>
                <View style={ styles.inputGroup }>
                    <TextInput placeholder='Phone user' onChangeText={ value => handleChangeText('phone', value) } value={ datos.phone } />
                </View>
                <View>
                    <Button title='Update user' buttonStyle={{ backgroundColor: 'green', marginBottom: 5 }} onPress={ updateUser } />
                    <Button title='Delete user' buttonStyle={{ backgroundColor: 'red' }} onPress={ openConfirmationAlert } />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1
    },
    scrollView: {
        flex: 1,
    },
    topSeparation: {
        marginTop: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25
    },
    inputGroup: {
        flex: 1, padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccccc'
    }
})