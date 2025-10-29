import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GpsCard({ location, errorMsg, timestamp }) {
  if (errorMsg) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>📍 GPS</Text>
        <Text style={styles.err}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>📍 GPS</Text>
        <Text>Cargando ubicación...</Text>
      </View>
    );
  }

  const { latitude, longitude, speed } = location.coords;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>📍 GPS</Text>
      <Text style={styles.item}>Latitud: {latitude.toFixed(6)}</Text>
      <Text style={styles.item}>Longitud: {longitude.toFixed(6)}</Text>
      <Text style={styles.item}>Velocidad: {speed != null ? speed.toFixed(2) + ' m/s' : 'N/A'}</Text>
      <Text style={styles.ts}>Última lectura: {timestamp || '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontWeight: '700',
    marginBottom: 6,
  },
  item: {
    fontSize: 14,
    marginTop: 4,
  },
  ts: {
    marginTop: 8,
    color: '#666',
    fontSize: 12,
  },
  err: {
    color: 'red',
  },
});
