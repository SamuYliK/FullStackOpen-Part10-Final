import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import theme from '../theme';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignOut from './SignOut';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgroundColors.main,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList singleView={false} />} />
        <Route path='/repositoryItem/:id' element={<RepositoryList singleView={true}/>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signout' element={<SignOut />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/review' element={<ReviewForm />}></Route>
        <Route path='/myreviews' element={<MyReviews />}></Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;