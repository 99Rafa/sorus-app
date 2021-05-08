import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import Animated from 'react-native-reanimated'
import Header from 'src/components/mainMenu/Header'

export default function Body() {

  const [_scroll_y, _] = useState(new Animated.Value(0));

  return (
    <SafeAreaView style={styles.safe_area_view}>
      <Header scroll_y={_scroll_y} />
      <Animated.ScrollView
        style={styles.scroll_view}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={5}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: _scroll_y } } }])}
      >

        <View style={[styles.fake_post, { backgroundColor: '#222' }]} />
        <View style={[styles.fake_post, { backgroundColor: '#333' }]} />
        <View style={[styles.fake_post, { backgroundColor: '#444' }]} />
        <View style={[styles.fake_post, { backgroundColor: '#555' }]} />
        <View style={[styles.fake_post, { backgroundColor: '#666' }]} />

      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe_area_view: {
    flex: 1
  },
  scroll_view: {
    flex: 1
  },
  fake_post: {
    height: 250,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8
  }
});
