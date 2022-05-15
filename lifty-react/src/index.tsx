import React, {createContext, useMemo, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, DarkTheme, DefaultTheme} from 'react-native-paper';
import {Route} from "react-native";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import AboutScreen from "./screens/AboutScreen";
import CameraScreen from "./screens/CameraScreen";
import IndexScreen from "./screens/IndexScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {SafeAreaProvider} from "react-native-safe-area-context";

export const PreferencesContext = createContext<any>(null);

export type ScreenProps = {
    route: Route;
    jumpTo: (key: string) => void;
}

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

const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
    const [ theme, setTheme ] = useState<ReactNativePaper.Theme>(CustomDefaultTheme);

    const preferences = useMemo(() => ({
        toggleTheme: () => setTheme(theme => theme === CustomDefaultTheme ? CustomDarkTheme: CustomDefaultTheme),
        theme
    }), [theme]);

    return (
        <PaperProvider theme={theme}>
            <PreferencesContext.Provider value={preferences}>
                <NavigationContainer>
                    <Tab.Navigator barStyle={{ backgroundColor: theme.colors.background }}>
                        <Tab.Screen
                            name="Index"
                            component={IndexScreen}
                            options={{
                                tabBarLabel: 'Index',
                                tabBarIcon: () => (
                                    <MaterialCommunityIcons name="magnify" color={theme.colors.primary} size={26} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Camera"
                            component={CameraScreen}
                            options={{
                                tabBarLabel: 'Camera',
                                tabBarIcon: () => (
                                    <MaterialCommunityIcons name="camera" color={theme.colors.primary} size={26} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="About"
                            component={AboutScreen}
                            options={{
                                tabBarLabel: 'About',
                                tabBarIcon: () => (
                                    <MaterialCommunityIcons name="information-outline" color={theme.colors.primary} size={26} />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </PreferencesContext.Provider>
        </PaperProvider>
    );
}
