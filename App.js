import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import { Provider as UserProvider } from './context/UserContext';
import { ModalPortal } from 'react-native-modals';
import StackNavigator from './navigation/StackNavigator';

import store from './store';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <UserProvider>
            <StackNavigator />
            <ModalPortal />
          </UserProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
