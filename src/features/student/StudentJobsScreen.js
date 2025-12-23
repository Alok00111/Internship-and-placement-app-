import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../../context/JobContext';

const StudentJobsScreen = ({ navigation }) => {
  const { jobs, currentUser, applyForJob } = useContext(JobContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null); 

  // Filter jobs: Must be 'live' (Approved by Admin and verified by PC)
  const liveJobs = jobs.filter(job => job.status === 'live');

  // Filter by Search Query
  const filteredJobs = liveJobs.filter(job => {
    const query = searchQuery.toLowerCase();
    const titleMatch = job.title?.toLowerCase().includes(query);
    const companyMatch = (job.company || job.companyName)?.toLowerCase().includes(query);
    return titleMatch || companyMatch;
  });

  const handleApply = (job) => {
    // 1. Check if user is logged in
    if (!currentUser) {
      Alert.alert("Error", "Please log in to apply for jobs.");
      return;
    }

    // 2. Check if already applied (using studentName from context)
    const hasApplied = job.applications?.some(app => app.studentName === currentUser.name);

    if (hasApplied) {
      Alert.alert("Info", "You have already applied for this job.");
      return;
    }

    // 3. Call Global Context Function to persist the application
    applyForJob(job.id, currentUser.name);

    Alert.alert("Success", "Application Submitted Successfully!");
    setSelectedJob(null); 
  };

  const renderJobCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <MaterialIcons name="business" size={24} color="#3B82F6" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company || item.companyName || 'Corporate Partner'}</Text>
        </View>
      </View>

      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <MaterialIcons name="timer" size={14} color="#475569" />
          <Text style={styles.tagText}>{item.duration || 'N/A'}</Text>
        </View>
        <View style={styles.tag}>
          <MaterialIcons name="attach-money" size={14} color="#475569" />
          <Text style={styles.tagText}>{item.stipend || 'Unpaid'}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => setSelectedJob(item)}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => handleApply(item)}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search role, company..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={64} color="#E2E8F0" />
            <Text style={styles.emptyText}>No live jobs available right now</Text>
          </View>
        }
      />

      {/* Job Details Modal */}
      <Modal visible={!!selectedJob} animationType="slide" presentationStyle="pageSheet">
        {selectedJob && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Job Details</Text>
              <TouchableOpacity onPress={() => setSelectedJob(null)}>
                <MaterialIcons name="close" size={24} color="#1E293B" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <Text style={styles.detailTitle}>{selectedJob.title}</Text>
              <Text style={styles.detailCompany}>{selectedJob.company || selectedJob.companyName}</Text>
              
              <View style={styles.detailSection}>
                <Text style={styles.sectionHeader}>Description</Text>
                <Text style={styles.sectionBody}>{selectedJob.description}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionHeader}>Eligibility</Text>
                <Text style={styles.sectionBody}>{selectedJob.eligibility || 'Open to all'}</Text>
              </View>

               <View style={styles.detailSection}>
                <Text style={styles.sectionHeader}>Stipend</Text>
                <Text style={styles.sectionBody}>{selectedJob.stipend ? `₹${selectedJob.stipend} / month` : 'Unpaid'}</Text>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
               <TouchableOpacity 
                style={styles.fullWidthButton}
                onPress={() => handleApply(selectedJob)}
              >
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16 },
  listContent: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: { flexDirection: 'row', marginBottom: 16 },
  iconBox: {
    width: 48, height: 48,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerText: { flex: 1, justifyContent: 'center' },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  companyName: { color: '#64748B', fontWeight: '500' },
  tagsRow: { flexDirection: 'row', marginBottom: 16 },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  tagText: { marginLeft: 6, color: '#475569', fontWeight: '600', fontSize: 13 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginBottom: 16 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewDetailsText: { color: '#3B82F6', fontWeight: '600' },
  applyButton: { backgroundColor: '#1E293B', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  applyButtonText: { color: 'white', fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#94A3B8', marginTop: 16 },
  
  modalContainer: { flex: 1, backgroundColor: 'white', marginTop: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  modalContent: { padding: 24, flex: 1 },
  detailTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  detailCompany: { fontSize: 16, color: '#64748B', marginBottom: 24 },
  detailSection: { marginBottom: 24 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#94A3B8', marginBottom: 8 },
  sectionBody: { fontSize: 16, color: '#1E293B', lineHeight: 24 },
  modalFooter: { padding: 20, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  fullWidthButton: { backgroundColor: '#1E293B', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
});

export default StudentJobsScreen;