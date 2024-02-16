import { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { height } from "../constants/Dimensions";
import { Fonts, colors } from "../Assets";
import Modal from 'react-native-modal'

const Popup = forwardRef((prop, ref) => {
    const [visible, setVisible] = useState(false);
    const { cancelText, confirmText, title, description, onConfirm } = prop;

    useImperativeHandle(
        ref,
        () => {
            return {
                toggle: () => {
                    setVisible(prev => !prev);
                },
            };
        },
        [],
    );

    const onCancel = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <Modal
            isVisible={visible}
            deviceHeight={height + 50}
            onBackdropPress={onCancel}
            transparent={true}
            style={styles.modalBack}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            statusBarTranslucent={true}>
            <View style={[styles.modalContent]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{description}</Text>
                <View style={styles.row}>
                    <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={onCancel}>
                        <Text style={styles.btnText}>{'cancel'}</Text>
                    </Pressable>
                    <Pressable style={[styles.button, { backgroundColor: colors.blue }]} onPress={onConfirm}>
                        <Text style={styles.btnText}>{'okay'}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modalBack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 10,
        width: '90%',
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    title: {
        fontFamily: Fonts.Inter400,
        fontWeight: '700',
        fontSize: 20,
        textAlign: "center",
    },
    text: {
        fontFamily: Fonts.Inter400,
        fontSize: 16,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'red',
        width: '48%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    btnText: {
        fontFamily: Fonts.Inter400,
        fontWeight: '600',
        fontSize: 18,
        color: colors.white,
    },
})

export default memo(Popup)