import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { JobContext } from '../../context/JobContext';

const AdminReviewScreen = () => {
  const { jobs, updateJobStatus, currentUser } = useContext(JobContext);

  // --- SECURITY FIX: Filter by University ID ---
  const pendingJobs = jobs.filter(job => 
    job.status === 'pending' && 
    job.universityId === currentUser?.universityId // <--- The Magic Line
  );

  const handleAction = (id, status) => {
    updateJobStatus(id, status);
    Alert.alert("Success", `Proposal has been ${status}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.company}>{item.company || item.companyName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.approveButton]} 
          onPress={() => handleAction(item.id, 'approved')}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.rejectButton]} 
          onPress={() => handleAction(item.id, 'rejected')}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {pendingJobs.length > 0 ? (
        <FlatList
          data={pendingJobs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No pending proposals for your university.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  company: { fontSize: 14, color: '#64748b', marginBottom: 8 },
  description: { fontSize: 14, color: '#475569', marginBottom: 15 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 0.48, padding: 12, borderRadius: 6, alignItems: 'center' },
  approveButton: { backgroundColor: '#10b981' },
  rejectButton: { backgroundColor: '#ef4444' },
  buttonText: { color: '#fff', fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#64748b', fontSize: 16 }
});

export default AdminReviewScreen;