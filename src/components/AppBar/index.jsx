import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import useSignInCheck from '../../hooks/useSignInCheck';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.appBar,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'space-around',
    marginRight: 5,
  }
});

const AppBar = () => {
  const { user } = useSignInCheck();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scroll}
      >
        <AppBarTab text='Repositories' link='/' />
        {
          user ? <AppBarTab text='Create a review' link='/review' /> : null
        }
        {
          user ? <AppBarTab text='My reviews' link='/myreviews' /> : null
        }
        <AppBarTab
          text={ user ? 'Sign out' : 'Sign in' }
          link={ user ? '/signout' : '/signin' }
        />
        {
          user ? null : <AppBarTab text='Sign up' link='/signup' />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;