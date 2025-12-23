import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, MaterialIcons } from 'react-native';
import { JobContext } from '../../context/JobContext';

const StudentApplicationsScreen = () => {
  const { jobs, currentUser } = useContext(JobContext);

  // Filter all jobs to find where the current student has applied
  // We check if the student's name exists in the applications array of any job
  const myApplications = jobs.reduce((acc, job) => {
    if (job.applications) {
      const userApp = job.applications.find(app => app.studentName === currentUser?.name);
      if (userApp) {
        acc.push({
          id: job.id,
          title: job.title,
          company: job.company || job.companyName,
          status: userApp.status,
          appliedAt: userApp.appliedAt
        });
      }
    }
    return acc;
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied': return styles.statusApplied;
      case 'shortlisted': return styles.statusShortlisted;
      case 'rejected': return styles.statusRejected;
      default: return styles.statusDefault;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.companyName}>{item.company}</Text>
      </View>
      <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {myApplications.length > 0 ? (
        <FlatList
          data={myApplications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't applied for any jobs yet.</Text>
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
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  jobTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  companyName: { fontSize: 14, color: '#64748b', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  statusApplied: { backgroundColor: '#dcfce7' }, // Light Green
  statusShortlisted: { backgroundColor: '#dbeafe' }, // Light Blue
  statusRejected: { backgroundColor: '#fee2e2' }, // Light Red
  statusDefault: { backgroundColor: '#f1f5f9' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#94a3b8', fontSize: 16 },
});

export default StudentApplicationsScreen;