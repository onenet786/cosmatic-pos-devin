import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ApprovalsScreen() {
  const [pending, setPending] = useState<any>(null);

  const load = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch('http://localhost:3018/v1/approvals/pending?tenantId=placeholder', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPending(data);
  };

  useEffect(() => { load(); }, []);

  const renderItem = ({ item, type }: any) => (
    <View style={styles.item}>
      <Text style={styles.itemType}>{type}</Text>
      <Text style={styles.itemTitle}>{item.number || item.id}</Text>
      <Text style={styles.itemMeta}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Approvals</Text>
      {pending && (
        <FlatList
          data={[
            ...(pending.vouchers || []).map((i: any) => ({ ...i, type: 'Voucher' })),
            ...(pending.returnRequests || []).map((i: any) => ({ ...i, type: 'Return' })),
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderItem({ item, type: item.type })}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  item: { backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#f59e0b' },
  itemType: { fontSize: 12, color: '#666', textTransform: 'uppercase' },
  itemTitle: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  itemMeta: { fontSize: 12, color: '#999', marginTop: 4 },
});
