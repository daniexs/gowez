import {create} from 'zustand';
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"

const useMyStore = create((set) => ({
  isLoggedIn : false,
  setAccessToken: async (value) => {
      return set(() => ({isLoggedIn : value}))
  },
  getAccessToken: async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      return set({ access_token });
    } catch (error) {
      Alert.alert('Error getting Access Token : ', error);
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem('access_token');
     return set(() => ({ isLoggedIn: false }));
  }
}));

export default useMyStore;
