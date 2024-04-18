import { View, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '2.5%',
    marginBottom: '2.5%',
    marginRight: '2.5%',
    justifyContent: 'center',
  },
  button: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center'
  },
});

const RepositoryItemButton = ({ url }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => Linking.openURL(url)}
      >
        <Text
          color='textTertiary'
          fontWeight='bold'
        >
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  );
};

export default RepositoryItemButton;