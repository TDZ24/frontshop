import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './controllers/HomeTab';

const Stack = createNativeStackNavigator()

export default function App(){
  return (
    <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name='Home' component={HomeTabs} options={{title: 'Ssitema de almacen ' }} />
     </Stack.Navigator>
    </NavigationContainer>
   );
}

