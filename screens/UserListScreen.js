import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Avatar, Button, ListItem } from 'react-native-elements';

import firebase from '../database/firebase';

export const UserListScreen = ({ navigation, route }) => {
    
    const [ user, setUser ] = useState( route.params.user );
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => users.push({ id: doc.id ,...doc.data() }) );
            setUsers( users );
        });
    }, [])

    const handleLogOut = async () => {
        try {
            await firebase.auth.signOut();
            navigation.replace('LoginScreen');
        } catch (error) {
            alert( error.message )
        }
    }

    return (
        <SafeAreaView style={ styles.container }>
            <View style={{ marginHorizontal: 20 }}>
                <View style={ styles.containerHeader }>
                    <Text style={ styles.title }>User list</Text>
                    <TouchableOpacity onPress={ handleLogOut }>
                        <Text style={ styles.btnLogOut }>Logout</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ ...styles.title, fontSize: 18}}>Welcome { user.email }!</Text>
                <View style={ styles.topSeparation }>
                    <Button title="Crear usuario" type="outline" onPress={ () => navigation.navigate('CreateUserScreen') } />
                </View>
            </View>
            {
                users.length === 0 
                ? (
                    <View style={[ styles.container, styles.loading ]}>
                        <ActivityIndicator size={ 60 } color='blue'/>
                    </View>
                )
                : (
                    <ScrollView style={[ styles.scrollView, styles.topSeparation ]}>
                        {
                            users.map(user => (
                                <TouchableOpacity 
                                    key={ user.id } 
                                    activeOpacity={ 0.5 }
                                    onPress={() => navigation.navigate('UserDetailScreen', { user })}
                                >
                                    <ListItem topDivider>
                                        <Avatar
                                            source={{ uri: 'https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg' }}
                                            rounded
                                        />
                                        <ListItem.Content>
                                            <ListItem.Title>{user.name}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>   
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    containerHeader: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
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
    btnLogOut: {
        fontSize: 15,
        color: 'red'
    }
})
