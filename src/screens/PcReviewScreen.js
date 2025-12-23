import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../context/JobContext';

const PcReviewScreen = ({ navigation }) => {
  const { jobs, setJobs } = useContext(JobContext);

  // PC only sees 'Verified' jobs (passed Admin check)
  const jobsToReview = jobs.filter(job => job.status === 'Verified');

  const handleUpdateStatus = (jobId, newStatus) => {
    // 1. Create a NEW array with the updated job to trigger a re-render
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, status: newStatus };
      }
      return job;
    });

    // 2. Update Global State
    setJobs(updatedJobs);

    // 3. Show feedback
    if (newStatus === 'Published') {
      Alert.alert("Success", "Job Published to Students!");
    } else {
      Alert.alert("Returned", "Job sent back to Admin/Corporate");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Admin Verified</Text>
        </View>
        <Text style={styles.company}>{item.company}</Text>
      </View>
      
      <View style={{ height: 12 }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.stipend}>Stipend: ₹{item.stipend}</Text>
      <View style={{ height: 16 }} />

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.btn, styles.btnOutline]} 
          onPress={() => handleUpdateStatus(item.id, 'Rejected')}
        >
          <Text style={{ color: '#EF4444' }}>Send Back</Text>
        </TouchableOpacity>
        
        <View style={{ width: 12 }} />
        
        <TouchableOpacity 
          style={[styles.btn, styles.btnFill]} 
          onPress={() => handleUpdateStatus(item.id, 'Published')}
        >
          <Text style={{ color: 'white' }}>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Custom Header with Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Final Approval</Text>
      </View>

      {jobsToReview.length === 0 ? (
        <View style={styles.center}>
          <MaterialIcons name="check-circle-outline" size={64} color="#CBD5E1" />
          <Text style={{ color: '#94A3B8', marginTop: 16 }}>All jobs are published!</Text>
        </View>
      ) : (
        <FlatList
          data={jobsToReview}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50, // Status bar spacing
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    padding: 16, marginBottom: 16, borderRadius: 12,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  tag: { backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  tagText: { color: '#3B82F6', fontSize: 10, fontWeight: 'bold' },
  company: { fontWeight: 'bold', color: '#64748B' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  stipend: { fontWeight: '500', marginTop: 4 },
  actions: { flexDirection: 'row' },
  btn: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 8 },
  btnOutline: { borderWidth: 1, borderColor: '#EF4444' },
  btnFill: { backgroundColor: '#1E293B' },
});

export default PcReviewScreen;