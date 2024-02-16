import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { GlobalStyle } from '../constants/globalstyle'
import CustomImage from '../utils/CustomImage'
import { height } from '../constants/Dimensions'

const PhotoView = ({ route }) => {
  return (
    <View style={GlobalStyle.root}>
      <CustomImage item={route?.params} style={styles.position} />
    </View>
  )
}

export default memo(PhotoView)

const styles = StyleSheet.create({
  position: {
    top: (height - 184) / 3,
  },
})