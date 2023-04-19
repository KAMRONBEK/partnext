import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../AuthFont/style';
import GrowBox from '../Components/GrowBox';
import Modal from 'react-native-modal';
import { COLORS } from '../../Common/constants/Colors';
import Lable from '../../Common/constants/English';
import { Images } from '../../Common/constants/Images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function GrowUnlocked({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
      <LinearGradient style={styles.container} colors={['#CEE8FF', '#F2F9FF']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.subView}>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Image source={Images.backIcon} style={styles.img} />
            </TouchableOpacity>
            <View style={styles.headerView}>
              <Image source={Images.grow} style={styles.img1} />
              <Text style={[style.primaryTitle, { marginLeft: 5, marginTop: 7 }]}>
                {Lable.PARTNEXT_GROW}
              </Text>
            </View>
            <Text style={style.smallText}>
              {Lable.YOUR_GROWTH_CAN_ACCELERATE_TEXT}
            </Text>
            <Text style={style.smallText}>
              {Lable.SEE_WHO_WANTS_TO_CONNECT_WITH_YOU}
            </Text>
            <GrowBox
              onAccept={() => navigation.navigate('AppStack')}
              onCancel={() => alert('Reject Partnership')}
            />
            <GrowBox
              onAccept={() => alert('Accept Partnership')}
              onCancel={() => alert('Reject Partnership')}
            />
            <GrowBox
              onAccept={() => alert('Accept Partnership')}
              onCancel={() => alert('Reject Partnership')}
            />
          </View>
        </ScrollView>
      </LinearGradient>
      <Modal
        style={styles.modalMainView}
        coverScreen={true}
        hasBackdrop={true}
        transparent={true}
        visible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <LinearGradient
          style={styles.modalView}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#00ECB9', '#27C3C6']}>
          <Image source={Images.grow} style={styles.img2} />
          <Text
            style={[
              style.primaryTitle,
              { color: COLORS.WHITE, textAlign: 'center', marginTop: -5 },
            ]}>
            {Lable.PARTNEXT_GROW}
          </Text>
          <Text
            style={[
              style.smallText_16,
              { color: COLORS.WHITE, textAlign: 'center' },
            ]}>
            {Lable.UPGRADE_TO_PARTNEXT_TEXT}
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setIsModalVisible(false)}>
            <Text style={style.smallText}>{Lable.UPGRADE_TO_PREMIUM}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  img: {
    width: 11,
    height: 16,
    marginTop: 20,
  },
  img1: {
    width: 19,
    height: 19,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -5,
  },
  modalMainView: {
    backgroundColor: ' rgba(239, 251, 255, 0.85)',
    width: windowWidth,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  modalView: {
    position: 'absolute',
    paddingVertical: 20,
    height: 200,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 40,
    top: 0,
    width: windowWidth,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  img2: {
    width: 31,
    height: 31,
    tintColor: COLORS.WHITE,
    alignSelf: 'center',
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 15,
  },
});
