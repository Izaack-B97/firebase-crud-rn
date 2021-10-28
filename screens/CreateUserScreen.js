import React, { useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import firebase from '../database/firebase';

export const CreateUserScreen = ({ navigation }) => {

    const [ datos, setDatos ] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChangeText = ( name, value ) => {
        setDatos({
            ...datos,
            [ name ] : value
        });
    }

    const createUser = async () => {
        if ( datos.name === '' ) {
            alert('Necesitamos el nombre')
        } else {
            await firebase.db.collection('users').add({
                name: datos.name,
                email: datos.email,
                phone: datos.phone
            });

            navigation.navigate('UserListScreen');
        }
    }

    return (
        <SafeAreaView style={ styles.container }>
            <ScrollView style={{ ...styles.container, padding: 30, paddingTop: 70 }}>
                <Text style={ styles.title }>Create user</Text>
                <View style={ styles.inputGroup }>
                    <TextInput placeholder='Name user' onChangeText={ value => handleChangeText('name', value) } />
                </View>
                <View style={ styles.inputGroup }>
                    <TextInput placeholder='Email user' onChangeText={ value => handleChangeText('email', value) }/>
                </View>
                <View style={ styles.inputGroup }>
                    <TextInput placeholder='Phone user' onChangeText={ value => handleChangeText('phone', value) }/>
                </View>
                <View>
                    <Button title='Save user' onPress={ createUser } />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    inputGroup: {
        flex: 1, padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccccc'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20
    }
})
