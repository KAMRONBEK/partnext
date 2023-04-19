import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View, Image, ScrollView, TouchableOpacity, SafeAreaView, TextInput, StyleSheet, Platform, PanResponderGestureState } from 'react-native';
import CustomText from '../../../Common/Components/Text/CustomText';
import { Images } from '../../../Common/constants/Images';
import CommonStyles from '../../../Common/style/CommonStyles';
import SpaceStyles from '../../../Common/style/SpaceStyles';
import TextStyles from '../../../Common/style/TextStyles';
import Footer from './Footer';
import Card from './Card';
import { ACTION_OFFSET, CARD } from './utils/constants';
import HardCodeScreen from '../../Components/HardCodeScreen';
import { useDispatch, useSelector } from "react-redux";
import { UserAction } from '../../../Core/Redux/action/UserAction';
import { addLeftRightCall, getFriendSuggestionCall } from '../../../Core/Redux/Services/HomeServices';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../Common/constants/Colors';
import { sendMsgCall } from '../../../Core/Redux/Services/ChatServices';

let allIndex = 0

export default function Opportunities({ navigation }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hardCodeScreen, setHardCodeScreen] = useState(false);
  const [openMatchModal, setOpenMatchModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [allFriendData, setAllFriendData] = useState([]);
  const [msg, setMsg] = useState('');
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const dispatch = useDispatch()

  useEffect(() => {
    if (!allFriendData.length) {
      setHardCodeScreen(false)
    }
  }, [allFriendData.length]);

  useEffect(() => {
    dispatch(UserAction())
  }, []);

  useEffect(() => {
    getFriendSuggestList()
  }, []);

  const getFriendSuggestList = () => {
    const data = {
      start: 0,
      length: 5
    }
    getFriendSuggestionCall(data)
      .then((res: any) => {
        setAllFriendData(res?.data?.data)
      })
      .catch((err) => {
      });
  }

  const panResponder = PanResponder.create({
    // onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: Platform.select({
      default: () => true,
      android: (e: GestureResponderEvent, state: PanResponderGestureState) =>
        Math.abs(state.dx) > 10 || Math.abs(state.dy) > 10
    }),

    onPanResponderMove: (_, { dx, dy, y0 }) => {
      // console.log(dx,"......" ,dy,".......", y0);

      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      console.log(dx, dy)
      if (dx > 99) {
        console.log("Plus");
        callRightApi(1, allFriendData[currentIndex]?.id)
      } else {
        callRightApi(2, allFriendData[currentIndex]?.id)
        console.log("Minus");
      }
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;
      console.log('offset', ACTION_OFFSET)

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    // allIndex = allIndex + 1
    // console.log(allIndex, "......allIndex.....");
    // setCurrentIndex(allIndex)
    setAllFriendData((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const callRightApi = (status, id) => {
    console.log("calleddd")
    const data = {
      user: id,
      connection_status: status
    }
    addLeftRightCall(data)
      .then((res: any) => {
        if (res.data.message == 'Matched SuccessFully') {
          setUserId(id)
          setOpenMatchModal(true)
        }
      })
      .catch((err) => {
      });
  }

  const handleChoice = useCallback(
    (direction: any, id: any) => {
      if (direction == 1) {
        callRightApi(2, id)
      }
      if (direction == -1) {
        callRightApi(1, id)
      }
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );


  const renderTags = (item: { name: any; intersts: any }, index: React.Key | null | undefined) => {
    return (
      <>
        <TouchableOpacity
          key={index}
          style={[CommonStyles.tagView]}
        >
          <CustomText
            style={[TextStyles.bold13DarkBlue]}
            text={item?.intersts?.name} numberOfLines={undefined} />
        </TouchableOpacity>
      </>
    )
  }

  const sendMsg = () => {
    const data = {
      recipient: userId,
      content: msg,
      message_media: []
    }
    sendMsgCall(data)
      .then((res) => {
        setMsg('')
        setOpenMatchModal(false)
      })
      .catch((err) => {
      });
  }

  // console.log(allFriendData, "===allFriendData===");

  return (
    <>
      <View style={[CommonStyles.mainContainer, { alignItems: 'center' }]}>
        <SafeAreaView />
        <Image
          source={Images.companyLogo}
          style={SpaceStyles.alignSelf}
        />

        {allFriendData?.length != 0 ?
          <>
            <View style={CommonStyles.topImageView}>
              {allFriendData?.map((item, index) => {
                const isFirst = index === 0;
                const dragHandlers = isFirst ? panResponder.panHandlers : {};
                return (
                  <Card
                    key={`card${index}`}
                    rest={undefined}
                    allIndex={allIndex}
                    allFriendData={allFriendData[currentIndex]}
                    source={allFriendData[currentIndex]}
                    isFirst={isFirst}
                    swipe={swipe}
                    tiltSign={tiltSign}
                    {...dragHandlers}
                    item={allFriendData[currentIndex]} />
                );
              }).reverse()
              }
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={[CommonStyles.whiteContainer]}>
              <View style={SpaceStyles.rowWrap}>
                {allFriendData[currentIndex]?.user_intersts?.map((i, index) => {
                  return renderTags(i, index)
                })}
              </View>
              <CustomText
                text={'About yourself'}
                style={[TextStyles.bold18DarkBlue, SpaceStyles.top1]} numberOfLines={undefined} />
              <CustomText
                text={allFriendData[currentIndex]?.about_us}
                style={[TextStyles.regular14DarkBlue, SpaceStyles.top1]} numberOfLines={undefined}
              />

              <CustomText
                text={'What kind of partnership are you looking for?'}
                style={[TextStyles.bold18DarkBlue, SpaceStyles.top1]} numberOfLines={undefined} />
              <CustomText
                text={allFriendData[currentIndex]?.partnership_reason}
                style={[TextStyles.regular14DarkBlue, SpaceStyles.top1]} numberOfLines={undefined} />
              <View style={{ height: 100 }}>
                <Footer
                  userId={allFriendData[currentIndex]?.id}
                  handleChoice={handleChoice} />
              </View>
            </ScrollView>
          </>
          :
          <HardCodeScreen />
        }
      </View>
      <Modal
        coverScreen={true}
        hasBackdrop={true}
        transparent={true}
        visible={openMatchModal}
        // visible={true}
        onBackdropPress={() => setOpenMatchModal(false)}
        onRequestClose={() => setOpenMatchModal(false)}>
        <View style={[CommonStyles.modalView]}>
          <LinearGradient style={[styles.container]} colors={['#CEE8FF', '#F2F9FF']}>
            <View style={[SpaceStyles.spaceHorizontal, SpaceStyles.top5, { position: 'absolute' }]}>
              <TouchableOpacity onPress={() => setOpenMatchModal(false)}>
                <Image source={Images.crossBlueIcon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <View style={[SpaceStyles.rowFlex, SpaceStyles.top1]}>
                <CustomText numberOfLines={undefined} text={`Lets Talk Business`} style={[TextStyles.regularDongle48DarkBlue, SpaceStyles.top3]} />
              </View>
            </View>

            <Image source={Images.mainImage}
              resizeMode={'contain'}
              style={[CommonStyles.mainImageMatchView, { marginTop: -70 }]}
            />
            <View style={{ position: 'absolute', bottom: 160, left: 50 }}>
              <CustomText numberOfLines={undefined} text={`Partnext tips:`} style={[TextStyles.semiBold14DarkBlue]} />
              <View style={[SpaceStyles.rowFlex, SpaceStyles.top1]}>
                <Image source={Images.rightGreenArrow}
                  resizeMode={'contain'}
                />
                <CustomText numberOfLines={undefined} text={`Leave your ego a side`} style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]} />
              </View>
              <View style={[SpaceStyles.rowFlex, SpaceStyles.top1]}>
                <Image source={Images.rightGreenArrow}
                  resizeMode={'contain'}
                />
                <CustomText numberOfLines={undefined} text={`Keep a positive attitude`} style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]} />
              </View>
              <View style={[SpaceStyles.rowFlex, SpaceStyles.top1]}>
                <Image source={Images.rightGreenArrow}
                  resizeMode={'contain'}
                />
                <CustomText numberOfLines={undefined} text={`Keep it simple`} style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]} />
              </View>
            </View>

            <View style={[CommonStyles.bottomMessageMatchView, { position: 'absolute', bottom: 70, left: 30 }]}>
              <View style={[CommonStyles.textInputChatMatch, SpaceStyles.left3]}>
                <View style={SpaceStyles.rowFlex}>
                  <TextInput
                    style={[SpaceStyles.left3, TextStyles.semiBold14DarkBlue, SpaceStyles.width62]}
                    placeholderTextColor={COLORS.DARK_BLUE}
                    placeholder={'Write a massege...'}
                    multiline={true}
                    defaultValue={msg}
                    value={msg}
                    onChangeText={(text) => setMsg(text)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => sendMsg()}
                >
                  <Image
                    resizeMode={'contain'}
                    source={Images.sendIcon} />
                  <Image
                    resizeMode={'contain'}
                    style={{ position: 'absolute', alignSelf: 'center', top: 10 }}
                    source={Images.sendWhiteArrow} />
                </TouchableOpacity>
              </View>
            </View>

          </LinearGradient>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F9FF'
  },
  img: {
    width: 11,
    height: 16,
    marginVertical: 15,
  },
  wrapperView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent: 'space-between',
  }
});
