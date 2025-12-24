import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { JobContext } from '../../context/JobContext';
import { MaterialIcons } from '@expo/vector-icons';

const PcStatsScreen = () => {
  const { jobs = [], currentUser } = useContext(JobContext);

  // --- SECURITY FIX: Filter by University ID before calculating stats ---
  const universityJobs = jobs.filter(job => job.universityId === currentUser?.universityId);

  // Calculate statistics based ONLY on filtered jobs
  const stats = {
    total: universityJobs.length,
    pending: universityJobs.filter(j => j.status === 'pending').length,
    adminApproved: universityJobs.filter(j => j.status === 'approved').length,
    live: universityJobs.filter(j => j.status === 'live').length,
    rejected: universityJobs.filter(j => j.status?.includes('rejected')).length,
  };

  const StatCard = ({ title, value, icon, color }) => (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardLabel}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
      <MaterialIcons name={icon} size={32} color={color} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Placement Overview</Text>
      <Text style={styles.subHeader}>{currentUser?.universityName || 'University'} Statistics</Text>
      
      <View style={styles.grid}>
        <StatCard 
          title="Total Proposals" 
          value={stats.total} 
          icon="assignment" 
          color="#6366f1" 
        />
        <StatCard 
          title="Live for Students" 
          value={stats.live} 
          icon="check-circle" 
          color="#10b981" 
        />
        <StatCard 
          title="Pending Review" 
          value={stats.pending + stats.adminApproved} 
          icon="pending" 
          color="#f59e0b" 
        />
        <StatCard 
          title="Rejected" 
          value={stats.rejected} 
          icon="cancel" 
          color="#ef4444" 
        />
      </View>

      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartTitle}>Pipeline Distribution</Text>
        <Text style={styles.chartNote}>
          {stats.live} Jobs are currently active and visible to students at {currentUser?.universityName}.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 5 },
  subHeader: { fontSize: 16, color: '#64748b', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 5,
    elevation: 3,
  },
  cardLabel: { fontSize: 12, color: '#64748b', fontWeight: '600', textTransform: 'uppercase' },
  cardValue: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginTop: 4 },
  chartPlaceholder: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chartTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 10 },
  chartNote: { color: '#64748b', lineHeight: 20 },
});

export default PcStatsScreen;