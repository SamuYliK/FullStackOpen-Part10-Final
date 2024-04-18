import { View } from 'react-native';
import { Link } from 'react-router-native';

import Text from '../Text';

const AppBarTab = ({ text, link }) => {
  return (
    <View style={{ paddingLeft: 5 }}>
      <Link to={link}>
        <Text
          color='textTertiary'
          fontWeight='bold'
          style={{ paddingBottom: 10 }}
        >
          {text}
        </Text>
      </Link>
    </View>
  );
};

export default AppBarTab;