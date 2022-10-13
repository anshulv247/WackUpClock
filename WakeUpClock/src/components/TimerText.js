import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default class TimerText extends Component {

  render() {
    const { minutesLong, ...rest } = this.props;

    const hours = Math.floor(minutesLong / 60);
    const minutes = minutesLong - hours * 60;

    return (
      <View {...rest}>
        <View style={styles.timerContainer}>
          <Text style={styles.time}>{hours}</Text>
          <Text style={styles.text}>hr</Text>
          <Text style={[styles.time, styles.span]}>{minutes}</Text>
          <Text style={styles.text}>min</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  time: {
    color: 'white',
    fontSize: 30,
    fontWeight:'600',
    fontStyle:'bold'
  },
  span: {
    marginLeft: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    paddingLeft:5,
    
  },
});