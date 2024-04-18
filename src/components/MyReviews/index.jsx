import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

import useSignInCheck from '../../hooks/useSignInCheck';
import useDeleteReview from '../../hooks/useDeleteReview';

import theme from '../../theme';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColors.main,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const [deleteReviewId, setDeleteReviewId] = useState();
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();
  const { user, refetch } = useSignInCheck(true);

  const reviews = user
    ? user?.reviews?.edges.map(edge => edge.node)
    : [];

  useEffect(() => {
    const deletion = async () => {
      if (deleteReviewId) {
        try {
          await deleteReview(deleteReviewId);
          await refetch();
        } catch (e) {
          console.log(e);
        }
      }
    };
    deletion();
  }, [deleteReviewId]);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) =>
        <ReviewItem
          review={item}
          navigate={navigate}
          setDeleteReviewId={setDeleteReviewId}
        />
      }
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;