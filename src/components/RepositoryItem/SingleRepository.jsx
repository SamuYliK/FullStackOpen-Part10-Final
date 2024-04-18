import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useParams } from 'react-router-native';

import getSingleRepository from '../../hooks/getSingleRepository';
import RepositoryItemBasicInfo from './RepositoryItemBasicInfo';
import RepositoryItemStatistics from './RepositoryItemStatistics';
import RepositoryItemButton from './RepositoryItemButton';
import ReviewItem from './ReviewItem';

import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColors.main,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItemBasicInfo item={repository} />
      <RepositoryItemStatistics item={repository} />
      <RepositoryItemButton url={repository.url} />
      <ItemSeparator />
    </View>
  );
};

const SingleRepository = () => {
  const first = 8;
  const { id } = useParams();
  const { repository, fetchMore } = getSingleRepository(id, first);

  const reviews = repository
    ? repository?.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  }

  if(!repository) {
    return <View><Text>Loading repository...</Text></View>;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;