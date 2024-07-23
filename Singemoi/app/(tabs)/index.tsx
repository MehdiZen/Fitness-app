import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  FlatList,
  Pressable
} from 'react-native';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
        headers: {
          'x-app-id': '1d4750fc', 
          'x-app-key': 'c9c83622c701dc845c112fd353748592',
        },
      });
      const data = await response.json();
      setResults(data.common);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.food_name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Nutrition Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a food"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={fetchData}
      />
      <Pressable style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.food_name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
});

export default App;