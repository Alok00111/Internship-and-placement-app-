import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const StudentProfileScreen = () => {
  // State for user details (Generic placeholders)
  const [studentDetails, setStudentDetails] = useState({
    name: "Student Name",           // was Alok
    email: "student@email.com",
    degree: "Bachelor of Technology", // was BCA
    university: "University Name",    // was Christ University
    cgpa: "0.0",
    skills: ["Skill 1", "Skill 2"]
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{studentDetails.name[0]}</Text>
        </View>
        <Text style={styles.name}>{studentDetails.name}</Text>
        <Text style={styles.course}>{studentDetails.degree}</Text>
        <Text style={styles.university}>{studentDetails.university}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.infoText}>Email: {studentDetails.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Stats</Text>
        <Text style={styles.infoText}>CGPA: {studentDetails.cgpa}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { alignItems: 'center', padding: 20, backgroundColor: '#fff', marginBottom: 10 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#334155' },
  course: { fontSize: 18, color: '#475569', marginTop: 5 },
  university: { fontSize: 16, color: '#64748b', marginTop: 2 },
  section: { backgroundColor: '#fff', padding: 15, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#0F172A' },
  infoText: { fontSize: 16, color: '#475569', marginBottom: 5 },
});

export default StudentProfileScreen;