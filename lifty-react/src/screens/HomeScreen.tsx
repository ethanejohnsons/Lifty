import {useEffect, useState} from "react";

import {StyleSheet, Linking, ScrollView, RefreshControl} from "react-native";
import {DrawerScreenProps} from "@react-navigation/drawer";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Card, Title, Paragraph, ActivityIndicator} from "react-native-paper";

import {RootStackParamList} from "../navigation/DrawerItems";

type HomeScreenProps = DrawerScreenProps<RootStackParamList, 'Home'>;

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

const permanentCards : Card[] = [
    {
        title: "Github",
        subtitle: "This project is open source!",
        url: "https://github.com/ethanejohnsons/Lifty",
        imageUrl: "",
        icon: "github"
    },
    {
        title: "Buy me a coffee",
        subtitle: "Help support me and my projects.",
        url: "https://www.buymeacoffee.com/EthanJohnson",
        imageUrl: "",
        icon: "coffee"
    }
];

type Card = {
    title: string,
    subtitle: string,
    url: string,
    imageUrl: string,
    icon: string
}

export default function TimerScreen({ route, navigation }: HomeScreenProps) {
    const { server } = require('../config');
    const [cards, setCards] = useState<Card[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setCards([]);

        fetch(`${server}/feed`).then(res => res.json()).then((data: Card[]) => {
            setCards([...data, ...permanentCards].map(card => {
                fetch(`${server}/metadata?site=${card.url}`)
                    .then(res => res.json())
                    .then(data => card.imageUrl = data.image)
                    .catch(console.error);
                return card;
            }));
        }).catch(console.log);

        setInterval(() => setRefreshing(false), 2000);
    };

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()}/>}>
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
    );
}
