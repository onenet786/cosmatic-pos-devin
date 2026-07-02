import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }: any) {
  const [stats, setStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch('http://localhost:3018/v1/reports/dashboard?tenantId=placeholder', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load().finally(() => setRefreshing(false)); }} />}
      style={styles.container}
    >
      <Text style={styles.header}>Dashboard</Text>
      {stats && (
        <View style={styles.grid}>
          <View style={[styles.card, { backgroundColor: '#0ea5e9' }]}>
            <Text style={styles.cardLabel}>Sales Today</Text>
            <Text style={styles.cardValue}>PKR {Number(stats.salesToday).toLocaleString()}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#10b981' }]}>
            <Text style={styles.cardLabel}>Stock Value</Text>
            <Text style={styles.cardValue}>PKR {Number(stats.stockValue).toLocaleString()}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#f59e0b' }]}>
            <Text style={styles.cardLabel}>Pending Returns</Text>
            <Text style={styles.cardValue}>{stats.pendingReturns}</Text>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Approvals')}>
        <Text style={styles.buttonText}>Approval Center</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  card: { flex: 1, minWidth: 140, padding: 16, borderRadius: 12 },
  cardLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 12 },
  cardValue: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  button: { backgroundColor: '#1e293b', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
