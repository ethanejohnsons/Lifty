import React, {createContext, useMemo, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider, DarkTheme, DefaultTheme} from 'react-native-paper';

import HomeScreen from "./screens/HomeScreen";
import ScanScreen from "./screens/ScanScreen";
import SearchScreen from "./screens/SearchScreen";
import DrawerItems, {RootStackParamList} from "./navigation/DrawerItems";

export const PreferencesContext = createContext<any>(null);

const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: '#5f2ead',
        accent: '#63a6ff',
    }
};

const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#5f2ead',
        accent: '#63a6ff',
    }
};

export default function Navigation() {
    const Drawer = createDrawerNavigator<RootStackParamList>();
    const [ theme, setTheme ] = useState<ReactNativePaper.Theme>(CustomDefaultTheme);

    const preferences = useMemo(() => ({
        toggleTheme: () => setTheme(theme => theme === CustomDefaultTheme ? CustomDarkTheme: CustomDefaultTheme),
        theme
    }), [theme]);

    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <PreferencesContext.Provider value={preferences}>
                    <NavigationContainer>
                        <Drawer.Navigator drawerContent={props =>
                            <PreferencesContext.Consumer>
                                {(preferences) => <DrawerItems navigation={props.navigation}/>}
                            </PreferencesContext.Consumer>
                        }>
                            <Drawer.Screen name="Home" component={HomeScreen}/>
                            <Drawer.Screen name="Scan" component={ScanScreen}/>
                            <Drawer.Screen name="Search" component={SearchScreen}/>
                        </Drawer.Navigator>
                    </NavigationContainer>
                </PreferencesContext.Provider>
            </SafeAreaProvider>
        </PaperProvider>
    );
}
