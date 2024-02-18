import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import Modal from 'react-native-modal';
import { height } from '../constants/Dimensions';
import { colors } from '../Assets';

const LoadingOverlay = forwardRef((prop, ref) => {
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            start: () => {
                setLoading(true);
            },
            stop: () => {
                setLoading(false);
            },
        };
    });

    return (
        <Modal
            transparent={true}
            isVisible={loading}
            deviceHeight={height + 50}
            style={styles.rootContainer}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            statusBarTranslucent>
            <View style={styles.activityContainer}>
                <ActivityIndicator color={colors.blue} size={30} />
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: 80,
        height: 80,
        borderRadius: 5,
    },
});

export default memo(LoadingOverlay);

