import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, ScrollView, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { API, graphqlOperation } from 'aws-amplify';
import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import { getAlbum } from '../src/graphql/queries'
import Animator from '../components/Animator';


const AlbumScreen = () => {

  const route = useRoute();
  const albumId = route.params.id;

  const [album, setAlbum] = useState(null);


  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const data = await API.graphql(graphqlOperation(getAlbum, { id: albumId }));
        setAlbum(data.data.getAlbum);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAlbumDetails();
  }, []);

  if (!album) {
    return (<View style={{
      backgroundColor: '#D6A9FF',
      flex: 1
    }}>
      <Animator visible={true} />
    </View>
    )
  }

  return (
    <LinearGradient colors={['#8400ff', '#2d067c', '#020024']} style={{ flex: 1 }}>
      <ScrollView style={{
        marginBottom: 80
      }}>
        <FlatList
          data={album.songs.items}
          renderItem={({ item }) => <SongListItem song={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <AlbumHeader album={album} />}
        />
      </ScrollView>
    </LinearGradient>
  )
}

export default AlbumScreen;