import {View, StyleSheet, Text, Platform} from "react-native";
import {DrawerScreenProps} from "@react-navigation/drawer";
import {Camera} from 'expo-camera'
import {Button} from "react-native-paper";

import {RootStackParamList} from "../navigation/DrawerItems";
import {useEffect, useState} from "react";

import {load, MobileNet} from "@tensorflow-models/mobilenet";
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';
import {Tensor3D} from "@tensorflow/tfjs";

const TensorCamera = cameraWithTensors(Camera);

type ScanScreenProps = DrawerScreenProps<RootStackParamList, 'Scan'>;

const styles = StyleSheet.create({
    camera : {
        width: 700/2,
        height: 800/2,
        zIndex: 1,
        borderWidth: 0,
        borderRadius: 0,
    }
});

export default function ScanScreen({ route, navigation }: ScanScreenProps) {
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [model, setModel] = useState<MobileNet>();
    const [prediction, setPrediction] = useState<{}[]>();
    const [predictionFound, setPredictionFound] = useState(false);

    const textureDims = Platform.OS === "ios"? { width: 1080, height: 1920 } : { width: 1600, height: 1200 };
    const tensorDims = { width: 152, height: 200 };

    /*
    On page load, load mobilenet.
     */
    useEffect(() => {
        load().then(setModel);
    }, []);

    const handleCameraStream = async (tensorList: IterableIterator<Tensor3D>) => {
        if (model) {
            const loop = async () => {
                let prediction = await model.classify(tensorList.next().value);
                setPredictionFound(true);
                setPrediction(prediction);
                requestAnimationFrame(loop);
            }

            if (!predictionFound) await loop();
        }
    };

    const __startCamera = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setCameraEnabled(status === 'granted')
    };

    navigation.addListener('state', () => {
        setCameraEnabled(false);
    });

    return (
        <View style={{alignItems: "center"}}>
            {cameraEnabled ?
                <View>
                    <TensorCamera
                        style={styles.camera}
                        type={Camera.Constants.Type.back}
                        zoom={0}
                        resizeWidth={tensorDims.width}
                        resizeHeight={tensorDims.height}
                        resizeDepth={3}
                        cameraTextureWidth={textureDims.width}
                        cameraTextureHeight={textureDims.height}
                        autorender={true}
                        useCustomShadersToResize={false}
                        onReady={(imageAsTensors) => handleCameraStream(imageAsTensors)}
                    />
                    {prediction &&
                        <Text>Prediction: {prediction[0].className} : {prediction[0].probability.toString().substring(0, 3)}</Text>
                    }
                </View>
                :
                <Button
                    icon="camera"
                    mode="contained"
                    loading={cameraEnabled}
                    style={{marginTop: "5%"}}
                    onPress={() => __startCamera()}
                >Camera</Button>
            }
        </View>
    );
}
