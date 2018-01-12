import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    PanResponder
} from 'react-native';

export default class MyComponent extends Component {
    pan = {};
    _panResponder = {};
    _panStyles = {};
    _prevLeft = 10;
    _prevTop = 10;

    constructor() {
        super()
        this._updateNativeStyles = this._updateNativeStyles.bind(this)
    }
    _highlight() {
        this._panStyles.style.backgroundColor = 'blue';
        this._updateNativeStyles();
    }

    _unHighlight() {
        this._panStyles.style.backgroundColor = 'green';
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        console.info('update native style')
        this.pan && this.pan.setNativeProps(this._panStyles);
    }

    _handlePanResponderGrant(e, gestureState) {
        console.log(e, gestureState)
    }

    _handlePanResponderMove(e, gestureState) {
        console.log(this._panStyles)
        this._panStyles.style.left = this._prevLeft + gestureState.dx;
        this._panStyles.style.top = this._prevTop + gestureState.dy;
        this._updateNativeStyles();
    }

    _handlePanResponderEnd(e, gestureState) {
        this._prevLeft += gestureState.dx;
        this._prevTop += gestureState.dy;
    }

    componentWillMount() {
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
        console.log('pan style:', this._panStyles)
        this._prevLeft = 50
        this._prevTop = 50
        this._panStyles = {
            style: {
                left: this._prevLeft,
                top: this._prevTop
            }
        }
    }

    componentDidMount() {
        console.log(this._panStyles)
        this._updateNativeStyles();
    }

    render() {
        return (
            <View>
                <View
                    ref={(pan) => {
                        this.pan = pan
                    }}
                    style={styles.gestureContainer}
                    {...this._panResponder.panHandlers}
                ></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gestureContainer: {
        // position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: '#808'
    }
});