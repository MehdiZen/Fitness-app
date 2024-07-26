import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  FlatList,
  Pressable,
  Image,
  Modal
} from 'react-native';

const App = () => {
  interface FoodDetails {
    food_name: string;
    nf_calories?: number;
    nf_total_fat?: number;
    nf_protein?: number;
    nf_total_carbohydrate?: number;
  }

  interface foodElement {
    item: {
      food_name: string;
      photo: {
        thumb: string
      };
    }
  }


  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [food, setFood] = useState<FoodDetails | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);


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
      console.log('result=>', data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSelected = async (foodName: string) => {
    try {
      const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': '1d4750fc',
          'x-app-key': 'c9c83622c701dc845c112fd353748592',
        },
        body: JSON.stringify({ query: foodName }),
      });
      const data = await response.json();
      setFood(data.foods[0]);
      console.log('food =>', data.foods[0])
      setModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ( {item}: any) => (
    <Pressable style={styles.item} onPress={() => fetchSelected(item.food_name)}>
      <Image
        style={{width: 50, height: 50}} 
        source={{uri: item.photo.thumb}}
      />

      <Text style={styles.title}>{item.food_name}</Text>
    </Pressable>
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
        keyExtractor={({item, index}: any) => index} />

      <Modal visible={isModalVisible}>
        <View style={styles.modalContent}>
          {food ? (
            <>
              <Text style={styles.modalTitle}>{food.food_name}</Text>
              {food.nf_calories && <Text style={styles.modalElement}>Calories: {food.nf_calories}</Text>}
              {food.nf_total_fat && <Text style={styles.modalElement}>Total Fat: {food.nf_total_fat}g</Text>}
              {food.nf_protein && <Text style={styles.modalElement}>Protein: {food.nf_protein}g</Text>}
              {food.nf_total_carbohydrate && <Text style={styles.modalElement}>Total Carbohydrate: {food.nf_total_carbohydrate}g</Text>}
            </>
          ) : (<Text>Loading...</Text>)}
          <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    padding: 16,
    backgroundColor: '#b6e0bf',
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
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center'
  },
  modalContent: {
    height: '100vh',
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
 
  },
  modalTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 26,
  },
  modalElement: {
   fontSize: 26,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  foodLogo: {
    width: 50,
    height: 50
  }
});

export default App;