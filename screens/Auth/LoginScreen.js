import React, { useEffect, useState } from 'react'

import { View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import firebase from '../../database/firebase'; 

const initialState = {
    email: '',
    password: ''
};

export const LoginScreen = ({ navigation }) => {

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user =>{
            if ( user ) {
                // console.log( user );
                navigation.reset({
                    index: 0,
                    routes: [{ name: "UserListScreen", params: { user } }]
                });
            }
        });
        return unsubscribe;
    }, [])

    const [ data, setData ] = useState( initialState );

    const { email, password } = data;

    const onHandleChangeText = ( name, value ) => {
        setData({ ...data, [ name ]: value });
    };

    const handleSingIn = async () => {
        try {
            const userCredentials = await firebase.auth.signInWithEmailAndPassword( email, password );
            alert( 'Logged in' );
            console.log( userCredentials );
            setData( initialState );
        } catch (error) {
            alert( error.message )
        }
    }

    const handleSingUp = async () => {
        try {
            const userCredentials = await firebase.auth.createUserWithEmailAndPassword( email, password );
            alert( 'User registered' );
            console.log( userCredentials );
            setData( initialState );
        } catch (error) {
            alert( error.message )
        }
    }

    return (
        <View
            style={ styles.container }
        >
            <View style={ styles.inputContainer }>
                <TextInput 
                    placeholder='Email'
                    onChangeText={ value => onHandleChangeText( 'email' , value ) }
                    style={ styles.input }
                />
                <TextInput
                    placeholder='Password'
                    onChangeText={ value => onHandleChangeText( 'password' , value ) }
                    style={ styles.input }
                    secureTextEntry
                />
            </View>
            <View style={ styles.buttonContainer }>
                <TouchableOpacity
                    onPress={ handleSingIn }
                    style={[ styles.button ]}
                >
                    <Text style={ styles.buttonText } >Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ handleSingUp }
                    style={[ styles.button, styles.buttonOutline ]}
                >
                    <Text style={ styles.buttonOutlineText } >Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: '#ffffff',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 1
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    }

})
