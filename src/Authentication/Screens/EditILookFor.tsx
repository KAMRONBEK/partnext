import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../AuthFont/style';
import Box from '../Components/Box';
import Modal from 'react-native-modal';
import { COLORS } from '../../Common/constants/Colors';
import Lable from '../../Common/constants/English';
import { whatILookCall } from '../../Core/Redux/Services/AuthServices';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../Core/StackParamLists/AuthStackParamList';
import { RouteProp } from '@react-navigation/native';
import Toast from "react-native-simple-toast";
import { Images } from '../../Common/constants/Images';
import SpaceStyles from '../../Common/style/SpaceStyles';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'OnboardingToolTip'>;
  route: RouteProp<AuthStackParamList, 'OnboardingToolTip'>;
};

interface IState {
  isModalVisible: boolean;
  modalText: String;
  selected: any;
  selection: boolean;
  fx: any;
  fy: any;
  px: any;
  py: any;
  width: any;
  setAllData: any;
}

export default class EditILookFor extends React.Component<Props, IState> {
  private myRef: any;
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      modalText: '',
      selected: [],
      selection: false,
      fx: 0,
      fy: 0,
      px: 0,
      py: 0,
      width: 0,
      setAllData: [],
    };
    this.myRef = [];
  }

  measureView = index => {
    if (this.myRef.length > 0) {
      this.myRef[index].measure((fx, fy, width, height, px, py) => {
        this.setState({
          fx: fx,
          fy: fy,
          px: px,
          py: py,
          width: width,
        });
      });
    }
  };

  componentDidMount() {
    this.getWhatiAm()
  }

  getWhatiAm = () => {
    whatILookCall()
      .then((res: any) => {
        this.setState({ setAllData: res?.data?.data })
      })
      .catch((err) => {
      });
  }

  DATA = [
    { id: '1', title: Lable.GROW_AN_IDEA },
    { id: '2', title: Lable.PARTNERSHIP_ON_STARTUP },
    { id: '3', title: Lable.PARRTNERSHIP_ON_EXISTING_BUSINESS },
    { id: '4', title: Lable.STRATEGIC_PARTNER },
    { id: '5', title: Lable.ACTIVE_PARTER },
    { id: '6', title: Lable.OTHRER },
  ];


  generateModalToolTip = index => {
    if (index == 7) {
      this.setState({ modalText: Lable.DEVELOP_IDEAS_FROM_SCRATCH_TEXT });
    }
    if (index == 8) {
      this.setState({ modalText: Lable.FIND_STARTUP_THAT_ARE_LOOKING_FOR_YOUR_SKILLS_TEXT, });
    }
    if (index == 9) {
      this.setState({ modalText: Lable.BECOME_A_PART_OF_RUNNING_BUSINESS });
    }
    if (index == 10) {
      this.setState({ modalText: Lable.STRATEGIC_PARTNER_LOOK });
    }
    if (index == 11) {
      this.setState({ modalText: Lable.ACTIVE_PARTNER_LOOK });
    }
    if (index == 12) {
      this.setState({ modalText: Lable.IF_YOU_ARE_NOT_A_PART_OF_THE_CATEGORIES_ABOVE });
    }
  };

  onBoxPressed = item => {
    this.selectedOrNot(item.id)
      ? this.setState({ selected: this.newArrayList(item.id) })
      : this.state.selected.push({ category: item.id });
  };
  newArrayList = id => {
    var newArray = [];
    newArray = this.state.selected.filter(item => item.category != id);
    return newArray;
  };
  selectedOrNot = id => {
    var temp = false;
    this.state.selected.map(item => {
      item.category == id ? (temp = true) : null;
    });
    return temp;
  };

  screenChange = () => {
    if (this.state.selected.length == 0) {
      return Toast.showWithGravity('Please select any I am looking for', Toast.SHORT, Toast.BOTTOM);
    }
    this.props.navigation.navigate('OnboardingIntrest', {
      user_category: this.props?.route?.params?.user_category,
      partner_category: this.state.selected
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F2F9FF' }}>
        <LinearGradient style={styles.container} colors={['#CEE8FF', '#F2F9FF']}>
          <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <View style={styles.subView}>

              <CommonHeader
                onPressBack={() => this.props.navigation.goBack()}
                text={Lable.I_AM_LOOKING_FOR}
              />

              <View>
                {this.state.setAllData.map((item, index) => {
                  return (
                    <Box
                      myRef={refDown => (this.myRef[index] = refDown)}
                      color1={item.id <= 33 ? '#FFAB4A' : item.id <= 35 ? '#9CA0FF' : '#0C3F72'}
                      color2={item.id <= 33 ? '#FFD833' : item.id <= 35 ? '#ABB8FF' : '#0F61B4'}
                      // color1={item.id <= 12
                      //   ? item.id <= 10
                      //     ? '#FFAB4A'
                      //     : '#9CA0FF'
                      //   : '#0C3F72'}
                      // color2={item.id <= 12
                      //   ? item.id <= 10
                      //     ? '#FFD833'
                      //     : '#ABB8FF'
                      //   : '#0F61B4'}
                      isSlected={this.selectedOrNot(item.id) ? true : false}
                      onBoxPress={() => {
                        this.onBoxPressed(item),
                          this.setState({ selection: !this.state.selection });
                      }}
                      BoxStyle={{
                        borderWidth: 1,
                        borderColor: this.selectedOrNot(item.id)
                          ? '#0079D4'
                          : COLORS.WHITE,
                      }}
                      title={item.name}
                      onPress2={() => {
                        setTimeout(() => {
                          this.setState({
                            isModalVisible: !this.state.isModalVisible,
                          });
                        }, 150),
                          this.generateModalToolTip(item.id),
                          this.measureView(index);
                      }} onPress1={function (): void {
                        throw new Error('Function not implemented.');
                      }} onLayout={undefined} />
                  );
                })}
                <Modal
                  coverScreen={true}
                  hasBackdrop={true}
                  transparent={true}
                  visible={this.state.isModalVisible}
                  onBackdropPress={() => this.setState({ isModalVisible: false })}
                  onRequestClose={() => {
                    this.setState({ isModalVisible: !this.state.isModalVisible });
                  }}>
                  <View
                    style={[
                      styles.modalView,
                      {
                        right: 0,
                        top: this.state.py + 25,
                        left: 0,
                        width: this.state.width,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() => this.setState({ isModalVisible: false })}
                      style={styles.TriangleShapeCSS}></TouchableOpacity>

                    <Text style={style.smallestText}>{this.state.modalText}</Text>
                  </View>
                </Modal>
              </View>

              {/* <View style={styles.editView}>
              <Button
                width="47%"
                title={Lable.SAVE}
                onPress={() => this.screenChange()}
                buttonStyle={undefined}
                unFilled={false}
              />
              <Button
                width="47%"
                title={Lable.CANCEL}
                unFilled={true}
                onPress={() => this.setState({ selected: [] })}
                buttonStyle={undefined}
              />
            </View> */}
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', marginTop: 10 }}
                onPress={() => this.screenChange()}
              >
                <LinearGradient
                  style={styles.logoContainer}
                  colors={['#0079D4', '#00B3EB']}>
                  <Image source={Images.right_arrow} style={styles.img1} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', bottom: 20, backgroundColor: '#F2F9FF' }}>
          <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
          <Image source={Images.currentScreen} style={SpaceStyles.left3} />
          <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
          <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
          <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
          <Image source={Images.noScreenRound} style={SpaceStyles.left3} />
        </View>
      </View>
    );
  }
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
    marginVertical: 15,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img1: {
    width: 16,
    height: 24,
  },
  modalView: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 10,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TriangleShapeCSS: {
    position: 'absolute',
    right: 14.5,
    width: 0,
    height: 0,
    top: -15,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.WHITE,
  },
  editView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});
