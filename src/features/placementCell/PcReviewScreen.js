import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { JobContext } from '../../context/JobContext';

const PcReviewScreen = () => {
  const { jobs, updateJobStatus,currentUser } = useContext(JobContext);

  // PC reviews jobs that are already 'approved' by Admin
  const jobsToVerify = jobs.filter(job => job.status === 'approved'&& 
  job.universityId === currentUser?.universityId);

  const handlePcAction = (id, status) => {
    // If PC approves, it goes 'live' for students
    const finalStatus = status === 'verify' ? 'live' : 'rejected_by_pc';
    updateJobStatus(id, finalStatus);
    Alert.alert("Success", `Job is now ${finalStatus}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Admin Approved</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.company}>{item.companyName || 'Corporate Partner'}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.verifyButton]} 
          onPress={() => handlePcAction(item.id, 'verify')}
        >
          <Text style={styles.buttonText}>Publish to Students</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.rejectButton]} 
          onPress={() => handlePcAction(item.id, 'reject')}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {jobsToVerify.length > 0 ? (
        <FlatList
          data={jobsToVerify}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No admin-approved jobs waiting for verification.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#e2e8f0' },
  badge: { backgroundColor: '#dcfce7', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 10 },
  badgeText: { color: '#166534', fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  company: { fontSize: 14, color: '#64748b', marginBottom: 15 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 0.48, padding: 12, borderRadius: 8, alignItems: 'center' },
  verifyButton: { backgroundColor: '#2563eb' },
  rejectButton: { backgroundColor: '#ef4444' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#94a3b8', fontSize: 16 }
});

export default PcReviewScreen;