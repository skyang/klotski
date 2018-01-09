import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native'

const { width, height } = Dimensions.get('window')
// 以屏幕宽度为基准，华容道是一个4*5的棋盘，单位块大小为棋盘宽度的1/4
const containerWidthRatio = '96%'
// 一个单元格的像素值
let blockUnit = width * parseInt(containerWidthRatio) / 100 * 0.25

/**
 * block排放规则
 * `size`代表block所占格数
 * `type`代表block类型：
 * 1：2*2，曹操格子，只有一个；
 * 2：横向的2*1格子，为关羽，只有一个；
 * 3：纵向的1*2格子，为张飞、马超、赵云、黄忠，共4个；
 * 4：1*1的单元格，为卒，共四个；
 * `position`记录格子位置，取左上角顶点位置
 */
let blocks = [
    {
        id: 'gy',
        size: 2,
        type: 2,
        name: '关羽',
        position: [1, 2],
        color: '#bbb'
    },
    {
        id: 'cc',
        size: 4,
        type: 1,
        name: '曹操',
        position: [0, 1],
        color: '#aaa'
    },
    {
        id: 'zf',
        size: 2,
        type: 3,
        name: '张飞',
        position: [0, 0],
        color: '#ccc'
    },
    {
        id: 'zy',
        size: 2,
        type: 3,
        name: '赵云',
        position: [0, 2],
        color: '#ddd'
    },
    {
        id: 'mc',
        size: 2,
        type: 3,
        name: '马超',
        position: [3, 0],
        color: '#eee'
    },
    {
        id: 'hz',
        size: 2,
        type: 3,
        name: '黄忠',
        position: [3, 2],
        color: '#fff'
    },
    {
        id: 'z_1',
        size: 1,
        type: 4,
        name: '卒',
        position: [1, 3],
        color: '#000'
    },
    {
        id: 'z_2',
        size: 1,
        type: 4,
        name: '卒',
        position: [2, 3],
        color: '#0a0'
    },
    {
        id: 'z_3',
        size: 1,
        type: 4,
        name: '卒',
        position: [0, 4],
        color: '#00a'
    },
    {
        id: 'z_4',
        size: 1,
        type: 4,
        name: '卒',
        position: [3, 4],
        color: '#a00'
    }
]

export default class Game extends React.Component {
    static navigationOptions = {
        title: 'Game',
        gesturesEnabled: false
    }

    _makeStyle({ type, color, position }) {
        switch (type) {
            case 1:
                return {
                    position: 'absolute',
                    height: blockUnit * 2,
                    width: blockUnit * 2,
                    backgroundColor: color,
                    left: blockUnit * position[1],
                    top: blockUnit * position[0]
                }
            case 2:
                return {
                    position: 'absolute',
                    height: blockUnit,
                    width: blockUnit * 2,
                    backgroundColor: color,
                    left: blockUnit * position[0],
                    top: blockUnit * position[1]
                }
            case 3:
                return {
                    position: 'absolute',
                    height: blockUnit * 2,
                    width: blockUnit,
                    backgroundColor: color,
                    left: blockUnit * position[0],
                    top: blockUnit * position[1]
                }
            case 4:
                return {
                    position: 'absolute',
                    height: blockUnit,
                    width: blockUnit,
                    backgroundColor: color,
                    left: blockUnit * position[0],
                    top: blockUnit * position[1]
                }
        }
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <Text>Game</Text>
                <View style={styles.container}>
                    {blocks.map(block => (
                        <View
                            key={block.id}
                            style={this._makeStyle(block)}
                        >
                            <Text>
                                {block.name}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: containerWidthRatio,
        height: blockUnit * 5,
        backgroundColor: '#bbb'
    }
})
