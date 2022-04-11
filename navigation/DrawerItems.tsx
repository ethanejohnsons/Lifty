import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Drawer, Switch, TouchableRipple} from "react-native-paper";
import {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {DrawerNavigationHelpers} from "@react-navigation/drawer/lib/typescript/src/types";

const drawerItemData = [
    {
        key: 1,
        label: 'Home',
        icon: 'home'
    },
    {
        key: 2,
        label: 'Timer',
        icon: 'clock'
    }
];

type Props = {
    navigation: DrawerNavigationHelpers;
    toggleTheme: () => void;
    isDarkTheme: boolean;
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    badge: {
        alignSelf: 'center'
    }
});

export default function DrawerItems({ navigation, toggleTheme, isDarkTheme } : Props) {
    const [ drawerIndex, setDrawerIndex ] = useState(0);

    useEffect(() => {
        navigation.navigate(drawerItemData[drawerIndex].label);
        navigation.closeDrawer();
    }, [drawerIndex]);

    return (
        <DrawerContentScrollView alwaysBounceVertical={false}>
            <Drawer.Section>
                {
                    drawerItemData.map((props, index) => (
                        <Drawer.Item
                            {...props}
                            key={props.key}
                            active={drawerIndex === index}
                            onPress={() => setDrawerIndex(index)}
                        />
                    ))
                }
            </Drawer.Section>
            {/*<Drawer.Section title="Preferences">*/}
            {/*    <TouchableRipple>*/}
            {/*        <View style={styles.preference}>*/}
            {/*            <Switch onChange={toggleTheme} value={isDarkTheme}/>*/}
            {/*        </View>*/}
            {/*    </TouchableRipple>*/}
            {/*</Drawer.Section>*/}
        </DrawerContentScrollView>
    )
}
