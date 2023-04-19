import { StyleSheet } from 'react-native';
import { CARD } from '../utils/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5,
  },
  image: {
    width: CARD.WIDTH,
    height: 300,
    borderRadius: CARD.BORDER_RADIUS,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    borderRadius: CARD.BORDER_RADIUS,
  },
  name: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  choiceContainer: {
    position: 'absolute',
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{ rotate: '-30deg' }],
  },
  nopeContainer: {
    right: 45,
    transform: [{ rotate: '30deg' }],
  },
});
