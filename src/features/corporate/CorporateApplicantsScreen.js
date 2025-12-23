import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, MaterialIcons } from 'react-native';
import { JobContext } from '../../context/JobContext';

const CorporateApplicantsScreen = () => {
  const { jobs } = useContext(JobContext);

  // In a real app, we would filter jobs by the logged-in Corporate ID.
  // For now, we show all applicants for all jobs created in this session.
  const allApplicants = jobs.reduce((acc, job) => {
    if (job.applications && job.applications.length > 0) {
      job.applications.forEach(app => {
        acc.push({
          ...app,
          jobTitle: job.title,
          jobId: job.id
        });
      });
    }
    return acc;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.infoSection}>
        <Text style={styles.studentName}>{item.studentName || 'Anonymous Student'}</Text>
        <Text style={styles.jobLabel}>Applied for: <Text style={styles.jobTitle}>{item.jobTitle}</Text></Text>
        <Text style={styles.dateText}>Applied on: {new Date(item.appliedAt).toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.statusSection}>
        <View style={[styles.statusBadge, item.status === 'Applied' ? styles.appliedBg : styles.otherBg]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {allApplicants.length > 0 ? (
        <FlatList
          data={allApplicants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No applications received yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  listContainer: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
  },
  infoSection: { flex: 0.7 },
  studentName: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  jobLabel: { fontSize: 14, color: '#64748b', marginTop: 4 },
  jobTitle: { fontWeight: '600', color: '#3b82f6' },
  dateText: { fontSize: 12, color: '#94a3b8', marginTop: 8 },
  statusSection: { flex: 0.3, alignItems: 'flex-end', justifyContent: 'space-between' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 10 },
  appliedBg: { backgroundColor: '#dcfce7' },
  otherBg: { backgroundColor: '#f1f5f9' },
  statusText: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  viewButton: { backgroundColor: '#0f172a', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  viewButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#64748b', fontSize: 16 },
});

export default CorporateApplicantsScreen;