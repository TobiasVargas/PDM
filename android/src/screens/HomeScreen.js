import React from 'react';
import {Text, StyleSheet} from 'react-native';

class HomeScreen extends React.Component{
    render(){
        return <Text style={styles.text}>HomeScreen</Text>;
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
    }
});

export default HomeScreen;