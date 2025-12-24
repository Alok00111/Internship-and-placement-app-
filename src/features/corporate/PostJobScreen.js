import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { JobContext } from '../../context/JobContext';

const PostJobScreen = ({ navigation }) => {
  // 1. Get currentUser to access universityId
  const { addJob, currentUser } = useContext(JobContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [stipend, setStipend] = useState('');
  const [eligibility, setEligibility] = useState('');

  const handleSubmit = () => {
    // Basic Validation
    if (!title || !description || !duration || !stipend || !eligibility) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate Network API Call
    setTimeout(() => {
      const newJob = {
        title,
        description,
        duration,
        stipend,
        eligibility,
        // 2. Use Real User Data & Stamp University ID
        company: currentUser?.name || "Corporate Partner", 
        universityId: currentUser?.universityId, // <--- CRITICAL: Locks job to this Uni
        postedBy: currentUser?.email,
        date: new Date().toISOString()
      };

      addJob(newJob);
      setIsSubmitting(false);
      
      Alert.alert("Success", "Proposal sent to Master Admin!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.headerTitle}>Job Details</Text>
      <Text style={styles.headerSubtitle}>Fill in all details for Admin verification.</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Job Title</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. Jr. Software Engineer"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Job Description</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Detailed roles & responsibilities..."
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
          <Text style={styles.label}>Duration</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. 6 Months"
            value={duration}
            onChangeText={setDuration}
          />
        </View>
        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Stipend (₹)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. 20000"
            keyboardType="numeric"
            value={stipend}
            onChangeText={setStipend}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Eligibility Criteria</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. Min CGPA 7.5, No Backlogs"
          value={eligibility}
          onChangeText={setEligibility}
        />
      </View>

      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Proposal</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  headerSubtitle: { color: '#64748B', marginTop: 8, marginBottom: 24 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 },
  input: { 
    borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, 
    padding: 12, fontSize: 16, backgroundColor: '#F8FAFC' 
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row' },
  submitButton: {
    backgroundColor: '#1E293B', padding: 16, borderRadius: 8,
    alignItems: 'center', marginTop: 20,
  },
  submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default PostJobScreen;