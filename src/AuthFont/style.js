import { StyleSheet } from 'react-native';
import { COLORS } from '../Common/constants/Colors';
import Fonts from './Fonts';
export default StyleSheet.create({
  primaryTitle: {
    fontFamily: Fonts.FONT_NORMAL_DONGLE,
    fontSize: 48,
    color: COLORS.DARK_BLUE,
  },

  smallText: {
    fontFamily: Fonts.FONT_NORMAL_NUNITO,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.DARK_BLUE,
  },
  smallText_16: {
    fontFamily: Fonts.FONT_NORMAL_NUNITO,
    fontSize: 14,
    lineHeight: 16,
    color: COLORS.DARK_BLUE,
  },
  smallestText: {
    fontFamily: Fonts.FONT_NORMAL_NUNITO,
    fontSize: 13,
    lineHeight: 15,
    color: COLORS.DARK_BLUE,
  },
  linkText: {
    fontFamily: Fonts.FONT_NORMAL_NUNITO,
    fontSize: 13,
    lineHeight: 15,
    color: COLORS.TITLE,
  },
  buttonText: {
    fontFamily: Fonts.FONT_BOLD_NUNITO,
    fontSize: 18,
    lineHeight: 20,
    color: COLORS.WHITE,
  },
  errorText: {
    fontFamily: Fonts.FONT_SEMIBOLD_NUNITO,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.ERROR_TEXT,
  },
  smallText1: {
    fontFamily: Fonts.FONT_SEMIBOLD_NUNITO,
    fontSize: 11,
    lineHeight: 15.62,
    color: COLORS.DARK_BLUE,
  },
  text1: {
    fontFamily: Fonts.FONT_BOLD_NUNITO,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.DARK_BLUE,
  },
  text2: {
    fontFamily: Fonts.FONT_BOLD_NUNITO,
    fontSize: 14,
    lineHeight: 25,
    color: COLORS.DARK_BLUE,
  },
});
