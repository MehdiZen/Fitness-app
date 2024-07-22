import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Text, TextInput, View} from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{uri: 'https://spearswms.com/wp-content/uploads/sites/10/2020/12/peekaboo-861x484-1.jpg'}}
          style={styles.hiddingBanner}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
       <ThemedText>Concept cache-cache zone inconnue, zone qui se rétrécie</ThemedText>
       <ThemedText style={styles.textNickName}>Inscrit un pseudo pour la session</ThemedText>
       <TextInput style={styles.nickNameInput} placeholder="Terminatosorus"></TextInput>
      </ThemedView>
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
    paddingRight:'auto',
  }
});
