import { StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

const TextStyles = StyleSheet.create({
    regularDongle48DarkBlue: {
        color: COLORS.DARK_BLUE,
        ...Fonts.regularDongle48         //48 regularDongle
    },
    bold18DarkBlue: {
        color: COLORS.DARK_BLUE,
        ...Fonts.bold18                  //18 bold
    },
    bold18White: {
        color: COLORS.WHITE,
        ...Fonts.bold18                  //18 bold
    },
    bold14DarkBlue: {
        color: COLORS.DARK_BLUE,
        ...Fonts.bold14                  //14 Bold
    },
    bold14White: {
        color: COLORS.WHITE,
        ...Fonts.bold14                  //14 Bold
    },
    semiBold14White: {
        color: COLORS.WHITE,
        ...Fonts.semiBold14              //14 semiBold
    },
    semiBold14DarkBlue: {
        color: COLORS.DARK_BLUE,
        ...Fonts.semiBold14              //14 semiBold
    },
    regular14DarkBlue: {
        color: COLORS.DARK_BLUE,
        ...Fonts.regular14               //14 regular
    },
    regular14: {
        color: COLORS.WHITE,
        ...Fonts.regular14               //14 regular
    },
    bold13DarkBlue: {
        color: COLORS.DARK_BLUE,
        ...Fonts.semiBold13              //13 SemiBold
    },
    regular13DarkBlue: {
        color: COLORS.DARK_BLUE,
        ...Fonts.regular13              //13 regular
    },
    regular13Black: {
        color: COLORS.BLACK,
        ...Fonts.regular13              //13 regular
    },
    regular13Title: {
        color: COLORS.TITLE,
        ...Fonts.regular13              //13 regular
    },
    regular12Title: {
        color: COLORS.TITLE,
        ...Fonts.regular12               //12 regular
    },
    regular12DarkBlue: {
        color: COLORS.DARK_BLUE,
        ...Fonts.regular12               //12 regular
    },
    regular12SecondoryBlue: {
        color: COLORS.SECONDARY_BLUE,
        ...Fonts.regular12               //12 regular
    },
    bold11White: {
        color: COLORS.WHITE,
        ...Fonts.bold11                   //11 bold
    },
});

export default TextStyles;
