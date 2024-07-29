// import React, { useEffect } from 'react';
// import { View, Text, Platform } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// import firebase from '../services/firebaseConfig';

// export const Notif = () => {
//   useEffect(() => {
//     if (Constants.isDevice) {
//       registerForPushNotificationsAsync().then(token => {
//         console.log(token);
//         if (token) {
//           // Enregistrer le token auprès de Firebase
//           firebase.messaging().getToken().then((firebaseToken) => {
//             console.log('Firebase token:', firebaseToken);
//           });
//         }
//       });

//       Notifications.addNotificationReceivedListener(_handleNotification);
//       Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }
//   }, []);

//   const _handleNotification = (notification: Notifications.Notification) => {
//     console.log(notification);
//   };

//   const _handleNotificationResponse = (response: Notifications.NotificationResponse) => {
//     console.log(response);
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Notifications Example</Text>
//     </View>
//   );
// };

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

// export default App;
