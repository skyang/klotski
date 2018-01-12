import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    Modal,
    StyleSheet,
    Picker,
    TextInput,
    PanResponder,
    Switch
} from 'react-native';

export default class MyComponent extends Component {
    state = {
        modalVisible: false,
        switchValue: true,
        text: '1111'
    };

    pan = {};
    _panResponder = {};
    _panStyles = {};
    _prevLeft = 10;
    _prevTop = 10;

    constructor() {
        super()
        this._updateNativeStyles = this._updateNativeStyles.bind(this)
    }

    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
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
        console.log(e, gestureState)
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        })
        console.log('pan style:', this._panStyles)
        this._prevLeft = 10
        this._prevTop = 10
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
            <View style={styles.container}>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <Text>This is content inside of modal component</Text>
                            <Button
                                onPress={() => this.closeModal()}
                                title="Close modal"
                            >
                            </Button>
                        </View>
                    </View>
                </Modal>
                <Button
                    onPress={() => this.openModal()}
                    title="Open modal"
                />
                <Picker
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                    <Picker.Item label="Java" value="java"/>
                    <Picker.Item label="JavaScript" value="js"/>
                </Picker>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <Switch
                    value={this.state.switchValue}
                    onValueChange={(switchValue) => this.setState({ switchValue })}
                ></Switch>
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
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
    gestureContainer: {
        // position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: '#808'
    }
});