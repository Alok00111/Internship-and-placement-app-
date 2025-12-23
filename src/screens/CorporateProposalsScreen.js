import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../context/JobContext';

const CorporateProposalsScreen = () => {
  const { jobs } = useContext(JobContext);

  // Filter jobs for "My Company"
  const myJobs = jobs.filter(job => job.company === "My Company");

  const getStatusBadge = (status) => {
    let color = '#F59E0B'; // Orange (Pending)
    let icon = 'hourglass-empty';

    if (status === 'Approved' || status === 'Published') {
      color = '#22C55E'; // Green
      icon = 'check-circle';
    } else if (status === 'Rejected') {
      color = '#EF4444'; // Red
      icon = 'cancel';
    }

    return (
      <View style={[styles.badge, { backgroundColor: `${color}15` }]}>
        <MaterialIcons name={icon} size={14} color={color} />
        <Text style={[styles.badgeText, { color }]}>{status}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>Submitted: Today</Text>
        {getStatusBadge(item.status)}
      </View>
      
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <MaterialIcons name="info-outline" size={16} color="#64748B" />
        <Text style={styles.footerText}>
          {item.status === 'Pending' ? "Waiting for Admin Review" : 
           (item.status === 'Published' ? "Live for Students" : "Status Updated")}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={myJobs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="post-add" size={64} color="#E2E8F0" />
            <Text style={styles.emptyText}>No proposals submitted yet</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  card: {
    backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  dateText: { fontSize: 12, color: '#94A3B8' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  desc: { color: '#64748B', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginBottom: 12 },
  footer: { flexDirection: 'row', alignItems: 'center' },
  footerText: { marginLeft: 8, fontSize: 13, color: '#64748B' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#94A3B8', marginTop: 16 },
});

export default CorporateProposalsScreen;