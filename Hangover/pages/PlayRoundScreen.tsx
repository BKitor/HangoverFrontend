import React from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, StyleSheet, Alert } from 'react-native';
import styles from '../styles/playroundscreenstyles';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReactPolling from 'react-polling'


interface Props {
	navigation: any
}

export default class PlayRoundScreen extends React.Component<Props>{
	state = {
		game: null,
		answers: ["answer 1", "smlansr", "answer 4","a literal wall of text because"],
		responseText:null,
		player_uuid: null,
	}

	constructor(props) {
		super(props);
		this.state.game = this.props.navigation.getParams('game', null);
	}

	componentWillUnmount() {
		if (this.state.player_uuid) {
			axios.delete(`http://tixo.ca:7537/game/${this.state.game.game_name}`, { data: { player_id: this.state.player_uuid } })
				.then(() => { })
				.catch((err) => console.log(err))
		}
	}

	componentDidMount() {
		axios.get(`http://tixo.ca:7537/game/${this.state.game.game_name}/players`)
			.then((res) => {
				this.setState({
					players: res.data.slice(0, 4)
				})
			})
			.catch((res) => {
				console.log("Couldnt reach /game/<>/players")
				console.log(res.message)
				this.props.navigation.goBack()
			})
	}

	submitAnswer() {
		// if the player alredy exist, send a put to change name

		axios.put(`http://tixo.ca:7537/api/players/${this.state.player_uuid}/update`, { player_name: text })
			.then((res) => {

			})
			.catch((err) => {
				console.log(err);
			});
	}


	pollingUpdate = (res) => {
		if (res.current_question && this.state.player_uuid) {
			console.log(res.current_question)
			// This is where navigation to a next question would happen
			// this.props.navigate("question", game=this.state.game_naem)
		}
		return true
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={'position'}>
				<ImageBackground source={require('../assets/repeated-background.png')} style={styles.backgroundView}>
					<View style={styles.questionTypeContainer}>
						<Text style={styles.questionTypeText}>/*TODO: populate this text*/</Text>
					</View>

					<View style={styles.questionContainer}>
						<Text style={styles.questionText}>/*TODO: populate this text*/</Text>
					</View>

					<View style={styles.answerContainer}>

					</View>

					<View style={styles.playerResponseContainer}>
						<TextInput style={styles.submitResponseTextInput}
							maxLength={20}
							placeholder={"Answer..."}
							onChangeText={(text)=>this.setState({responseText:text})} />
						<TouchableOpacity style={styles.submitResponseButton} onPress={()=>this.submitAnswer()}>
							<Text style={styles.submitResponseButtonText}></Text>
						</TouchableOpacity>
					</View>

					{/* TODO: Replace with websocket */}
					<ReactPolling
						url={`http://tixo.ca:7537/game/${this.state.game.game_name}`}
						interval={3000}
						method={"GET"}
						onSuccess={(res) => this.pollingUpdate(res)}
						onFailure={(res) => console.log(res)}
						render={() => {
							return null
						}}
					/>

				</ImageBackground>
			</KeyboardAvoidingView>
		);
	}
}
