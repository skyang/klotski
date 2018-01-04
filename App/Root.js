import React from 'react'
import {Text, View} from 'react-native'

export default class Root extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <View>
                <Text>Root</Text>
                <Text>{this.props.title}</Text>
            </View>
        )
    }
}
