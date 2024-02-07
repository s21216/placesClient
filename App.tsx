import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from './src/helpers/config/theme';
import { AuthProvider } from './src/helpers/contexts/AuthContext';
import RootNavigator from './src/navigators/RootNavigator';
import './src/helpers/utils/sheets.tsx';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <SheetProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </SheetProvider>
            <StatusBar translucent />
          </PaperProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
