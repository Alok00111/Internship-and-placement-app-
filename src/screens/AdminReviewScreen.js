import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../context/JobContext';

const AdminReviewScreen = () => {
  // Destructure setJobs so we can update the state properly
  const { jobs, setJobs } = useContext(JobContext);

  const handleUpdateStatus = (jobId, newStatus) => {
    // Create a NEW array with the updated job to trigger a re-render
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, status: newStatus };
      }
      return job;
    });

    setJobs(updatedJobs); // Update Global State
    Alert.alert("Success", `Job marked as ${newStatus}`);
  };

  const renderStatusBadge = (status) => {
    let color = '#F59E0B'; // Pending
    if (status === 'Verified') color = '#22C55E'; // Green
    if (status === 'Rejected') color = '#EF4444'; // Red
    
    return (
      <Text style={{ color, fontWeight: 'bold' }}>{status}</Text>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.company}>{item.company}</Text>
        {renderStatusBadge(item.status)}
      </View>
      
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>Duration: {item.duration} • Stipend: ₹{item.stipend}</Text>
      <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>

      {/* The buttons will now disappear immediately because we updated the state */}
      {item.status === 'Pending' && (
        <View style={styles.actionRow}>
          <View style={styles.divider} />
          <View style={styles.buttons}>
            <TouchableOpacity 
              onPress={() => handleUpdateStatus(item.id, 'Rejected')}
              style={[styles.btn, styles.btnReject]}
            >
              <Text style={[styles.btnText, { color: '#EF4444' }]}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleUpdateStatus(item.id, 'Verified')}
              style={[styles.btn, styles.btnApprove]}
            >
              <Text style={styles.btnText}>Approve</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs} // This now listens to the updated state
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
    backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  company: { fontWeight: 'bold', color: '#475569' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: '#1E293B' },
  details: { fontWeight: '500', marginBottom: 8, color: '#1E293B' },
  desc: { color: '#64748B', marginBottom: 8 },
  actionRow: { marginTop: 16 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginBottom: 12 },
  buttons: { flexDirection: 'row', justifyContent: 'flex-end' },
  btn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginLeft: 12 },
  btnReject: { borderWidth: 1, borderColor: '#EF4444' },
  btnApprove: { backgroundColor: '#22C55E' },
  btnText: { fontWeight: 'bold', color: 'white' },
});

export default AdminReviewScreen;