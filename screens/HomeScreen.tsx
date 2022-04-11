import {Text} from "react-native-paper";
import {View} from "react-native";
import {DrawerScreenProps} from "@react-navigation/drawer";

import {RootStackParamList} from "../navigation";

type HomeScreenProps = DrawerScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ route, navigation }: HomeScreenProps) {
    return (
        <View>
        </View>
    );
}
