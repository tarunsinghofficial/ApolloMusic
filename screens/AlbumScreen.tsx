import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, ScrollView, View, Pressable, Alert, StyleSheet, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { API, graphqlOperation } from 'aws-amplify';
import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import { getAlbum } from '../src/graphql/queries'
import Animator from '../components/Animator';
import { AntDesign, Entypo } from '@expo/vector-icons';


const AlbumScreen = () => {

  const route = useRoute();
  const albumId = route.params.id;

  const [album, setAlbum] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <AlbumHeader album={album} />}
          renderItem={({ item }) => <SongListItem song={item} />}
        />
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7
  },
  modalView: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    justifyContent: "space-between",
    height: 40,
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default AlbumScreen;