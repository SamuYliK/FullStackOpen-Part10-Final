import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.backgroundColors.signInView,
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
  signUpView: {
    flexDirection: 'column',
    marginLeft: '5%',
    marginTop: '3%',
    marginRight: '5%',
    marginBottom: '3%',
  },
  signUpButton: {
    borderRadius: 3,
    padding: 7,
    flexGrow: 1,
    textAlign: 'center',
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters long.')
    .max(30, 'Username can be maximum 30 characters long.'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long.')
    .max(50, 'Passwrod can be maximum 50 characters long.'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

export const SignUpForm = ({ onSubmit }) => {
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
          formik.touched.username && formik.errors.username ? styles.inputFieldsError : styles.inputViews
        ]}
      >
        <TextInput
          style={styles.inputFields}
          placeholder='Username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
      </View>
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText} color='errorColor'>
          {formik.errors.username}
        </Text>
      )}
      <View
        style={[
          styles.inputViews,
          formik.touched.password && formik.errors.password ? styles.inputFieldsError : styles.inputViews
        ]}
      >
        <TextInput
          style={styles.inputFields}
          placeholder='Password'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
        />
      </View>
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText} color='errorColor'>
          {formik.errors.password}
        </Text>
      )}
      <View
        style={[
          styles.inputViews,
          formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? styles.inputFieldsError : styles.inputViews
        ]}
      >
        <TextInput
          style={styles.inputFields}
          placeholder='Password confirmation'
          value={formik.values.passwordConfirmation}
          onChangeText={formik.handleChange('passwordConfirmation')}
          secureTextEntry
        />
      </View>
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={styles.errorText} color='errorColor'>
          {formik.errors.passwordConfirmation}
        </Text>
      )}
      <View style={styles.signUpView}>
        <Pressable
          onPress={formik.handleSubmit}
        >
          <Text
            style={styles.signUpButton}
            color='textTertiary'
            fontWeight='bold'
            backgroundColor='backgroundPrimary'
          >
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;