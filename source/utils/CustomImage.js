import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { memo } from 'react'
import FastImage from 'react-native-fast-image'
import { month } from '../constants/globalstyle'
import { width } from '../constants/Dimensions'
import { Fonts, Images, colors } from '../Assets'
import moment from 'moment';

const CustomImage = ({ item, onPress, style }) => {
    const day = moment(item?.date)

    return (
        <Pressable onPress={onPress} style={style}>

            <FastImage
                source={{ uri: item.image }}
                style={styles.photo}
                resizeMode="cover"
            >
                <View style={styles.dateView}>
                    <Text style={styles.month}>{month[day.month()]}</Text>
                    <Text style={styles.date}>{day.date()}</Text>
                </View>
                <View style={[styles.row, { left: 11 }]}>
                    <FastImage
                        source={Images.location}
                        style={styles.locIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.location}>{item.location}</Text>
                </View>
                <View style={[styles.row, { right: 13 }]}>
                    <Text style={styles.temp}>{item.temperature + '°'}</Text>
                    <FastImage
                        source={Images.sun}
                        style={styles.sun}
                        resizeMode="contain"
                    />
                </View>

            </FastImage>
        </Pressable>
    )
}

export default memo(CustomImage)

const styles = StyleSheet.create({
    photo: {
        width: width,
        height: 184,
    },
    dateView: {
        position: 'absolute',
        top: 8,
        left: 11,
    },
    month: {
        fontSize: 14,
        fontFamily: Fonts.Inter400,
        fontWeight: '700',
        color: colors.white,
        textAlign: 'center',
    },
    date: {
        fontSize: 24,
        fontFamily: Fonts.Inter400,
        fontWeight: '700',
        color: colors.white,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 9,
        alignItems: 'center'
    },
    location: {
        fontSize: 12,
        fontFamily: Fonts.Inter400,
        color: colors.white,
        marginLeft: 8,
    },
    locIcon: {
        width: 16,
        height: 16,
    },
    temp: {
        fontSize: 12,
        fontFamily: Fonts.Inter400,
        fontWeight: '700',
        color: colors.white,
        marginRight: 8,
    },
    sun: {
        width: 16,
        height: 16,
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.Inter400,
        fontWeight: '700',
        textAlign: 'center',
        padding: 40,
    },
})