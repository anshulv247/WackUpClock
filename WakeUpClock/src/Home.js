import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import AlertIcon from 'react-native-vector-icons/Ionicons'
import CircularSlider from 'react-native-circular-slider';
import TimerText from './components/TimerText';

const WAKE_ICON = (
  <G>
    <Path d="M2,12.9h1.7h3h2.7h3H14c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7c-0.9,0-1.7-0.7-1.7-1.7v-4
      c0-2.1-1.5-3.8-3.4-4.2C9,1.6,9,1.4,9,1.3c0-0.5-0.4-1-1-1c-0.5,0-1,0.4-1,1c0,0.2,0,0.3,0.1,0.4c-2,0.4-3.4,2.1-3.4,4.2v4
      c0,0.9-0.7,1.7-1.7,1.7c-0.4,0-0.7,0.3-0.7,0.7C1.3,12.6,1.6,12.9,2,12.9z"/>
    <Path d="M8,15.7c1.1,0,2.1-0.9,2.1-2.1H5.9C5.9,14.8,6.9,15.7,8,15.7z"/>
  </G>
);

const BEDTIME_ICON = (
  <G>
    <Path d="M11.7,10.5c-3.6,0-6.4-2.9-6.4-6.4c0-0.7,0.1-1.4,0.4-2.1C3.1,2.9,1.2,5.3,1.2,8.1c0,3.6,2.9,6.4,6.4,6.4
      c2.8,0,5.2-1.8,6.1-4.4C13.1,10.4,12.4,10.5,11.7,10.5z"/>
    <Path d="M8,7.6l2-2.5H8V4.4H11v0.6L9,7.6h2v0.7H8V7.6z"/>
    <Path d="M11.7,5.4l1.5-1.9h-1.4V3h2.2v0.5l-1.5,1.9h1.5v0.5h-2.2V5.4z"/>
    <Path d="M9.4,3l1.1-1.4h-1V1.3H11v0.4L9.9,3H11v0.4H9.4V3z"/>
  </G>
);


function calculateMinutesFromAngle(angle) {
  return Math.round(angle / (2 * Math.PI / (12 * 12))) * 5;
}

function calculateTimeFromAngle(angle) {
  const minutes = calculateMinutesFromAngle(angle);
  const h = Math.floor(minutes / 60);
  const m = minutes - h * 60;

  return { h, m };
}

function roundAngleToFives(angle) {
  const fiveMinuteAngle = 2 * Math.PI / 144;

  return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle;
}

function padMinutes(min) {
  if (`${min}`.length < 2) {
    return `0${min}`;
  }

  return min;
}

export default class Bedtime extends Component {

  state = {
    startAngle: Math.PI * 10/6,
    angleLength: Math.PI * 7/6,
    diffrenceHrs:'',
    doneColor:'#ffcf00'
  }

  onTimeUpdate = (fromTimeInMinutes, minutesLong) => {
    this.setState({ minutesLong });
  }

  onUpdate = ({ startAngle, angleLength }) => {
    this.setState({
      startAngle: roundAngleToFives(startAngle),
      angleLength: roundAngleToFives(angleLength)
    });
    this.onMessageChange()
  }

  onMessageChange=()=>
  {
    let message=calculateMinutesFromAngle(this.state.angleLength)
    this.setState({diffrenceHrs:Math.floor(message / 60),doneColor:'#9a9a9c'})

  }

  render() {
    const { startAngle, angleLength } = this.state;
    const bedtime = calculateTimeFromAngle(startAngle);
    const waketime = calculateTimeFromAngle((startAngle + angleLength) % (2 * Math.PI));

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        <Text style={styles.cancelText}>Cancel</Text>
        <Text style={styles.changeText}>Change Wake up</Text>
        <Text style={[styles.doneText,{color:this.state.doneColor}]}>Done</Text>
        </View>
      <View style={styles.clockcontainer}>
        <View style={styles.timeContainer}>
          <View style={styles.time}>
            <View style={styles.timeHeader}>
              <Svg height={14} width={14}>
                <G fill="#9a9a9c">{BEDTIME_ICON}</G>
              </Svg>
              <Text style={styles.bedtimeText}>BEDTIME</Text>
            </View>
            <Text style={styles.timeValue}>{bedtime.h}:{padMinutes(bedtime.m)}</Text>
          </View>
          <View style={styles.time}>
            <View style={styles.timeHeader}>
              <Svg height={14} width={14}>
                <G fill="#9a9a9c">{WAKE_ICON}</G>
              </Svg>
              <Text style={styles.wakeText}>WAKE UP</Text>
            </View>
            <Text style={styles.timeValue}>{waketime.h}:{padMinutes(waketime.m)}</Text>
          </View>
        </View>
        <View>
          <View style={{alignSelf:'center'}}>
          <CircularSlider
            startAngle={startAngle}
            angleLength={angleLength}
            onUpdate={this.onUpdate}
            segments={5}
            strokeWidth={42}
            radius={110}
            gradientColorFrom={this.state.diffrenceHrs > 7 ?"#424242":'#ffcf00'}
            gradientColorTo={this.state.diffrenceHrs > 7 ?"#424242":'#ffcf00'}
            showClockFace
            clockFaceColor="#9d9d9d"
            bgCircleColor="#171717"
            stopIcon={<G scale="1.1" transform={{ translate: "-8, -8" }}>{WAKE_ICON}</G>}
            startIcon={<G scale="1.1" transform={{ translate: "-8, -8" }}>{BEDTIME_ICON}</G>}
          />
          </View>
           <TimerText
            style={styles.sleepTimeContainer}
            minutesLong={calculateMinutesFromAngle(angleLength)}
          />
         {this.state.diffrenceHrs >=8 ? <Text style={styles.goalMessage}>This schedule meets your sleep goal. </Text>:
         <Text style={styles.goalMessage}>This schedule does not meets your sleep goal.</Text>}
          </View>
          
        </View>
        <View style={styles.clockBottamcontainer}>
        <Text style={styles.editText}>Edit Sleep Schedule in Health</Text>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
  
   flex:1,
    backgroundColor: '#000000',
  },
  headerContainer:
  {
   
    flexDirection:'row',
    marginTop:30,
  
    marginHorizontal:20
  },
  cancelText:{
    flex:1,
    color: '#ffcf00',
    textAlign:'left',
    fontSize:14
  },
  changeText:{
    flex:1,
    color: '#ffffff',
    textAlign:'center',
    fontSize:14,
    fontWeight:'800'
    
  },
  doneText:{
    flex:1,
   
    textAlign:'right',
    fontSize:14
  },
  clockcontainer:
  {
    borderRadius:10,
    backgroundColor:'#3d3d3d',
    padding:10,
    marginTop:70,
    marginHorizontal:10
  },
  bedtimeText: {
    color: '#9a9a9c',
    marginLeft: 3,
    fontSize: 12,
  },
  wakeText: {
    color: '#9a9a9c',
    marginLeft: 3,
    fontSize: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  time: {
    alignItems: 'center',
    flex: 1,
  },
  timeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeValue: {
    color: 'white',
    fontSize: 30,
    fontWeight:'600',
    fontStyle:'bold'
  },
  sleepTimeContainer: {
    
    justifyContent: 'center',
  
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  goalMessage:
  { 
    textAlign:'center',
    marginTop:10,
    color:'#9a9a9c'

  },
  clockBottamcontainer:
  {
    borderRadius:10,
    backgroundColor:'#3d3d3d',
    padding:10,
    marginTop:10,
    marginHorizontal:10
  },
  editText:
  {
    color: '#ffcf00',
    textAlign:'center'
  }
});