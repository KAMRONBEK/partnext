import React from "react";
import { Text, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from "../../constants/Colors";
import CommonStyles from "../../style/CommonStyles";
import TextStyles from "../../style/TextStyles";

const CommonButton = ({ onPress, title, containerStyle, whiteButton }) => {
    return (
        <>
            {whiteButton ?
                <LinearGradient
                    colors={['#FFFFFF', '#FFFFFF']}
                    style={[CommonStyles.buttonStyle, containerStyle]}
                >
                    <TouchableOpacity
                        style={[CommonStyles.buttonStyle, containerStyle, { borderWidth: 2, borderColor: COLORS.BACKGROUND }]}
                        onPress={onPress}>
                        <Text style={TextStyles.bold18DarkBlue}>{title}</Text>
                    </TouchableOpacity>
                </LinearGradient >
                :
                <LinearGradient
                    colors={['#0079D4', '#00B3EB']}
                    style={[CommonStyles.buttonStyle, containerStyle]}
                >
                    <TouchableOpacity
                        style={[CommonStyles.buttonStyle]}
                        onPress={onPress}>
                        <Text style={TextStyles.bold18White}>{title}</Text>
                    </TouchableOpacity>
                </LinearGradient >
            }
        </>
    );
};

export default CommonButton;
