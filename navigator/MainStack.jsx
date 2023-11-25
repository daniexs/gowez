import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home"
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import History from "../pages/History";
import DetailEvent from "../pages/DetailEvent";
import CyclingPage from "../pages/CyclingPage";
import MapV3 from "../pages/CreateEvent";
import CyclingPage_Party from "../pages/CyclingPage-Party";
import Summary from "../pages/Summary";

export default function MainStack() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator >
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="CyclingParty" component={CyclingPage_Party} />
            <Stack.Screen name="Cycling" component={CyclingPage} />
            <Stack.Screen name="Summary" component={Summary} options={{ headerShown: false }}/>

       
        </Stack.Navigator>
    )

}

