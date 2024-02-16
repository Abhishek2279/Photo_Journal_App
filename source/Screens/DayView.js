import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Fonts, colors } from '../Assets'
import CustomImage from '../utils/CustomImage'
import FastImage from 'react-native-fast-image'
import { GlobalStyle } from '../constants/globalstyle'
import { Screens } from '../constants/NavConstants'

const DayView = ({ navigation, route }) => {
    const navHandler = useCallback(() => {
        navigation.navigate(Screens.PhotoView, route?.params)
    }, [route])

    return (
        <View style={GlobalStyle.root}>
            <CustomImage item={route?.params} onPress={navHandler} />
            <Text style={styles.thoughts}>{route?.params?.thoughts}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    thoughts: {
        fontFamily: Fonts.Inter400,
        fontSize: 16,
        color: colors.black31,
        margin: 20
    },
})

export default memo(DayView)
