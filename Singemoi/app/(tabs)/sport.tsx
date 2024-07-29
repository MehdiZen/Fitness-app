import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const App = () => {
  interface exoType {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
  }

  const [exercices, setExercices] = useState<exoType[]>([]);
  const [currentExercise, setCurrentExercise] = useState<exoType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
    iNeedAHero();
  }, []);

  const iNeedAHero = async () => {
    interface weekPrograms {
      [key: string]: {
        workout: string[];
      };
    }


    const Week: weekPrograms = {
      Monday: {
        workout: ['biceps', 'lats', 'middle_back', 'lower_back']
      },
      Tuesday: {
        workout: ['triceps', 'chest', 'forearms']
      },
      Wednesday: {
        workout: ['glutes', 'hamstrings', 'quadriceps', 'calves']
      },
      Thursday: {
        workout: ['neck', 'traps', 'abdominals']
      },
      Friday: {
        workout: ['triceps', 'chest', 'forearms']
      },
      Sunday: {
          workout: ['glutes', 'hamstrings', 'quadriceps', 'calves']
      },
      Saturday: {
        workout: ['abdominals', 'abductors', 'adductors' ]
      }
    };

    let date = new Date();
    const today = date.toLocaleDateString('en-US', { weekday: 'long' });
    setCurrentDate(today);

    if (Week[today]) {
      const workouts = Week[today].workout;
      const exercisePromises = workouts.map((muscle) => fetchExercise(muscle));
      const exerciseResults = await Promise.all(exercisePromises);
      setExercices(exerciseResults.flat());
    }
  };

  const fetchExercise = async (muscle: string) => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '9ALDxKSi+vFnYQT2UWEjwQ==9bMdBQzhtJAZPJay',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const openModal = (exercise: exoType) => {
    setCurrentExercise(exercise);
    setModalVisible(true);
  };

  const closeModal = () => {
    setCurrentExercise(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{currentDate}'s workout</Text>

      <FlatList
        data={exercices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>{item.muscle}</Text>
            <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
              <Text>{item.name}</Text>
              <Text>{item.difficulty}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {currentExercise && (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalSuperposition}>
              <View style={styles.modalContent}>
          <ScrollView indicatorStyle="white">
                <Text style={styles.modalTitle}>{currentExercise.name}</Text>
                <Text style={styles.modalTitles}>Type: {currentExercise.type}</Text>
                <Text style={styles.modalTitles}>Muscle: {currentExercise.muscle}</Text>
                <Text style={styles.modalTitles}>Equipment: {currentExercise.equipment}</Text>
                <Text style={styles.modalTitles}>Difficulty: {currentExercise.difficulty}</Text>
                <Text style={styles.modalText}>Instructions: {currentExercise.instructions}</Text>
          </ScrollView>
                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </View>
            </View>
        </Modal>
      )}
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2e7d32',
  },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2e7d32',
  },
  modalSuperposition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 5,
  },
  modalTitles: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  closeButton: {
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default App;
