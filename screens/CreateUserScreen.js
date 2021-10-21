import React, { useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import firebase from '../database/firebase';

export const CreateUserScreen = () => {
    
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
    

    const createUser = () => {
        console.log( datos );
        console.log( firebase );
    }

    return (
        <SafeAreaView style={ styles.container }>
            <ScrollView style={{ ...styles.container, padding: 30, paddingTop: 70 }}>
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
    },
    inputGroup: {
        flex: 1, padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccccc'
    }
})
