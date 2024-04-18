import { View, Image, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '2.5%',
    marginTop: '2.5%',
    marginBottom: '2.5%',
    marginRight: '15%',
    alignContent: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 3,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '5%'
  },
  text: {
    flexWrap: 'wrap',
    flexBasis: '100%',
  },
  language: {
    padding: 3,
    borderRadius: 3,
  }
});

const RepositoryItemBasicInfo = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: item.ownerAvatarUrl }}
      />
      <View style={styles.info}>
        <Text
          style={styles.text}
          fontWeight='bold'
        >
          {item.fullName}
        </Text>
        <Text
          style={styles.text}
        >
          {item.description}
        </Text>
        <Text
          style={styles.language}
          color='textTertiary'
          backgroundColor='backgroundPrimary'
        >
          {item.language}
        </Text>
      </View>
    </View>
  );
};

export default RepositoryItemBasicInfo;