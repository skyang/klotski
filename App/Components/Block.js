import React from 'react'
import {
    View,
    Text,
    Dimensions,
    PanResponder
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
        this._updateNativeStyles = this._updateNativeStyles.bind(this)
    }

    panBlock = {};
    _panResponder = {};
    _panStyles = {};
    _initLeft = 10;
    _initTop = 10;

    _makeStyle ({ type, color, position }) {
        const baseStyle = {
            position: 'absolute',
            backgroundColor: color
            // left: blockUnit * position[0],
            // top: blockUnit * position[1]
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

    _updateNativeStyles () {
        console.info('update native style')
        this.panBlock && this.panBlock.setNativeProps(this._panStyles);
    }

    _handlePanResponderGrant (e, gestureState) {
        console.log('start move')
        console.log(e, gestureState)
        this.props.onStartMove(this.props.block)
    }

    _handlePanResponderMove (e, gestureState) {
        console.log('on move')
        this._panStyles.style.left = this._initLeft + gestureState.dx;
        this._panStyles.style.top = this._initTop + gestureState.dy;
        this._updateNativeStyles();
    }

    _handlePanResponderEnd (e, gestureState) {
        console.log('end move')
        this._initLeft += gestureState.dx;
        this._initTop += gestureState.dy;
        // this._panStyles.style.left = this._initLeft;
        // this._panStyles.style.top = this._initTop;
        // this._initLeft = 50;
        // this._initTop = 50;
        // this._updateNativeStyles();
    }

    componentWillMount () {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
        })
        this._initLeft = blockUnit * this.props.block.position[0]
        this._initTop = blockUnit * this.props.block.position[1]
        this._panStyles = {
            style: {
                left: this._initLeft,
                top: this._initTop
            }
        }
        console.log('pan style:', this._panStyles)
    }

    componentDidMount () {
        this._updateNativeStyles();
    }

    render () {
        return (
            <View
                ref={(panBlock) => {
                    this.panBlock = panBlock
                }}
                style={this._makeStyle(this.props.block)}
                {...this._panResponder.panHandlers}
            >
                <Text>
                    {this.props.block.name}
                </Text>
            </View>
        )
    }
}
