import React from 'react'

import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Animated from 'react-native-reanimated'

const { Value } = Animated

class Header extends React.Component {

  constructor(props) {
    super(props)

    this._scroll_y = new Value(0)
  }

  render() {

    const _diff_clamp_scroll_y = Animated.diffClamp(this._scroll_y, 0, 50)

    const _header_height = Animated.interpolateNode(_diff_clamp_scroll_y, {
      inputRange: [0, 50],
      outputRange: [50, 0],
      extrapolate: 'clamp'
    })

    const _header_transalte_y = Animated.interpolateNode(_diff_clamp_scroll_y, {
      inputRange: [0, 50],
      outputRange: [0, -50],
      extrapolate: 'clamp'
    })

    const _header_opacity = Animated.interpolateNode(_diff_clamp_scroll_y, {
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })



    return (
      <SafeAreaView style={styles.safe_area_view}>

        <Animated.View
          style={[
            styles.header,
            {
              height: _header_height,
              transform: [{ translateY: _header_transalte_y }],
              opacity: _header_opacity
            }
          ]}
        >

          <Image
            source={require('src/assets/SORUS_BLACK.png')}
            style={{ width: 40, height: 50 }}
          />

          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>SORUS</Text>

          <View style={styles.fake_icon_box}>
            <Icon name="bell" size={25} color="#000" />
          </View>

        </Animated.View>
        <Animated.ScrollView
          style={[
            styles.scroll_view,
            {

            }
          ]}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={5}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this._scroll_y } }
            }
          ])}
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
}

export default Header

const styles = StyleSheet.create({
  safe_area_view: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  fake_icon_box: {
    backgroundColor: '#c4e6eb',
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
})