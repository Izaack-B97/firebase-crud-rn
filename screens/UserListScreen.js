import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Avatar, Button, ListItem } from 'react-native-elements';

import firebase from '../database/firebase';

export const UserListScreen = ({ navigation }) => {

    const [ users, setUsers ] = useState([]);
    
    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => users.push({ id: doc.id ,...doc.data() }) );
            setUsers( users );
        });
    }, [])

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.title }>User list</Text>
            <View style={ styles.topSeparation }>
                <Button title="Crear usuario" type="outline" onPress={ () => navigation.navigate('CreateUserScreen') } />
            </View>
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
    }
})
