import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../../context/JobContext';

const AdminVerifyScreen = () => {
  const { companies } = useContext(JobContext);
  const [refresh, setRefresh] = useState(false);

  const handleVerify = (company, status) => {
    company.status = status;
    setRefresh(!refresh);
    Alert.alert("Status Updated", `Company marked as ${status}`);
  };

  const renderStatusChip = (status) => {
    let color = status === 'Verified' ? '#22C55E' : (status === 'Rejected' ? '#EF4444' : '#F59E0B');
    return (
      <View style={[styles.chip, { backgroundColor: `${color}15` }]}>
        <Text style={{ color, fontWeight: 'bold', fontSize: 12 }}>{status}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        {renderStatusChip(item.status)}
      </View>
      <Text style={styles.email}>{item.email}</Text>
      
      <View style={{ height: 16 }} />

      {!item.documentUrl ? (
        <View style={styles.noDoc}>
          <Text style={{ color: '#F59E0B', fontSize: 12 }}>No documents uploaded yet</Text>
        </View>
      ) : (
        <View style={styles.docRow}>
          <MaterialIcons name="description" size={20} color="#3B82F6" />
          <Text style={styles.link}>View Legal Document</Text>
        </View>
      )}

      <View style={{ height: 24 }} />

      {item.status === 'Pending' && item.documentUrl && (
        <View style={styles.actions}>
          <TouchableOpacity 
            onPress={() => handleVerify(item, 'Rejected')}
            style={[styles.btn, styles.btnReject]}
          >
            <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>Reject</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => handleVerify(item, 'Verified')}
            style={[styles.btn, styles.btnVerify]}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Verify</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={companies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: {
    padding: 16, marginBottom: 16, borderRadius: 12,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  email: { color: '#64748B', marginTop: 4 },
  chip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  noDoc: { padding: 8, backgroundColor: '#FFF7ED', borderRadius: 4, alignSelf: 'flex-start' },
  docRow: { flexDirection: 'row', alignItems: 'center' },
  link: { color: '#3B82F6', textDecorationLine: 'underline', marginLeft: 8 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  btn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginLeft: 12 },
  btnReject: { borderWidth: 1, borderColor: '#EF4444' },
  btnVerify: { backgroundColor: '#22C55E' },
});

export default AdminVerifyScreen;