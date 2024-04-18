import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import createReview from '../hooks/createReview';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.backgroundColors.reviewCreation,
  },
  inputViews: {
    borderWidth: 1,
    borderRadius: 3,
    marginLeft: '5%',
    marginTop: '3%',
    marginRight: '5%',
  },
  inputFields: {
    marginLeft: '3%',
  },
  inputFieldsError: {
    borderColor: theme.colors.textError,
  },
  errorText: {
    marginLeft: '5%',
  },
  buttonView: {
    flexDirection: 'column',
    marginLeft: '5%',
    marginTop: '3%',
    marginRight: '5%',
    marginBottom: '3%',
  },
  createReviewButton: {
    borderRadius: 3,
    padding: 7,
    flexGrow: 1,
    textAlign: 'center',
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .integer()
    .min(0, 'Rating must be an integer between 0 and 100.')
    .max(100, 'Rating must be an integer between 0 and 100.'),
  text: yup
    .string()
})

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputViews,
          formik.touched.ownerName && formik.errors.ownerName ? styles.inputFieldsError : styles.inputViews
        ]}
      >
        <TextInput
          style={styles.inputFields}
          placeholder='Repository owner name'
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
        />
      </View>
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText} color='errorColor'>
          {formik.errors.ownerName}
        </Text>
      )}
      <View
        style={[
          styles.inputViews,
          formik.touched.repositoryName && formik.errors.repositoryName ? styles.inputFieldsError : styles.inputViews
        ]}
      >
        <TextInput
          style={styles.inputFields}
          placeholder='Repository name'
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
        />
      </View>
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText} color='errorColor'>
          {formik.errors.repositoryName}
        </Text>
      )}
      <View
        style={[
          styles.inputViews,
          formik.touched.rating && formik.errors.rating ? styles.inputFieldsError : styles.inputViews
        ]}
      >
        <TextInput
          style={styles.inputFields}
          placeholder='Rating between 0 and 100'
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
        />
      </View>
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText} color='errorColor'>
          {formik.errors.rating}
        </Text>
      )}
      <View
        style={styles.inputViews}
      >
        <TextInput
          style={styles.inputFields}
          placeholder='Review'
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          multiline
        />
      </View>
      <View style={styles.buttonView}>
        <Pressable
          onPress={formik.handleSubmit}
        >
          <Text
            style={styles.createReviewButton}
            color='textTertiary'
            fontWeight='bold'
            backgroundColor='backgroundPrimary'
          >
            Create a review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const ReviewForm = () => {
  const [reviewCreation] = createReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values;
    try {
      const intRating = parseInt(rating);
      const review = {
        ownerName,
        rating: intRating,
        repositoryName,
        text,
      }
      const { data } = await reviewCreation({ review });
      navigate(`/repositoryItem/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;