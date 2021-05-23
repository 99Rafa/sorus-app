import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import secsToTime from "src/libs/time/secsToTime";

export default function ProductItem({ item, handlePress, trigger }) {

  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    item.time_left -= 1
    setTimeLeft(secsToTime(item.time_left))
  }, [trigger])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress(item)}
    >
      <>
      <Image
          source={{ uri: item.image }}
          style={{ width: 80, height: 80, borderRadius: 8 }}
        />
        <View style={{marginLeft: 20}}>
          <Text style={{fontFamily: 'PoppinsBold', fontSize: 14}}>{item.name}</Text>
          <Text  style={{fontFamily: 'PoppinsBold', color: '#006466', fontSize: 17}}>$ {item.price}</Text>
          <Text  style={{fontFamily: 'PoppinsBold', color: '#272640', fontSize: 17}}>{timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</Text>
        </View>
        
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 90,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
