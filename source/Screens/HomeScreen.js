import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { GlobalStyle, dummy, month } from '../constants/globalstyle'
import { Fonts, Images, colors } from '../Assets';
import { useSelector } from 'react-redux';
import { dailyUpdate } from '../Redux/DailyData';
import CustomImage from '../utils/CustomImage';
import { Screens } from '../constants/NavConstants';

const HomeScreen = ({ navigation }) => {
    const dailyData = useSelector(dailyUpdate)

    const navHandler = useCallback((val) => {
        navigation.navigate(Screens.DayView, val)
    }, [])

    const renderItem = useCallback(({ item }) => {

        return (
            <CustomImage item={item} onPress={navHandler.bind(null, item)} />

        );
    }, []);


    return (
        <View style={GlobalStyle.root}>
            {dailyData?.length > 0 ?
                <FlatList
                    data={dailyData}
                    contentContainerStyle={styles.list}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                /> :
                <Text style={styles.title}>{'Start Journey to get your daily clicked images...'}</Text>}

        </View>
    )
}

export default memo(HomeScreen)

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.Inter400,
        fontSize: 20,
        color: colors.black31,
        textAlign: 'center',
        margin: 20
    },
})