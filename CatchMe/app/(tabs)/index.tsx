import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Text, TextInput, View } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        // headerImage={
        // <Image
        headerImage={<Ionicons size={310} name="code-slash" style={styles.hiddingBanner} />}>
         {/* style={styles.hiddingBanner} */}
         {/* /> */}
       {/* }> */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">CatchMe!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>Une zone de jeu qui rétrécit pour des parties toujours plus intenses. Prêt à devenir le maître du cache-cache ?</ThemedText>
        <ThemedText style={styles.textNickName}>Inscrit un pseudo pour la session</ThemedText>
        <TextInput style={styles.nickNameInput} placeholder="PseudosorusRex"></TextInput>
      </ThemedView>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  hiddingBanner: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  nickNameInput: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderRadius: 15,
    padding: 10,
    textAlign: 'center',
  },
  textNickName: {
    marginTop: 20,
    paddingLeft: 25,
    paddingRight: 'auto',
  }
});
