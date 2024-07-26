import React, { useState, useEffect } from 'react';
import { View, Text, Platform, PermissionsAndroid, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [StepCount, setStepCount] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const getPedometerAvailability = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));
    };

    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const storedPermission = await AsyncStorage.getItem('activityRecognitionPermission');
        if (storedPermission === 'granted') {
          setPermissionGranted(true);
          getPedometerAvailability();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
              {
                title: 'Activity Recognition Permission',
                message: 'This app needs access to your activity to track your steps.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              setPermissionGranted(true);
              await AsyncStorage.setItem('activityRecognitionPermission', 'granted');
              getPedometerAvailability();
            } else {
              console.log('Activity recognition permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      } else {
        setPermissionGranted(true);
        getPedometerAvailability();
      }
    };

    const loadStoredSteps = async () => {
      const today = new Date().toISOString().split('T')[0];
      const storedSteps = await AsyncStorage.getItem(today);
      if (storedSteps) {
        setTotalSteps(parseInt(storedSteps));
      }
    };

    requestPermission();
    loadStoredSteps();

    let subscription;
    if (permissionGranted) {
      subscription = Pedometer.watchStepCount(result => {
        const newStepCount = result.steps;
        setStepCount(newStepCount);
        const today = new Date().toISOString().split('T')[0];
        AsyncStorage.setItem(today, newStepCount.toString());
        setTotalSteps(newStepCount);
      });
    }

    return () => subscription && subscription.remove();
  }, [permissionGranted]);

  useEffect(() => {
    const updateDailySteps = async () => {
      const today = new Date().toISOString().split('T')[0];
      const storedSteps = await AsyncStorage.getItem(today);
      if (storedSteps) {
        setTotalSteps(parseInt(storedSteps));
      } else {
        await AsyncStorage.setItem(today, StepCount.toString());
      }
    };

    updateDailySteps();
  }, [StepCount]);

  const progress = Math.min(totalSteps / 10000, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Pedometer Status</Text>
      <Text style={styles.text}>Steps taken today: {totalSteps}</Text>
      <Text style={styles.text}>Objective: 10,000 steps</Text>
      <Progress.Bar 
        progress={progress} 
        width={300} 
        height={20} 
        color={"#3b5998"} 
        borderRadius={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b6e0bf',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
