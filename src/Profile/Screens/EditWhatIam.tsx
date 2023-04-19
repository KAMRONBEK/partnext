import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lable from '../../Common/constants/English';
import style from '../../AuthFont/style';
import Modal from 'react-native-modal';
import { COLORS } from '../../Common/constants/Colors';
import { whatIAmCall } from '../../Core/Redux/Services/AuthServices';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import Box from '../../Authentication/Components/Box';
import Button from '../../Authentication/Components/Button';
import { updateProfileCall } from '../../Core/Redux/Services/ProfileServices';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type Props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'EditWhatIam'>;
    route: RouteProp<AppStackParamList, 'EditWhatIam'>;
};

interface IState {
    isModalVisible: boolean;
    setAllData: any;
    modalText: String;
    selected: any;
    selection: boolean;
    fx: any;
    fy: any;
    px: any;
    py: any;
    width: any;
}

export default class EditWhatIam extends React.Component<Props, IState> {
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
            setAllData: []
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
        this.setState({ selected: this.props?.route?.params?.id })
        this.getWhatiAm()
    }

    getWhatiAm = () => {
        whatIAmCall()
            .then((res: any) => {
                this.setState({ setAllData: res?.data?.data })
            })
            .catch((err) => {
            });
    }

    DATA = [
        { id: '1', title: Lable.I_HAVE_AN_IDEA },
        { id: '2', title: Lable.PARTNERSHIP_ON_STARTUP },
        { id: '3', title: Lable.I_OWN_A_BUSINESS },
        { id: '4', title: Lable.STRATEGIC_PARTNER },
        { id: '5', title: Lable.ACTIVE_PARTER },
        { id: '6', title: Lable.OTHRER },
    ];

    generateModalToolTip = index => {
        if (index == 1) {
            this.setState({ modalText: Lable.TO_GET_INTEREST_OF_OTHRES_TEXT });
        }
        if (index == 2) {
            this.setState({ modalText: Lable.OWNER_OF_EXISTING_AND_OPERATING_STARTUP });
        }
        if (index == 3) {
            this.setState({ modalText: Lable.EXPERIENCED_IN_BUSINESS });
        }
        if (index == 4) {
            this.setState({ modalText: Lable.EXPERIENCED_BUSINESS });
        }
        if (index == 5) {
            this.setState({ modalText: Lable.SHOW_YOUR_AVAILABILITY_TEXT });
        }
        if (index == 6) {
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
        newArray = this.state.selected?.filter(item => item.category != id);
        return newArray;
    };
    selectedOrNot = id => {
        var temp = false;
        this.state.selected?.map(item => {
            item.category == id ? (temp = true) : null;
        });
        return temp;
    };

    registerApi = () => {

        const data = {
            linkedin_url: this.props?.route?.params?.userData?.linkedin_url,
            experience: this.props?.route?.params?.userData?.experience,
            about_us: this.props?.route?.params?.userData?.about_us,
            partnership_reason: this.props?.route?.params?.userData?.partnership_reason,
            organization: this.props?.route?.params?.userData?.organization,
            current_position: this.props?.route?.params?.userData?.current_position,
            partner_intersts: this.props?.route?.params?.partnerInterstsId,
            user_category: this.state.selected,
            partner_category: this.props?.route?.params?.lookingForid,
            user_intersts: this.props?.route?.params?.yourInterstsId,
            user_images: this.props?.route?.params?.userImagesId
        }

        updateProfileCall(data)
            .then((res: any) => {
                if (res?.data?.code == 200) {
                    this.props.navigation.goBack()
                }
            })
            .catch((err) => {
            });
    }

    render() {
        console.log(this.state.setAllData)
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <LinearGradient
                        colors={['#CEE8FF', '#F2F9FF']}>
                        <View style={styles.subView}>
                            <CommonHeader
                                onPressBack={() => this.props.navigation.goBack()}
                                text={Lable.WHAT_AM_I}
                            />
                            <View>
                                {this.state.setAllData.map((item, index) => {
                                    return (
                                        <Box
                                            myRef={refDown => (this.myRef[index] = refDown)}
                                            color1={item.id <= 26 ? '#FFAB4A' : item.id <= 28 ? '#9CA0FF' : '#0C3F72'}
                                            color2={item.id <= 26 ? '#FFD833' : item.id <= 28 ? '#ABB8FF' : '#0F61B4'}
                                            // color1={item.id <= 37
                                            //     ? item.id <= 26
                                            //         ? '#FFAB4A'
                                            //         : '#9CA0FF'
                                            //     : '#0C3F72'}
                                            // color2={item.id <= 37
                                            //     ? item.id <= 26
                                            //         ? '#FFD833'
                                            //         : '#ABB8FF'
                                            //     : '#0F61B4'}
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
                                                setTimeout(() => { this.setState({ isModalVisible: !this.state.isModalVisible }); }, 150),
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

                            <View style={styles.editView}>
                                <Button
                                    width="47%"
                                    title={Lable.SAVE}
                                    unFilled={undefined}
                                    onPress={() => this.registerApi()}
                                    buttonStyle={undefined}
                                />
                                <Button
                                    width="47%"
                                    title={Lable.CANCEL}
                                    unFilled={true}
                                    onPress={() => this.props.navigation.goBack()}
                                    buttonStyle={undefined}
                                />
                            </View>
                        </View>
                    </LinearGradient>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F9FF'
    },
    subView: {
        width: '90%',
        alignSelf: 'center'
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
