import { View, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '10%',
    marginBottom: '2.5%',
    justifyContent: 'space-between',
  },
  infoView: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexBasis: '25%'
  },
  infoItem: {
    alignSelf: 'center',
  },
});

const RepositoryItemStatistics = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoView}>
        <Text fontWeight='bold' style={styles.infoItem}>
          {item.stargazersCount/1000 >= 1 ? (item.stargazersCount/1000).toFixed(1)+'k' : item.stargazersCount}
        </Text>
        <Text style={styles.infoItem}>
          Stars
        </Text>
      </View>
      <View style={styles.infoView}>
        <Text fontWeight='bold' style={styles.infoItem}>
          {item.forksCount/1000 >= 1 ? (item.forksCount/1000).toFixed(1)+'k' : item.forksCount}
        </Text>
        <Text style={styles.infoItem}>
          Forks
        </Text>
      </View>
      <View style={styles.infoView}>
        <Text fontWeight='bold' style={styles.infoItem}>
          {item.reviewCount/1000 >= 1 ? (item.reviewCount/1000).toFixed(1)+'k' : item.reviewCount}
        </Text>
        <Text style={styles.infoItem}>
          Reviews
        </Text>
      </View>
      <View style={styles.infoView}>
        <Text fontWeight='bold' style={styles.infoItem}>
          {item.ratingAverage}
        </Text>
        <Text style={styles.infoItem}>
          Rating
        </Text>
      </View>
    </View>
  );
};

export default RepositoryItemStatistics;