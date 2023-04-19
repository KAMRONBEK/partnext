import { Dimensions } from 'react-native';

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

export const BaseStyle = {
  DEVICE_HEIGHT: y,
  DEVICE_WIDTH: x,
  PADDING: (x / 100) * 5,
};
