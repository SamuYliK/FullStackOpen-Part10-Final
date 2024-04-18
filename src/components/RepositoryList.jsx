import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchBar: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: theme.backgroundColors.searchBar,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ selectedOrdering, setSelectedOrdering, searchFilter, setSearchFilter }) => {
  return (
    <View>
      <Searchbar
        style={styles.searchBar}
        placeholder='Search'
        onChangeText={setSearchFilter}
        value={searchFilter}
      />
      <Picker
        selectedValue={selectedOrdering}
        onValueChange={(itemValue) =>
          setSelectedOrdering(itemValue)
        }
      >
        <Picker.Item
          label='Latest repositories'
          value='latest'
        />
        <Picker.Item
          label='Highest rated repositories'
          value='highest'
        />
        <Picker.Item
          label='Lowest rated repositories'
          value='lowest'
        />
      </Picker>
    </View>
  )
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader
        selectedOrdering={props.selectedOrdering}
        setSelectedOrdering={props.setSelectedOrdering}
        searchFilter={props.searchFilter}
        setSearchFilter={props.setSearchFilter}
      />
    );
  };

  render() {
    const props = this.props;

    if (props.singleView) {
      return (
        <RepositoryItem singleView={true}/>
      );
    }

    return (
      <FlatList
        data={props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({item}) =>
          <Pressable
            onPress={() => props.navigate(`repositoryItem/${item.id}`)}
          >
            <RepositoryItem item={item} singleView={false} />
          </Pressable>
        }
      />
    );
  }
}

const RepositoryList = ({ singleView }) => {
  const navigate = useNavigate();
  const [selectedOrdering, setSelectedOrdering] = useState();
  const [searchFilter, setSearchFilter] = useState('');
  const [searchKeyword] = useDebounce(searchFilter, 500);
  const first = 8;
  const { repositories, fetchMore } = useRepositories(selectedOrdering, searchKeyword, first);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer repositories={repositoryNodes} singleView={singleView} selectedOrdering={selectedOrdering} setSelectedOrdering={setSelectedOrdering} searchFilter={searchFilter} setSearchFilter={setSearchFilter} navigate={navigate} onEndReach={onEndReach} />;
};

export default RepositoryList;