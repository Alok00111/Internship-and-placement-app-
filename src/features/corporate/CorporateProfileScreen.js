import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const CorporateProfileScreen = () => {
  // FIX 2: Use local state for now so it doesn't crash on 'undefined'
  const [companyDetails, setCompanyDetails] = useState({
    name: "Tech Solutions Inc.",    // Placeholder Name
    email: "hr@techsolutions.com",
    industry: "Software Development",
    location: "Bangalore, India",
    description: "We are a leading tech company focused on AI and Cloud Computing."
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{companyDetails.name[0]}</Text>
        </View>
        <Text style={styles.name}>{companyDetails.name}</Text>
        <Text style={styles.industry}>{companyDetails.industry}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Company</Text>
        <Text style={styles.description}>{companyDetails.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{companyDetails.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{companyDetails.location}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { alignItems: 'center', padding: 25, backgroundColor: '#fff', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  avatarPlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#2563EB', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  industry: { fontSize: 16, color: '#64748b', marginTop: 5 },
  section: { backgroundColor: '#fff', padding: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 15, color: '#0F172A' },
  description: { fontSize: 15, lineHeight: 24, color: '#475569' },
  row: { flexDirection: 'row', marginBottom: 10 },
  label: { fontWeight: '600', color: '#334155', width: 80 },
  value: { color: '#475569', flex: 1 },
  editButton: { margin: 20, backgroundColor: '#2563EB', padding: 15, borderRadius: 10, alignItems: 'center' },
  editButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default CorporateProfileScreen;