import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../context/JobContext';

const CorporateApplicantsScreen = () => {
  const { jobs } = useContext(JobContext);
  const [refresh, setRefresh] = useState(false); // To force re-render

  // Filter jobs by My Company AND must have applications
  const jobsWithApplicants = jobs.filter(job => 
    job.company === "My Company" && job.applications.length > 0
  );

  const updateStatus = (application, newStatus) => {
    application.status = newStatus;
    setRefresh(!refresh); // Trigger UI update
  };

  const renderStudentRow = (application) => {
    const isSelected = application.status === 'Selected';
    const isRejected = application.status === 'Rejected';
    
    return (
      <View style={styles.studentRow} key={application.studentName}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{application.studentName[0]}</Text>
        </View>
        
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.studentName}>{application.studentName}</Text>
          <Text style={[
            styles.statusText, 
            isSelected && { color: '#22C55E' },
            isRejected && { color: '#EF4444' }
          ]}>
            Status: {application.status}
          </Text>
        </View>

        {application.status === 'Applied' ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              onPress={() => updateStatus(application, 'Rejected')}
              style={[styles.btn, styles.btnReject]}
            >
              <MaterialIcons name="close" size={16} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => updateStatus(application, 'Selected')}
              style={[styles.btn, styles.btnAccept]}
            >
              <Text style={styles.btnText}>Select</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <MaterialIcons 
            name={isSelected ? "check-circle" : "cancel"} 
            size={24} 
            color={isSelected ? "#22C55E" : "#EF4444"} 
          />
        )}
      </View>
    );
  };

  const renderJobCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="work" size={20} color="#1E293B" />
          <Text style={styles.jobTitle}>{item.title}</Text>
        </View>
        <Text style={styles.applicantCount}>{item.applications.length} Applicants</Text>
      </View>
      <View style={styles.divider} />
      {item.applications.map(app => renderStudentRow(app))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobsWithApplicants}
        renderItem={renderJobCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="people-outline" size={64} color="#E2E8F0" />
            <Text style={styles.emptyText}>No applicants yet.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  card: {
    backgroundColor: 'white', borderRadius: 12, marginBottom: 24,
    borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden',
  },
  cardHeader: { 
    padding: 16, backgroundColor: '#F1F5F9', 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
  },
  jobTitle: { fontWeight: 'bold', fontSize: 16, marginLeft: 12, color: '#1E293B' },
  applicantCount: { color: '#3B82F6', fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#E2E8F0' },
  studentRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  avatar: { 
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#EFF6FF', 
    justifyContent: 'center', alignItems: 'center' 
  },
  avatarText: { color: '#3B82F6', fontWeight: 'bold', fontSize: 16 },
  studentName: { fontWeight: 'bold', color: '#1E293B' },
  statusText: { fontSize: 12, color: '#F59E0B', fontWeight: 'bold' },
  actionButtons: { flexDirection: 'row', alignItems: 'center' },
  btn: { padding: 8, borderRadius: 6, marginLeft: 8, justifyContent: 'center', alignItems: 'center' },
  btnReject: { backgroundColor: '#EF4444' },
  btnAccept: { backgroundColor: '#22C55E', paddingHorizontal: 12 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#94A3B8', marginTop: 16 },
});

export default CorporateApplicantsScreen;