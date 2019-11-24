import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import {AppLoading} from "expo";
import SplashScreen from './pages/SplashScreen';
import HomeScreen from "./pages/HomeScreen"
import WarningScreen from './pages/WarningScreen';
import SignUpScreen from "./pages/SignUpScreen";
import LogInScreen from "./pages/LogInScreen";
import ProfileScreen from "./pages/ProfileScreen";
import CreateQuizScreen from "./pages/CreateQuizScreen";
import MakeNewQuizScreen from "./pages/MakeNewQuizScreen";
import SavedQuizzesScreen from "./pages/SavedQuizzesScreen";
import * as Font from "expo-font";



export default class App extends React.Component {
    state = {fontLoaded: false};

    componentDidMount(){
        Font.loadAsync({
            FrancoisOne: require('./assets/fonts/FrancoisOne-Regular.ttf')
        }).then(() => {
            this.setState({fontLoaded: true});
        });
    }

    render() {
        if(this.state.fontLoaded)
            return (
                <AppContainer/>
            );
        else
            return (
                <AppLoading/>
            );
    }
}

const AppNavigator = createStackNavigator(
  {
      Splash: SplashScreen,
      Warning: WarningScreen,
      Home: HomeScreen,
      SignUp: SignUpScreen,
      LogIn: LogInScreen,
      Profile: ProfileScreen,
      CreateQuiz: CreateQuizScreen,
      MakeNewQuiz: MakeNewQuizScreen,
      SavedQuizzes: SavedQuizzesScreen
  },
    {
        initialRouteName: 'Splash',
        headerMode: "none",
    });


const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});