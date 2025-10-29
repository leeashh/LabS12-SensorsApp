import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';

import Header from './src/components/Header';
import GpsCard from './src/components/GpsCard';
import AccelCard from './src/components/AccelCard';

export default function App() {
  const [location, setLocation] = useState(null);
  const [locError, setLocError] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);

  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });
  const [accelSubscription, setAccelSubscription] = useState(null);

  const [lastTs, setLastTs] = useState(null);
  const [lastShakeAt, setLastShakeAt] = useState(0);

  // === GPS ===
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocError('Permiso de ubicación denegado.');
          return;
        }

        setLocError(null);
        const sub = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 2000,
            distanceInterval: 1,
          },
          (loc) => {
            if (!mounted) return;
            setLocation(loc);
            setLastTs(new Date().toLocaleString());
          }
        );
        setLocationSubscription(sub);
      } catch (err) {
        setLocError('Error al obtener ubicación.');
        console.warn(err);
      }
    })();

    return () => {
      mounted = false;
      if (locationSubscription && locationSubscription.remove) locationSubscription.remove();
    };
  }, []);

  // === Acelerómetro ===
  useEffect(() => {
    let mounted = true;
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      if (!mounted) return;
      setAccel({ x, y, z });
      setLastTs(new Date().toLocaleString());

      const now = Date.now();
      const threshold = 1.5;
      if ((Math.abs(x) > threshold || Math.abs(y) > threshold) && now - lastShakeAt > 2000) {
        setLastShakeAt(now);
        console.warn('Movimiento brusco detectado 🚨');
      }
    });

    Accelerometer.setUpdateInterval(500);
    setAccelSubscription(subscription);

    return () => {
      mounted = false;
      if (accelSubscription && accelSubscription.remove) accelSubscription.remove();
    };
  }, [lastShakeAt]);

  const reRequestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') setLocError(null);
      else setLocError('Permiso de ubicación denegado.');
    } catch {
      setLocError('Error al solicitar permiso.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Sensores - Laboratorio" />
      <View style={styles.container}>
        <GpsCard location={location} errorMsg={locError} timestamp={lastTs} />
        <AccelCard accel={accel} timestamp={lastTs} />

        {locError && (
          <View style={styles.center}>
            <Text style={styles.error}>{locError}</Text>
            <Button title="Solicitar permiso otra vez" onPress={reRequestPermission} />
            <Text style={styles.hint}>
              Si usas emulador: activa “Location” en el emulador o configura ubicación manual.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: 16,
  },
  center: {
    alignItems: 'center',
    marginTop: 12,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
