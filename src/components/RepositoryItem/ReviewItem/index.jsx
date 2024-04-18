import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from '../../Text';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  rating: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 1000000,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  info: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: '15%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  basicInfo: {
    flexWrap: 'wrap',
    flexBasis: '100%',
  },
  infoText: {
    flexWrap: 'wrap',
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.rating}
      >
        <Text
          fontWeight='bold'
          color='primary'
        >
          {review.rating}
        </Text>
      </View>
      <View
        style={styles.info}
      >
        <Text
          style={styles.basicInfo}
          fontWeight='bold'
        >
          {review.user.username}
        </Text>
        <Text
          color='textSecondary'
          style={styles.basicInfo}
        >
          { format(review.createdAt, 'dd.MM.yyyy') }
        </Text>
        <Text
          style={styles.infoText}
        >
          {review.text}
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;