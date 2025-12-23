import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StudentProfileScreen = () => {
  const [resumeName, setResumeName] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate Network Delay
    setTimeout(() => {
      setIsUploading(false);
      setResumeName("Alok_Resume_2025.pdf");
      Alert.alert("Success", "Resume uploaded successfully!");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={50} color="white" />
        </View>
        <Text style={styles.name}>Alok (Student)</Text>
        <Text style={styles.subText}>Christ University • BCA</Text>
      </View>

      {/* Resume Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Resume / CV</Text>
          {resumeName && <MaterialIcons name="check-circle" size={24} color="#22C55E" />}
        </View>
        
        <Text style={styles.cardDesc}>Upload your latest resume to apply for jobs.</Text>

        {resumeName && (
          <View style={styles.fileContainer}>
            <MaterialIcons name="picture-as-pdf" size={24} color="#EF4444" />
            <Text style={styles.fileName}>{resumeName}</Text>
            <TouchableOpacity onPress={() => setResumeName(null)}>
              <MaterialIcons name="delete-outline" size={24} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <MaterialIcons name="cloud-upload" size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>
                {resumeName ? "Update Resume" : "Upload PDF"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { alignItems: 'center', padding: 32 },
  avatar: { 
    width: 100, height: 100, borderRadius: 50, 
    backgroundColor: '#1E293B', 
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16
  },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
  subText: { color: '#64748B', marginTop: 4 },
  card: {
    backgroundColor: 'white', margin: 24, padding: 20,
    borderRadius: 16,
    borderWidth: 1, borderColor: '#E2E8F0',
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  cardDesc: { color: '#64748B', marginBottom: 24, lineHeight: 20 },
  fileContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#EFF6FF', padding: 12, borderRadius: 8,
    marginBottom: 24, borderWidth: 1, borderColor: '#BFDBFE'
  },
  fileName: { flex: 1, marginLeft: 12, fontWeight: '600', color: '#1E293B' },
  uploadButton: {
    backgroundColor: '#1E293B', flexDirection: 'row',
    justifyContent: 'center', padding: 16, borderRadius: 8
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default StudentProfileScreen;