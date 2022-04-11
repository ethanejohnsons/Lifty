import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContent, DrawerContentComponentProps} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import React, {createContext, useMemo, useState} from 'react';

import {
    Provider as PaperProvider,
    DarkTheme,
    DefaultTheme
} from 'react-native-paper';

import HomeScreen from "../screens/HomeScreen";
import TimerScreen from "../screens/TimerScreen";
import DrawerItems from "./DrawerItems";
import {DrawerNavigationHelpers} from "@react-navigation/drawer/lib/typescript/src/types";

export type RootStackParamList = {
    Home: undefined;
    Timer: undefined;
};

export const PreferencesContext = createContext<any>(null);

const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        customColor: '#BADA55',
    },
    fonts: {
        ...DarkTheme.fonts,
        superLight: { ...DarkTheme.fonts['light'] },
    },
    userDefinedThemeProperty: '',
    animation: {
        ...DarkTheme.animation,
        customProperty: 1,
    },
};

const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        customColor: '#BADA55',
    },
    fonts: {
        ...DefaultTheme.fonts,
        superLight: { ...DefaultTheme.fonts['light'] },
    },
    userDefinedThemeProperty: '',
    animation: {
        ...DefaultTheme.animation,
        customProperty: 1,
    },
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
                                {(preferences) => <DrawerItems navigation={props.navigation} toggleTheme={preferences.toggleTheme} isDarkTheme={preferences.theme.dark}/>}
                            </PreferencesContext.Consumer>
                        }>
                            <Drawer.Screen name="Home" component={HomeScreen}/>
                            <Drawer.Screen name="Timer" component={TimerScreen}/>
                        </Drawer.Navigator>
                    </NavigationContainer>
                </PreferencesContext.Provider>
            </SafeAreaProvider>
        </PaperProvider>
    );
}
