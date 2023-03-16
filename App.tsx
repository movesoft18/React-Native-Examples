/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput, Image, TouchableOpacity} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';



function App() {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);

  const [cameraPermission, setCameraPermission] = useState('');

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  if (cameraPermission !== 'authorized') {
    return (
      <View>
        <Text>
          Нет разрешений на использование камеры...
        </Text>
      </View>
    );
  }

  if (device == null){
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style = {styles.container}>
      <Camera style={StyleSheet.absoluteFill}
        ref = {camera}
        device={device}
        isActive={true}
        photo={true} />
      <TouchableOpacity style = {[styles.snapContainer]}
          onPress = {async() =>{
            const photo = await camera.current.takePhoto();
          }}
          >
          <Text style={styles.snap}>Снять</Text>
      </TouchableOpacity>
    </View>

  );
}

  export default App;

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'flex-end',
    },
    snap: {
      color: '#fff',
    },
    snapContainer: {
      borderWidth: 2,
      borderColor: '#ff0000',
      height: 70,
      width: 70,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 20,
      //position: 'relative',
      //top: 180,
      //flex: 1,
    },
    cam: {
      height: '100%',
      //flex: 1,
      //marginTop: 50,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  });
