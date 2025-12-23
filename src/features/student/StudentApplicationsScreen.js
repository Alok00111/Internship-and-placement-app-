import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../../context/JobContext';

const StudentApplicationsScreen = () => {
  const { jobs, currentUser } = useContext(JobContext);

  // Find jobs where the current user is in the applications list
  const myApplications = jobs.filter(job => 
    job.applications.some(app => app.studentName === currentUser.name)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected': return '#22C55E'; // Green
      case 'Rejected': return '#EF4444'; // Red
      default: return '#3B82F6'; // Blue for Applied
    }
  };

  const renderItem = ({ item }) => {
    // Get specific status for this user
    const userApp = item.applications.find(app => app.studentName === currentUser.name);
    const status = userApp ? userApp.status : 'Applied';
    const color = getStatusColor(status);

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.company}>{item.company}</Text>
          <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
            <Text style={[styles.badgeText, { color }]}>{status}</Text>
          </View>
        </View>
        
        <Text style={styles.title}>{item.title}</Text>
        
        <View style={styles.divider} />
        
        <View style={styles.footer}>
          <MaterialIcons name="calendar-today" size={14} color="#94A3B8" />
          <Text style={styles.footerText}>Applied Recently</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myApplications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="assignment" size={64} color="#E2E8F0" />
            <Text style={styles.emptyText}>You haven't applied to any jobs yet</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  company: { color: '#64748B', fontWeight: '600' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontWeight: 'bold', fontSize: 12 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginBottom: 12 },
  footer: { flexDirection: 'row', alignItems: 'center' },
  footerText: { marginLeft: 6, color: '#94A3B8', fontSize: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#94A3B8', marginTop: 16 },
});

export default StudentApplicationsScreen;