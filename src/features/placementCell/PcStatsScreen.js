import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../../context/JobContext';

const PcStatsScreen = () => {
  const { jobs, companies } = useContext(JobContext);

  // 1. Calculate Stats
  const totalCompanies = companies.length;
  const publishedJobs = jobs.filter(j => j.status === 'Published').length;
  
  let totalApplications = 0;
  let totalSelected = 0;

  jobs.forEach(job => {
    totalApplications += job.applications.length;
    totalSelected += job.applications.filter(app => app.status === 'Selected').length;
  });

  const renderStatCard = (title, count, icon, color) => (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: `${color}15` }]}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>
      <View style={{ height: 12 }} />
      <Text style={[styles.count, { color }]}>{count}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.sectionHeader}>Overview</Text>
      <View style={{ height: 16 }} />

      <View style={styles.grid}>
        <View style={styles.col}>
          {renderStatCard("Companies", totalCompanies, "business", "#3B82F6")}
          <View style={{ height: 16 }} />
          {renderStatCard("Total Apps", totalApplications, "description", "#A855F7")}
        </View>
        <View style={styles.col}>
          {renderStatCard("Active Jobs", publishedJobs, "work", "#F59E0B")}
          <View style={{ height: 16 }} />
          {renderStatCard("Placed", totalSelected, "school", "#22C55E")}
        </View>
      </View>

      <View style={{ height: 32 }} />
      <Text style={styles.sectionHeader}>Recent Activities</Text>
      <View style={{ height: 12 }} />

      {jobs.map((job) => (
        <View key={job.id} style={styles.listItem}>
          <View style={styles.listIcon}>
            <MaterialIcons name="work" size={20} color="#475569" />
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>{job.title}</Text>
            <Text style={{ color: '#64748B', fontSize: 12 }}>{job.company} • {job.status}</Text>
          </View>
          {job.status === 'Published' ? (
            <MaterialIcons name="check-circle" size={16} color="#22C55E" />
          ) : (
            <MaterialIcons name="hourglass-empty" size={16} color="#F59E0B" />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  sectionHeader: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  grid: { flexDirection: 'row' },
  col: { flex: 1, marginHorizontal: 8 },
  card: {
    backgroundColor: 'white', borderRadius: 16, padding: 20, alignItems: 'center',
    shadowColor: '#000', shadowOffset: {width:0,height:4}, shadowOpacity:0.05, shadowRadius:10, elevation:2,
    borderWidth: 1, borderColor: '#F1F5F9'
  },
  iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  count: { fontSize: 32, fontWeight: 'bold' },
  cardTitle: { color: '#64748B', fontSize: 14 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  listIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
});

export default PcStatsScreen;