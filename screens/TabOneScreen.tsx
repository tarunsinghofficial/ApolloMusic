import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootTabScreenProps } from '../types';

//radio
import { RadioBrowserApi } from 'radio-browser-api'
import RadioCard from '../components/RadioCard';
import RadioAnimator from '../components/RadioAnimator';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState('all');

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data);
      console.log(data)
    });
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

    const stations = await api
      .searchStations({
        language: "english",
        tag: stationFilter,
        limit: 30
      })
      .then((data) => {
        return data;
      });

    return stations;
  };

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock"
  ];

  if (!stations) {
    return (<View style={{
      backgroundColor: '#D6A9FF',
      flex: 1
    }}>
      <RadioAnimator visible={true} />
    </View>
    )
  }

  return (
    <ScrollView>
      <LinearGradient colors={['#8400ff', '#2d067c', '#020024']}>
        <StatusBar
          backgroundColor={'#8400ff'}
        />
        <View style={{
          height: 120,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image source={require('../assets/images/radio-back.png')} style={{ width: '100%', height: 350, }} />
        </View>
        <Text style={{
          color: 'white',
          fontSize: 30,
          fontWeight: 'bold',
          marginLeft: 30,
          bottom: 50
        }}>Explore Radio Stations</Text>
        <Text style={{
          color: 'white',
          fontSize: 15,
          marginLeft: 30,
          bottom: 50
        }}>Hitting you with hits, every day!</Text>
        <FlatList
          numColumns={2}
          data={stations}
          keyExtractor={(stations) => stations.id}
          renderItem={({ item }) => (
            <RadioCard
              title={item.name}
              image={item.favicon}
              uri={item.urlResolved}
            />
          )}
          style={{
            margin: 15,
          }}
        />
      </LinearGradient>
    </ScrollView>
  );
}

