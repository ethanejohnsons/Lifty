import {Button, Snackbar} from "react-native-paper";
import {View, StyleSheet} from "react-native";
import {DrawerScreenProps} from "@react-navigation/drawer";

import {RootStackParamList} from "../navigation";
import {useState} from "react";

type TimerScreenProps = DrawerScreenProps<RootStackParamList, 'Home'>;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    }
});

export default function TimerScreen({ route, navigation }: TimerScreenProps) {
    const [ visible, setVisible ] = useState(false);

    return (
        <View style={styles.container}>
            <Button
                icon='console'
                mode='contained'
                onPress={() => setVisible(true)}>
                Press Me...
            </Button>
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                action={{label: 'Haha'}}>
                I'm a test!
            </Snackbar>
        </View>
    );
}
