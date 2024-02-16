import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Fonts, Images, colors } from '../Assets'
import FastImage from 'react-native-fast-image'

const CustomHeader = ({ navigation, backArrow }) => {
    const navHandler = useCallback(() => {
        navigation.goBack()
    }, [])

    return (
        <View style={styles.headView}>
            <Pressable style={styles.backView} onPress={navHandler}>
                <FastImage
                    source={backArrow}
                    style={styles.back}
                    resizeMode="contain"
                />
            </Pressable>
            <Text style={styles.headLeft}>{'click'}</Text>
            <Text style={styles.headCenter}>{'a'}</Text>
            <Text style={styles.headRight}>{'day'}</Text>
        </View>
    )
}

export default memo(CustomHeader)

const styles = StyleSheet.create({
    headView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        height: 47,
    },
    headLeft: { fontSize: 24, color: colors.grey, fontFamily: Fonts.Inter400, fontWeight: '700' },
    headCenter: { fontSize: 24, fontFamily: Fonts.Inter400 },
    headRight: { fontSize: 24, color: colors.blue, fontFamily: Fonts.Inter400, fontWeight: '700' },
    backView: {
        position: 'absolute',
        left: 15,
    },
    back: { height: 24, width: 24 },
})