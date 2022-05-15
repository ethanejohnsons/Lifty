import {useEffect, useState} from "react";

import {StyleSheet, Linking, ScrollView, RefreshControl, SafeAreaView} from "react-native";
import {Card, Title, Paragraph, ActivityIndicator} from "react-native-paper";
import {ScreenProps} from "../index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        marginHorizontal: "5%",
        marginTop: "5%"
    },
    indicator: {
        margin: "5%"
    }
});

type Card = {
    title: string,
    subtitle: string,
    url: string,
    imageUrl: string,
    icon: string
}

export default function AboutScreen({ route, jumpTo }: ScreenProps) {
    const { server } = require('../config');
    const [cards, setCards] = useState<Card[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        if (!refreshing) {
            setRefreshing(true);

            fetch(`${server}/about`)
                .then(res => res.json())
                .then(data => {
                    setCards(data);
                    setRefreshing(false);
                }).catch(console.error);
        }
    };

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={styles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()}/>}
            >
                {
                    cards.map(data =>
                        <Card onPress={() => Linking.openURL(data.url)} style={styles.card}>
                            {
                                data.imageUrl !== "" &&
                                <Card.Cover source={{ uri: data.imageUrl }}/>
                            }
                            <Card.Content>
                                { data.imageUrl === "" && <ActivityIndicator style={styles.indicator} size="large"/> }
                                <Title>{data.title}</Title>
                                <Paragraph>{data.subtitle}</Paragraph>
                            </Card.Content>
                        </Card>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    );
}
