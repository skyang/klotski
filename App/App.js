import React from 'react'
import Root from './Root'
import { StyleSheet, View } from 'react-native'

export default class App extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                <Root
                    title="aaaa"
                ></Root>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
