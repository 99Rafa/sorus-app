import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Star = ({ changeRate }) => {

  const stars = [
    useState("#000"),
    useState("#000"),
    useState("#000"),
    useState("#000"),
    useState("#000")
  ]

  const setStarsColor = n => {
    changeRate(n);
    stars.forEach(([_, setColor]) => {
      setColor('#000');
    });

    for (let i = 0; i < n; i++) {
      stars[i][1]("orange");
    }
  }

  return (
    stars.map((star, i) => {
      return <TouchableOpacity style={{paddingLeft: 5}} key={i} onPress={() => setStarsColor(i + 1)}>
        <FontAwesomeIcon icon={faStar} color={star[0]} size={25} />
      </TouchableOpacity>
    })
  )
}

export default Star
