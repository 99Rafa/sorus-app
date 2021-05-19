import React, { useState, useRef, useEffect } from 'react'
import { Dimensions, TouchableOpacity, TextInput, StyleSheet, Keyboard } from 'react-native'
import Animated, { EasingNode } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/FontAwesome5'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const { Value, timing } = Animated

export default function SearchBar({ setQuery }) {

  const [search, setSearch] = useState('');
  const input = useRef();

  const [_input_box_translate_x,] = useState(new Value(height));
  const [_back_button_opacity,] = useState(new Value(0));
  const [_content_translate_y,] = useState(new Value(height));
  const [_content_opacity,] = useState(new Value(0));

  useEffect(() => {
    setSearch('')
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => { _onBlur(); });
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const _onFocus = () => {
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease)
    }

    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: EasingNode.inOut(EasingNode.ease)
    }

    timing(_input_box_translate_x, input_box_translate_x_config).start()
    timing(_back_button_opacity, back_button_opacity_config).start()

    input.current.focus()
  }

  const _onBlur = () => {
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: EasingNode.inOut(EasingNode.ease)
    }
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease)
    }

    timing(_input_box_translate_x, input_box_translate_x_config).start()
    timing(_back_button_opacity, back_button_opacity_config).start()

    input.current.blur()
  }

  const makeQuery = () => {
    _onBlur()
    setQuery(search)
  }

  return (
    <>
      <TouchableOpacity
        style={styles.icon_box}
        onPress={_onFocus}
      >
        <Icon name="search" size={25} color="#000" />
      </TouchableOpacity>

      <Animated.View
        style={[styles.input_box, { transform: [{ translateX: _input_box_translate_x }] }]}
      >
        <Animated.View style={{ opacity: _back_button_opacity }}>
          <TouchableOpacity
            onPress={makeQuery}
            style={styles.back_icon_box}
          >
            <Icon name="chevron-left" size={25} color="#000" />
          </TouchableOpacity>
        </Animated.View>
        <TextInput
          ref={input}
          placeholder="Buscar oferta"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          onSubmitEditing={makeQuery}
          onBlur={() => setQuery(search)}
        />
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    width: width - 25,
    marginLeft: 5,
    backgroundColor: "#f2f2f2"
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15
  },
  icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto'
  },
});
