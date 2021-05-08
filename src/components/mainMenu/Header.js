import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Animated from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Header({ scroll_y }) {

  const _scroll_y = scroll_y;

  const _diff_clamp_scroll_y = Animated.diffClamp(_scroll_y, 0, 50);

  const _header_height = Animated.interpolateNode(_diff_clamp_scroll_y, {
    inputRange: [0, 50],
    outputRange: [50, 0],
    extrapolate: 'clamp'
  });

  const _header_transalte_y = Animated.interpolateNode(_diff_clamp_scroll_y, {
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp'
  });

  const _header_opacity = Animated.interpolateNode(_diff_clamp_scroll_y, {
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View
      style={[
        styles.header, {
          height: _header_height,
          transform: [{ translateY: _header_transalte_y }],
          opacity: _header_opacity
        }]}
    >

      <Image
        source={require('src/assets/SORUS_BLACK.png')}
        style={{ width: 40, height: 50 }}
      />

      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>sorus</Text>

      <View style={styles.fake_icon_box}>
        <Icon name="search" size={25} color="#000" />
      </View>

    </Animated.View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  fake_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto'
  },
});
