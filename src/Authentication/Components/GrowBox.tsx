import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import style from '../../AuthFont/style';;
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../Common/constants/Colors';
import Lable from '../../Common/constants/English';
import { Images } from '../../Common/constants/Images';

type props = {
  onCancel: () => void;
  onAccept: () => void;
  user_images: any,
  currentPosition: any,
  name: any
};

export default function GrowBox({ onCancel, onAccept, user_images, currentPosition, name }: props) {


  return (
    <View style={styles.growBox}>
      <View style={styles.growBox1}>
        <Image source={{ uri: user_images && user_images[0]?.image?.media_file_url }} style={styles.img3} />
        <View style={styles.growBox1_view}>
          <Text style={style.text2}>{name}</Text>
          <Text style={style.smallText}>
            {currentPosition}
          </Text>
        </View>
      </View>
      <View style={styles.growBox2}>
        <LinearGradient
          style={{ borderRadius: 20, padding: 1.5 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#FFAB4A', '#FFD833']}>
          <TouchableOpacity style={[styles.smallChip]} activeOpacity={1}>
            <Text style={style.smallText1}>{Lable.PARTNERSHIP_ON_STARTUP}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={{ marginLeft: 12, borderRadius: 20, padding: 1.5 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#9CA0FF', '#ABB8FF']}>
          <TouchableOpacity style={[styles.smallChip]} activeOpacity={1}>
            <Text style={style.smallText1}>{Lable.ACTIVE_PARTER}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.growBox3}>
        <TouchableOpacity onPress={onCancel}>
          <Image source={Images.wrong_box} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAccept}>
          <Image source={Images.hand} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  growBox: {
    height: 206,
    backgroundColor: COLORS.WHITE,
    borderRadius: 18,
    padding: 10,
    justifyContent: 'space-between',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    marginVertical: 20,
  },
  growBox1: {
    flexDirection: 'row',
  },
  growBox1_view: {
    marginLeft: 11,
    width: '50%',
  },
  growBox2: {
    flexDirection: 'row',
  },
  growBox3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img3: {
    width: 84,
    height: 84,
    borderRadius: 15,
  },
  smallChip: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
  },
});
