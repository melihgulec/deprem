import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import Axios from 'axios';
import Colors from '../constants/Colors';
import { ListItem, IconButton } from '../components';

function Search() {
  const [searchResult, setResult] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  fetchData = async () => {
    await Axios.get('https://api.orhanaydogdu.com.tr/deprem/live.php?limit=100')
      .then(res => setResult(res.data.result))
      .catch(err => alert(err));
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <IconButton
          name="filter"
          style={{ position: 'absolute', top: 20, right: 10 }}
          color={Colors.white}
        />

        <Text style={styles.titleText}>Deprem</Text>
        <Text style={styles.subtitleText}>Arama Yap</Text>
        <View style={styles.inputView}>
          <TextInput style={styles.textInput} />
          <IconButton
            onPress={fetchData}
            name="magnify"
            color={Colors.primary}
          />
        </View>
      </View>
      <View style={styles.contentView}>
        <FlatList
          data={searchResult}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ListItem
            title={item.title}
            mag={item.mag}
            date={item.date}
          />}
        />
      </View>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    backgroundColor: Colors.primary,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: Colors.white,
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.white,
  },
  inputView: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    width: 300,
    bottom: -30,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  textInput: {
    width: '90%',
  },
  contentView: {
    flex: 1,
    backgroundColor: Colors.white,
    zIndex: -1,
    paddingTop: 40,
  }
});