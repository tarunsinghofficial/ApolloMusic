import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { TabOneParamList, TabTwoParamList } from '../types';
import { RootTabParamList } from '../types';
import AlbumScreen from "../screens/AlbumScreen";
import colors from '../config/colors';
import AudioList from '../app/screens/AudioList';
import Player from '../app/screens/Player';
import TabOneScreen from '../screens/TabOneScreen';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.bottomTab, height: 55 }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ size }) => <Entypo name="home" color={colors.white} size={size} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name='AudioList'
        component={AudioList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='headset' size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Player'
        component={Player}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='compact-disc' size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Radio'
        component={TabOneScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="radio" color={color} size={30} style={{ marginBottom: -3 }} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}



const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator({navigation}) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home', headerShown: false, }}

      />
      <TabOneStack.Screen
        name="AlbumScreen"
        component={AlbumScreen}
        options={{ headerTitle: 'Album', headerShown: false, }}
      />
    </TabOneStack.Navigator>


  );
}

export default BottomTabNavigator;