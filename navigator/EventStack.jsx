import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailEvent from "../pages/DetailEvent";
import Event from "../pages/Event"
import MapV3 from "../pages/CreateEvent";
import CreateEventForm from "../pages/CreateEventForm";
import Summary from "../pages/Summary";

export default function EventStack(){
    const Stack = createNativeStackNavigator()
    return(
        <Stack.Navigator >
            <Stack.Screen name="Event" component={Event} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailEvent} options={{ headerShown: true }} />
            <Stack.Screen name="Create Location" component={MapV3} options={{ headerShown: true }} />
            <Stack.Screen name="Create Event" component={CreateEventForm} options={{ headerShown: true }} />
            <Stack.Screen name="Summary" component={Summary} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
    
}

