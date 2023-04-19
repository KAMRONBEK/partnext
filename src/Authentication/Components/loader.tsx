import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

const Loader = (props) => {
    const { loading } = props;
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
                        color={'#203269'}
                        size="large"
                    />
                </View>
            </View>
        </Modal>
    );
};
export default Loader;


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00000040',
        justifyContent: 'center',
    },
    activityIndicatorWrapper: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 90
    }
});
