import React from 'react';
import { View } from 'react-native';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from './middleware';
import MainMenu from './components/MainMenu'
import Graph from './components/Graph'
import AddSession from './components/AddSession'
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { lightGray, white, darkBlue, backgroundGray } from './utils/colors'
import { SimpleLineIcons } from '@expo/vector-icons';
import GraphMenu from './components/GraphMenu'
import Settings from './components/Settings'
import { AntDesign } from '@expo/vector-icons'
import SessionList from './components/SessionList'
import ImportData from './components/ImportData'
import TotalSummary from './components/TotalSummary'

const Tabs = createBottomTabNavigator()

const TabNav = () => (
  <Tabs.Navigator
    initialRouteName="Main Menu"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "Menu") {
          icon = (
            <FontAwesome name="plus-square" size={size} color={color} />
          );
        } else if (route.name === "Graphs") {
          icon = (
            <SimpleLineIcons name="graph" size={size} color={color} />
          );
        } else if (route.name === "Settings") {
          icon = (
            <AntDesign name="setting" size={size} color={color} />
          );
        }
        return icon;
      }
    })}
    tabBarOptions={{
      header: null,
      activeTintColor: Platform.OS === "ios" ? lightGray : lightGray,
      inactiveTintColor: Platform.OS === 'ios' ? white : white,
      showIcon: true,
      style: {
        height: 80,
        backgroundColor: Platform.OS === "ios" ? darkBlue : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }}
  >
    <Tabs.Screen name="Menu" component={MainMenu} />
    <Tabs.Screen name="Graphs" component={GraphMenu} />
    <Tabs.Screen name="Settings" component={Settings} />
  </Tabs.Navigator>
);

const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name="Main Menu"
      component={TabNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Add A Session"
      component={AddSession}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: backgroundGray,
        }
      }} />
    <Stack.Screen
      name="Graph"
      component={Graph}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: backgroundGray,
        }
      }} />
    <Stack.Screen
      name="Session List"
      component={SessionList}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: backgroundGray,
        }
      }} />
    <Stack.Screen
      name="Import"
      component={ImportData}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: backgroundGray,
        }
      }} />
    <Stack.Screen
      name="Summary"
      component={TotalSummary}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: backgroundGray,
        }
      }} />
  </Stack.Navigator>
);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, composeWithDevTools(middleware))}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
