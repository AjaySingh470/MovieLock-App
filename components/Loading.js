import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import * as Progress from 'react-native-progress'
let {width ,height} = Dimensions.get('window')

const Loading = () => {
  const animation = useRef(null);
  return (
    <View style={{width,height}} className="absolute flex-row justify-center items-center" >
      <Progress.CircleSnail thickness={12} size={160} color={'yellow'}></Progress.CircleSnail>
  
    </View>
  )
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});


export default Loading