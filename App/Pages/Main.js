import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

export default class Game extends React.Component {
    static navigationOptions = {
        title: 'Main'
    }

    goPage(routerName) {
        const { navigate } = this.props.navigation
        navigate(routerName)
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.goPage.bind(this, 'Game')}
                    title="开始游戏"
                ></Button>
                <Button
                    onPress={this.goPage.bind(this, 'Game')}
                    title="自定义游戏"
                ></Button>
                <Button
                    onPress={this.goPage.bind(this, 'Rank')}
                    title="排行榜"
                ></Button>
                <Button
                    onPress={this.goPage.bind(this, 'Setting')}
                    title="设置"
                ></Button>
                <Button
                    onPress={this.goPage.bind(this, 'About')}
                    title="关于"
                ></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444'
    }
})
