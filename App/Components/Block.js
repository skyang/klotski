import React from 'react'
import {
    View,
    Text,
    Dimensions
} from 'react-native'
import { assign } from 'lodash'

const { width, height } = Dimensions.get('window')
// 以屏幕宽度为基准，华容道是一个4*5的棋盘，单位块大小为棋盘宽度的1/4
const containerWidthRatio = '96%'
// 一个单元格的像素值
let blockUnit = width * parseInt(containerWidthRatio) / 100 * 0.25

export default class Block extends React.Component {
    constructor (props) {
        super(props)
        console.log(props)
    }

    _makeStyle ({ type, color, position }) {
        const baseStyle = {
            position: 'absolute',
            backgroundColor: color,
            left: blockUnit * position[0],
            top: blockUnit * position[1]
        }
        switch (type) {
            case 1:
                return assign(baseStyle, {
                    height: blockUnit * 2,
                    width: blockUnit * 2
                })
            case 2:
                return assign(baseStyle, {
                    height: blockUnit,
                    width: blockUnit * 2
                })
            case 3:
                return assign(baseStyle, {
                    height: blockUnit * 2,
                    width: blockUnit
                })
            case 4:
                return assign(baseStyle, {
                    height: blockUnit,
                    width: blockUnit
                })
        }
    }

    _onPress () {
        console.log('on press')
        this.props.onMove(111)
    }

    render () {
        return (
            <View
                style={this._makeStyle(this.props.block)}
                onPress={this._onPress.bind(this)}
            >
                <Text onPress={this._onPress.bind(this)}>
                    {this.props.block.name}
                </Text>
            </View>
        )
    }
}
