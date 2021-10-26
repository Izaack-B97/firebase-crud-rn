import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export const UserDetailScreen = ({ route }) => {
    const [ userDetail, setUserDetails ] = useState( null );
    
    useEffect(() => {
        const { params } = route;
        console.log( params.user );
        setUserDetails( params.user );
    }, [])

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.title }>User details</Text>
            <ScrollView style={[ styles.scrollView, styles.topSeparation ]}>
                <Text>{ userDetail && JSON.stringify( userDetail ) }</Text>
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