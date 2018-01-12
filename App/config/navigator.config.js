import { StackNavigator } from 'react-navigation'
import Main from '../Pages/Main'
import About from '../Pages/About'
import Game from '../Pages/Game'
import Rank from '../Pages/Rank'
import Setting from '../Pages/Setting'
import Test from '../Pages/Test'
import TestPanResonder from '../Pages/TestPanResonder'

export default StackNavigator({
    Main: {
        screen: Main
    },
    About: {
        screen: About,
        navigationOptions: {
            headerTitle: 'About',
        }
    },
    Game: {
        screen: Game
    },
    Rank: {
        screen: Rank
    },
    Setting: {
        screen: Setting
    },
    Test: {
        screen: Test
    },
    TestPanResonder: {
        screen: TestPanResonder
    },
}, {
    initialRouteName: 'Game',
    headerMode: 'none'
    // mode: 'modal'
})
