import React, { useState } from 'react';
import {StatusBar} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import PlayerWidget from './components/PlayerWidget';
import Player from './app/screens/Player';


//AWS details
import Amplify, { Auth } from 'aws-amplify';
import config from './src/aws-exports'
Amplify.configure(config)


//Authentication from AWS
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native'

import { AppContext } from './Appcontext';



function App() {
  const [playing, setPlaying] = useState(false);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [songId, setSongId] = useState<string | null>(null);

  /* const check = () => {
    const render = Player;
  }
 */

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <SafeAreaProvider>
          <StatusBar backgroundColor={'#8400ff'}/>
          <AppContext.Provider value={{
            songId,
            setSongId: (id: string) => setSongId(id),
          }} >
            <Navigation colorScheme={colorScheme} />
            <PlayerWidget />
          </AppContext.Provider>
        </SafeAreaProvider>
    );
  }
}


//customizing Theme of authentication

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: '#8400ff',
    borderRadius: 50,
  }, 
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: '#8400ff80',
    borderRadius: 50,
  }, 
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: '#8400ff',
  }
}


export default withAuthenticator(App, {theme: customTheme});