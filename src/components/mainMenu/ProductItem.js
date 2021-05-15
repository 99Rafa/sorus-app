import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import secsToTime from "src/libs/time/secsToTime";

export default function ProductItem({ item, handlePress }) {

  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const { days, hours, minutes, seconds } = secsToTime(item.time_left)
    setTimeLeft(`${days}:${hours}:${minutes}:${seconds}`)
  }, [])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress(item)}
    >
      <>
        <View>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
          <Text>{timeLeft}</Text>
        </View>
        <Image
          source={{ uri: item.image }}
          style={{ width: 80, height: 80, marginLeft: 'auto', borderRadius: 8 }}
        />
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
