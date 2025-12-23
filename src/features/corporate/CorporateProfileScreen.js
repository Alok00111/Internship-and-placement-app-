import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../../context/JobContext';

const CorporateProfileScreen = () => {
  const { currentCompany, setCurrentCompany } = useContext(JobContext);
  
  const handleUpload = () => {
    if (currentCompany.documentUrl) return;

    // Simulate Upload
    const updatedCompany = { ...currentCompany, documentUrl: 'uploaded_doc.pdf' };
    setCurrentCompany(updatedCompany);
    Alert.alert("Success", "Documents submitted for review!");
  };

  const getStatusColor = () => {
    if (currentCompany.status === 'Verified') return '#22C55E';
    if (currentCompany.status === 'Rejected') return '#EF4444';
    return '#F59E0B'; // Orange
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      {/* Company Info Card */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{currentCompany.name[0]}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.companyName}>{currentCompany.name}</Text>
            <Text style={styles.email}>{currentCompany.email}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Verification Status</Text>
      
      <View style={[styles.statusBox, { backgroundColor: `${getStatusColor()}15`, borderColor: `${getStatusColor()}40` }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons 
            name={currentCompany.status === 'Verified' ? 'verified' : 'hourglass-empty'} 
            size={32} 
            color={getStatusColor()} 
          />
          <View style={{ marginLeft: 16 }}>
            <Text style={[styles.statusText, { color: getStatusColor() }]}>{currentCompany.status}</Text>
            <Text style={{ color: getStatusColor(), marginTop: 4 }}>
              {currentCompany.status === 'Verified' ? "You can now post jobs." : "Upload docs to get verified."}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Legal Documents</Text>
      <Text style={styles.helperText}>Upload Incorporation Certificate / GST</Text>

      {currentCompany.documentUrl && (
        <View style={styles.docRow}>
          <MaterialIcons name="description" size={24} color="#3B82F6" />
          <Text style={styles.docName}>Incorporation_Cert.pdf</Text>
          <MaterialIcons name="check-circle" size={20} color="#22C55E" />
        </View>
      )}

      <TouchableOpacity 
        style={[styles.uploadButton, currentCompany.documentUrl && styles.disabledButton]}
        onPress={handleUpload}
        disabled={!!currentCompany.documentUrl}
      >
        <MaterialIcons name="cloud-upload" size={20} color="white" />
        <Text style={styles.buttonText}>
          {currentCompany.documentUrl ? "Documents Submitted" : "Upload Documents"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  card: {
    backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 32,
    borderWidth: 1, borderColor: '#E2E8F0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { 
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#1E293B', 
    justifyContent: 'center', alignItems: 'center' 
  },
  avatarText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  companyName: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  email: { color: '#64748B', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 12 },
  statusBox: { 
    padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 32 
  },
  statusText: { fontSize: 18, fontWeight: 'bold' },
  helperText: { color: '#64748B', marginBottom: 16 },
  docRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF',
    padding: 12, borderRadius: 8, marginBottom: 16,
  },
  docName: { flex: 1, marginLeft: 12, fontWeight: 'bold', color: '#1E293B' },
  uploadButton: {
    backgroundColor: '#1E293B', flexDirection: 'row', justifyContent: 'center',
    padding: 16, borderRadius: 8, alignItems: 'center',
  },
  disabledButton: { opacity: 0.7 },
  buttonText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
});

export default CorporateProfileScreen;