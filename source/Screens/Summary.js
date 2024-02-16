import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { dailyUpdate, maxTemp, minTemp } from '../Redux/DailyData'
import { Fonts, colors } from '../Assets'
import { GlobalStyle } from '../constants/globalstyle'
import { ScrollView } from 'react-native-gesture-handler'
import CustomDetail from '../utils/CustomDetail'

const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
};

const Summary = () => {
    const dailyData = useSelector(dailyUpdate);
    const max = useSelector(maxTemp);
    const min = useSelector(minTemp);

    const day1 = new Date();
    const day2 = new Date(dailyData[0]?.date);
    const numDays = parseInt((day2 - day1) / (1000 * 3600 * 24))

    return (
        <ScrollView style={[GlobalStyle.root, { padding: 20 }]}>
            {dailyData?.length > 0 ?
                <>
                    <CustomDetail title={'Days'} data={dailyData?.length + '/' + (numDays + 1)} text={`You have recored ${dailyData?.length} days since the first day`} />
                    <CustomDetail title={'Hottest day'} data={max?.temp + '˚'} text={max?.date} />
                    <CustomDetail title={'Coldest day'} data={min?.temp + '˚'} text={max?.date} />
                </>
                : <Text style={styles.title}>{'No data found...'}</Text>}
        </ScrollView>
    )
}

export default memo(Summary)

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.Inter400,
        fontSize: 20,
        color: colors.black31,
        textAlign: 'center',
        margin: 20
    },
})