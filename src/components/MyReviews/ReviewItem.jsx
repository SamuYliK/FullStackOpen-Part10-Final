import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: theme.backgroundColors.myReviews,
    padding: 15
  },
  infoContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
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
  },
  info: {
    marginLeft: 10,
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
  },
  repositoryButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 3,
    flexGrow: 1,
    alignItems: 'center',
    marginRight: 7.5,
  },
  deleteButton: {
    backgroundColor: theme.colors.textError,
    padding: 10,
    borderRadius: 3,
    flexGrow: 1,
    alignItems: 'center',
    marginLeft: 7.5,
  },
  buttonText: {
    marginLeft: 10,
    marginRight: 10,
  }
});


const ReviewItem = ({ review, navigate, setDeleteReviewId }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
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
            {review.repository.fullName}
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
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.repositoryButton}
          onPress={() => navigate(`/repositoryItem/${review.repository.id}`)}
        >
          <Text
            fontWeight='bold'
            color='textTertiary'
            style={styles.buttonText}
          >
            View repository
          </Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert(
              'Delete review',
              'Are you sure you want to delete this review?', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'DELETE', onPress: () => setDeleteReviewId(review.id)},
              ])
          }
        >
          <Text
            fontWeight='bold'
            color='textTertiary'
            style={styles.buttonText}
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewItem;