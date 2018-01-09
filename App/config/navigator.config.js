import { StackNavigator } from 'react-navigation'
import Main from '../Pages/Main'
import About from '../Pages/About'
import Game from '../Pages/Game'
import Rank from '../Pages/Rank'
import Setting from '../Pages/Setting'

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
    }
}, {
    initialRouteName: 'Main',
    headerMode: 'none'
    // mode: 'modal'
})
