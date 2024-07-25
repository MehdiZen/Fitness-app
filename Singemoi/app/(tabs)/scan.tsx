import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Modal, Pressable, StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  interface foodDetails {
    abbreviated_product_name: string,
    brands: string,
    categories: string,
    ecoscore_grade: string,
    ecoscore_score: number,
    image_front_thumb_url: string,
  }
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedDetails, setScannedDetails] = useState<foodDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: any) => {
    setScanned(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
      const result = await response.json();
      if (result.product) {
        setScannedDetails(result.product)
      } else {
        setScannedDetails(null);
      }
    } catch (error) {
      console.error(error);
      setScannedDetails(null);
    } finally {
      setLoading(false);
      setModalVisible(true);
    };
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["upc_a", "ean13"],
        }}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />
          <View style={styles.middleRow}>
            <View style={styles.sideOverlay} />
            <View style={styles.rectangle} />
            <View style={styles.sideOverlay} />
          </View>
          <View style={styles.bottomOverlay} />
          {/* j'aurais jamais trouvé ça tout seul */}
        </View>
      </CameraView>
      {scanned && (
        <View style={styles.rescanContainer}>
          <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        </View>
      )}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalSuperposition}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : scannedDetails ? (
              <>
                <Text style={styles.modalTitle}>Item Details</Text>
                <Image
                  style={{ width: 200, height: 50 }}
                  source={{ uri: scannedDetails.image_front_thumb_url }}
                />
                <Text style={styles.modalText}>Name: {scannedDetails.abbreviated_product_name}</Text>
                <Text style={styles.modalText}>Brand: {scannedDetails.brands}</Text>
                <Text style={styles.modalText}>Category: {scannedDetails.categories}</Text>
                <Text style={styles.modalText}>Grade: {scannedDetails.ecoscore_grade.toUpperCase()}</Text>
                <Text style={styles.modalText}>Grade: {scannedDetails.ecoscore_score}/100</Text>
              </>
            ) : (
              <Text style={styles.modalText}>Item not found</Text>
            )}
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const greyBackground = 'rgba(0, 0, 0, 0.7)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rescanContainer: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -75 }],
    width: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: greyBackground,
  },
  middleRow: {
    flexDirection: 'row',
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: greyBackground,
  },
  rectangle: {
    width: 280,
    height: 150,
    borderWidth: 5,
    borderColor: 'red',
    borderRadius: 5
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: greyBackground,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalSuperposition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

});

