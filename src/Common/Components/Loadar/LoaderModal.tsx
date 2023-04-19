import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Platform } from 'react-native';
import { COLORS } from '../../constants/Colors';
const isIos = Platform.OS === "ios"

const LoaderModal = ({ loading }) => {
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
            }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={true}
                        color={COLORS.BLACK}
                        size="large"
                    />
                </View>
            </View>
        </Modal>
    );
};
export default LoaderModal;


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00000040',
        justifyContent: 'center',
    },
    activityIndicatorWrapper: {
        alignItems: 'center',
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        padding: 5,
        borderRadius: 90,
        paddingLeft: isIos ? 8 : 5,
        paddingTop: isIos ? 9 : 5
    }
});
