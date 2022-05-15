import {Button, Snackbar} from "react-native-paper";
import {StyleSheet, SafeAreaView} from "react-native";

import {useState} from "react";
import {ScreenProps} from "../index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    }
});

export default function IndexScreen({ route, jumpTo } : ScreenProps) {
    const [ visible, setVisible ] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    );
}
