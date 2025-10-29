import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AccelCard({ accel, timestamp }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>📈 Acelerómetro</Text>
      <Text style={styles.item}>x: {accel.x.toFixed(2)}</Text>
      <Text style={styles.item}>y: {accel.y.toFixed(2)}</Text>
      <Text style={styles.item}>z: {accel.z.toFixed(2)}</Text>
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
});
