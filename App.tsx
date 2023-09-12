import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/components/navigators/RootNavigator';
import { theme } from './src/helpers/config/theme';
import { AuthProvider } from './src/helpers/contexts/AuthContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
