import React, { useEffect, useRef, useState } from 'react';
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
import * as Notifications from 'expo-notifications';
import { pushNotificationToken } from '../../services/pushNotificationToken'; 
import { getWeather } from '@/components/weatherAPI';
const App = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  
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

  // Partie notification + meteox
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const [weather, setWeather] = useState<number>(10);

  const handleFetchWeather = async () => {
    const data = await getWeather();
    console.log('cheers');
    setWeather(data.main.temp);
  };
  handleFetchWeather();
  useEffect(() => {
    pushNotificationToken();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);


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
        keyExtractor={(item, index) => index.toString()} />

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="NOTIFICATOR B28V3600X"
        onPress={async () => {
          await handleFetchWeather();
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Singemoi veut ton bien",
              body: weather > 20 ? `${weather}° dehors? Va boire de l'eau il fait soif`: `Ok il fait que ${weather}°, mais bois un verre d'eau quand même stp`,
              data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
          });
        }}
      />
    </View>

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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2e7d32',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10,
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e7d32',
  },
  modalElement: {
    fontSize: 20,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  foodLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default App;