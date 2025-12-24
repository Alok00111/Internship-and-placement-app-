import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { JobContext } from '../../context/JobContext';
import { MaterialIcons } from '@expo/vector-icons';

const CorporateProposalsScreen = () => {
  const { jobs, currentUser } = useContext(JobContext);

  // FILTER LOGIC: Only show jobs posted by the currently logged-in user
  const myProposals = jobs.filter(job => job.postedBy === currentUser?.email);

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return '#10b981';    // Green
      case 'approved': return '#3b82f6'; // Blue
      case 'rejected': return '#ef4444'; // Red
      default: return '#f59e0b';         // Orange (Pending)
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status?.toUpperCase() || 'PENDING'}</Text>
        </View>
      </View>

      <Text style={styles.date}>Posted on: {new Date(item.date).toLocaleDateString()}</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <MaterialIcons name="people" size={16} color="#64748b" />
          <Text style={styles.statText}>
            {item.applications ? item.applications.length : 0} Applicants
          </Text>
        </View>
        <View style={styles.stat}>
          <MaterialIcons name="visibility" size={16} color="#64748b" />
          <Text style={styles.statText}>
            {item.status === 'live' ? 'Visible to Students' : 'Under Review'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {myProposals.length > 0 ? (
        <FlatList
          data={myProposals}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="post-add" size={64} color="#cbd5e1" />
          <Text style={styles.emptyText}>You haven't posted any jobs yet.</Text>
          <Text style={styles.subText}>Go to "Post New Job" to create one.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', flex: 1, marginRight: 10 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  date: { fontSize: 12, color: '#94a3b8', marginBottom: 12 },
  statsRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 12 },
  stat: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  statText: { marginLeft: 6, color: '#64748b', fontSize: 13, fontWeight: '500' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -50 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#64748b', marginTop: 16 },
  subText: { color: '#94a3b8', marginTop: 8 }
});

export default CorporateProposalsScreen;