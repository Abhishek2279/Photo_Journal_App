import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fonts, colors } from '../Assets'

const CustomDetail = ({ title, data, text }) => {
    return (
        <View style={styles.root}>
            <Text style={styles.title}>{title}</Text>
            {data ? <Text style={styles.data}>{data}</Text> : null}
            {data ? <Text style={styles.text}>{text}</Text> : null}
        </View>
    )
}

export default CustomDetail

const styles = StyleSheet.create({
    root: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingVertical: 8,
    },
    title: {
        fontFamily: Fonts.Inter400,
        fontWeight: '700',
        color: colors.grey6C,
        textAlign: 'center',
        fontSize: 16,
    },
    data: {
        fontFamily: Fonts.Inter400,
        fontWeight: '700',
        color: colors.black31,
        textAlign: 'center',
        fontSize: 56,
    },
    text: {
        fontFamily: Fonts.Inter400,
        color: colors.grey6C,
        textAlign: 'center',
        fontSize: 12,
    },
})