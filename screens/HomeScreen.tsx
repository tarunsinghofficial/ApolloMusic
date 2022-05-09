import * as React from 'react';
import { FlatList, StyleSheet, View, StatusBar, Text, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';

import AlbumCategory from '../components/AlbumCategory';
import { LinearGradient } from 'expo-linear-gradient';
import { listAlbumCategorys } from '../src/graphql/queries';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Animator from '../components/Animator';
import RadioAnimator from '../components/RadioAnimator';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function HomeScreen() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAlbumCategories = async () => {
      try {
        const data = await API.graphql(graphqlOperation(listAlbumCategorys));
        setCategories(data.data.listAlbumCategorys.items);
      } catch (e) {
        console.log(e);
      }
    }

    fetchAlbumCategories();
  }, []);

  var myDate = new Date();
  var hrs = myDate.getHours();

  var greet;

  if (hrs < 12)
    greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24)
    greet = 'Good Evening';


  //Logout
  const logout = () => {
    Auth.signOut();
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#8400ff', '#2d067c', '#020024']}>
        <StatusBar
          backgroundColor={'#8400ff'}
        />
        <View style={{
          backgroundColor: 'transparent',
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <MaterialCommunityIcons name='home' size={30} color={'white'} style={{
            marginTop: 15,
            marginLeft: 20,
          }} />
          <Text style={{
            color: '#fff',
            marginTop: 18,
            fontSize: 20,
            fontWeight: 'bold',
          }}>Apollo</Text>
          <View style={{
            flexDirection: 'row',
            marginTop: 18,
          }}>
            <TouchableOpacity onPress={logout}>
              <FontAwesome name='sign-out' size={30} color={'white'} style={{ marginRight: 10 }} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={{
            marginBottom: 100,
            borderBottomLeftRadius: 10,
          }}>
            <Image
              source={require('../assets/images/perdotcom-bot-head.gif')}
              style={{
                width: '100%',
                height: 180,
                position: 'absolute',
                opacity: 0.7,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }} />
          </View>
          <View>
            <Text style={{ color: "white", marginBottom: 10, fontSize: 40, alignSelf: "center", fontWeight: "bold", fontFamily: "notoserif" }}>{greet}</Text>
          </View>
          {/* <TouchableOpacity>
            <LinearGradient colors={['#8400ff', '#865BDE', '#990EED']}
              style={{
                backgroundColor: '#9E42FA',
                width: '30%',
                height: 50,
                borderRadius: 10,
                marginTop: 30,
                marginLeft: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: '#fff', fontSize: 20 }}>Liked</Text>
            </LinearGradient>
          </TouchableOpacity> */}
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <AlbumCategory
                title={item.title}
                albums={item.albums.items}
              />
            )}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 110, bottom: 80 }}
          />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});

