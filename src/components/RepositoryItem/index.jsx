import { View, StyleSheet } from 'react-native';

import theme from '../../theme';

import RepositoryItemBasicInfo from './RepositoryItemBasicInfo';
import RepositoryItemStatistics from './RepositoryItemStatistics';
import SingleRepository from './SingleRepository'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.repositoryItem,
    display: 'flex',
    flexDirection: 'column',
  }
})

const RepositoryItem = ({ item, singleView }) => {
  return (
    <View testID='repositoryItem' style={styles.container}>
      {singleView
        ? <View>
          <SingleRepository />
        </View>
        : <View>
          <RepositoryItemBasicInfo item={item} />
          <RepositoryItemStatistics item={item} />
        </View>
      }
    </View>
  );
};

export default RepositoryItem;