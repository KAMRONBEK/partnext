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
import { getCurrentUser } from '../../../Core/Redux/Services/ProfileServices';

let allIndex = 0

export default function UserChatProfileScreen({ navigation, route: {params: {id}} }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hardCodeScreen, setHardCodeScreen] = useState(false);
  const [openMatchModal, setOpenMatchModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [allFriendData, setAllFriendData] = useState([]);
  const [userData, setUserData] = useState(null)
  const [msg, setMsg] = useState('');
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser(id).then(res => {
      setUserData(res.data.data)
    })
  }, [])
console.log({userData})

  // const getFriendSuggestList = () => {
  //   const data = {
  //     start: 0,
  //     length: 5
  //   }
  //   getFriendSuggestionCall(data)
  //     .then((res: any) => {
  //       console.log(res)
  //       setAllFriendData(res?.data?.data)
  //     })
  //     .catch((err) => {
  //     });
  // }

  // const panResponder = PanResponder.create({
  //   // onMoveShouldSetPanResponder: () => true,
  //   onMoveShouldSetPanResponder: Platform.select({
  //     default: () => true,
  //     android: (e: GestureResponderEvent, state: PanResponderGestureState) =>
  //       Math.abs(state.dx) > 10 || Math.abs(state.dy) > 10
  //   }),

  //   onPanResponderMove: (_, { dx, dy, y0 }) => {
  //     // console.log(dx,"......" ,dy,".......", y0);

  //     swipe.setValue({ x: dx, y: dy });
  //     tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
  //   },
  //   onPanResponderRelease: (_, { dx, dy }) => {
  //     if (dx > 0) {
  //       console.log("Plus");
  //       callRightApi(1, userData?.id)
  //     } else {
  //       callRightApi(2, userData?.id)
  //       console.log("Minus");
  //     }
  //     const direction = Math.sign(dx);
  //     const isActionActive = Math.abs(dx) > ACTION_OFFSET;

  //     if (isActionActive) {
  //       Animated.timing(swipe, {
  //         duration: 200,
  //         toValue: {
  //           x: direction * CARD.OUT_OF_SCREEN,
  //           y: dy,
  //         },
  //         useNativeDriver: true,
  //       }).start(removeTopCard);
  //     } else {
  //       Animated.spring(swipe, {
  //         toValue: {
  //           x: 0,
  //           y: 0,
  //         },
  //         useNativeDriver: true,
  //         friction: 5,
  //       }).start();
  //     }
  //   },
  // });

  // const removeTopCard = useCallback(() => {
  //   // allIndex = allIndex + 1
  //   // console.log(allIndex, "......allIndex.....");
  //   // setCurrentIndex(allIndex)
  //   setAllFriendData((prevState) => prevState.slice(1));
  //   swipe.setValue({ x: 0, y: 0 });
  // }, [swipe]);

  // const callRightApi = (status, id) => {
  //   const data = {
  //     user: id,
  //     connection_status: status
  //   }
  //   addLeftRightCall(data)
  //     .then((res: any) => {
  //       if (res.data.message == 'Matched SuccessFully') {
  //         setUserId(id)
  //         setOpenMatchModal(true)
  //       }
  //     })
  //     .catch((err) => {
  //     });
  // }

  // const handleChoice = useCallback(
  //   (direction: any, id: any) => {
  //     if (direction == 1) {
  //       callRightApi(2, id)
  //     }
  //     if (direction == -1) {
  //       callRightApi(1, id)
  //     }
  //     Animated.timing(swipe.x, {
  //       toValue: direction * CARD.OUT_OF_SCREEN,
  //       duration: 400,
  //       useNativeDriver: true,
  //     }).start(removeTopCard);
  //   },
  //   [removeTopCard, swipe.x]
  // );


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

  // const sendMsg = () => {
  //   const data = {
  //     recipient: userId,
  //     content: msg,
  //     message_media: []
  //   }
  //   sendMsgCall(data)
  //     .then((res) => {
  //       setMsg('')
  //       setOpenMatchModal(false)
  //     })
  //     .catch((err) => {
  //     });
  // }

  // console.log(allFriendData, "===allFriendData===");


  return (
    <>
      <View style={[CommonStyles.mainContainer, { alignItems: 'center' }]}>
        <SafeAreaView />
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <TouchableOpacity style={{height: 35, width: 35, alignItems: 'center', justifyContent: 'center', marginTop: 3}} onPress={() => navigation.goBack()}>
                        <Image source={Images.backIcon} />
                    </TouchableOpacity>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1, marginRight: 35}}>
  
        <Image
          source={Images.companyLogo}
          style={{alignSelf: 'center'}}
        />
</View>
</View>

          <>
            <View style={CommonStyles.topImageView}>
      
     
                  <Card
                    // rest={undefined}
                    // allIndex={allIndex}
                    // allFriendData={userData}
                    // source={userData}
                    // setIndex={0}
                    // tiltSign={tiltSign}
                    // item={userData} />
                    rest={undefined}
                    allIndex={allIndex}
                    allFriendData={userData}
                    source={userData}
                    isFirst={true}
                    swipe={swipe}
                    tiltSign={tiltSign}
          
                    item={userData} 
                    />
       

              
            </View>

            <ScrollView contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false} style={[CommonStyles.whiteContainer]}>
              <View style={SpaceStyles.rowWrap}>
                {userData?.user_intersts?.map((i, index) => {
                  return renderTags(i, index)
                })}
              </View>
              <CustomText
                text={'About yourself'}
                style={[TextStyles.bold18DarkBlue, SpaceStyles.top1]} numberOfLines={undefined} />
              <CustomText
                text={userData?.about_us}
                style={[TextStyles.regular14DarkBlue, SpaceStyles.top1]} numberOfLines={undefined}
              />

              <CustomText
                text={'What kind of partnership are you looking for?'}
                style={[TextStyles.bold18DarkBlue, SpaceStyles.top1]} numberOfLines={undefined} />
              <CustomText
                text={userData?.partnership_reason}
                style={[TextStyles.regular14DarkBlue, SpaceStyles.top1]} numberOfLines={undefined} />
              {/* <View style={{ height: 100 }}>
                <Footer
                  userId={userData?.id}
                  handleChoice={handleChoice} />
              </View> */}
            </ScrollView>
          </>
      </View>
    <SafeAreaView style={{backgroundColor: 'white'}} />
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
