import React from "react";
import { View, Image, TextInput } from "react-native";
import { COLORS } from "../../constants/Colors";
import CommonStyles from "../../style/CommonStyles";
import SpaceStyles from "../../style/SpaceStyles";

type props = {
    value: string;
    placeholder: string;
    containerStyle: Object;
    containerInputText: Object;
    onChangeText: any;
    editable: boolean;
    multiline: boolean;
    defaultValue: string;
};

const CustomeTextInput = ({ value, placeholder, containerStyle, onChangeText, editable, multiline, defaultValue, containerInputText }: props) => {

    return (
        <View style={[CommonStyles.inputView, containerStyle]}>
            <TextInput
                placeholder={placeholder}
                style={[CommonStyles.inputText, containerInputText]}
                value={value}
                defaultValue={defaultValue}
                placeholderTextColor={COLORS.DARK_BLUE}
                onChangeText={onChangeText}
                editable={editable}
                multiline={multiline}
                textAlignVertical={'top'}
                numberOfLines={10}
            />
        </View>
    );
};

export default CustomeTextInput;