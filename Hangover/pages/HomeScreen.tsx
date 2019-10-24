import axios from 'axios';
import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: []
        };
    };

    componentDidMount() {
        axios.get("http://192.168.1.124:8000/users/")
            .then(res => this.setState({
                isLoaded: true,
                users: res.data
            }))
            .catch(error => this.setState({
                error,
                isLoaded: true
            }))
    }

    render() {
        const { error, isLoaded, users } = this.state;
        if (error) {
            return <Text>{error.message}</Text>
        } else if (!isLoaded) {
            return <Text>Loading...</Text>
        };

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Loaded</Text>

                <FlatList data={users} renderItem={({ item }) => (
                    <View>
                        <Text>{item.uuid}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.username}</Text>
                    </View>
                )} />

            </View>
        );
    }
}