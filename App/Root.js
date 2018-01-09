import React from 'react'
import { Text, View } from 'react-native'

export default class Root extends React.Component {
    static get defaultProps () {
        return {
            title: '1111'
        }
    }

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
