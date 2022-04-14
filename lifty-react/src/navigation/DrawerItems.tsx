import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Drawer} from "react-native-paper";
import {useEffect, useState} from "react";
import {DrawerNavigationHelpers} from "@react-navigation/drawer/lib/typescript/src/types";

export type RootStackParamList = {
    Home: undefined;
    Scan: undefined;
    Search: undefined;
};

const drawerItemData = [
    {
        key: 1,
        label: 'Home',
        icon: 'newspaper-variant-outline'
    },
    {
        key: 2,
        label: 'Scan',
        icon: 'camera'
    },
    {
        key: 3,
        label: 'Search',
        icon: 'magnify'
    }
];

type Props = {
    navigation: DrawerNavigationHelpers;
}

export default function DrawerItems({ navigation } : Props) {
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
        </DrawerContentScrollView>
    )
}
