import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { JobContext } from '../../context/JobContext';

const LoginScreen = ({ navigation, route }) => {
  const { setCurrentUser } = useContext(JobContext);
  
  // 1. Get the University Name passed from the previous screen
  const { universityName, universityId } = route.params || { universityName: 'Placement Portal', universityId: null };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // SIMULATED LOGIN LOGIC
    // In the future, we will send 'universityId' to the backend here
    let userRole = 'student'; 
    let userName = 'Student User';

    if (email.includes('admin')) {
      userRole = 'admin';
      userName = 'Admin User';
    } else if (email.includes('corp')) {
      userRole = 'corporate';
      userName = 'Corporate Partner';
    } else if (email.includes('pc')) {
      userRole = 'pc';
      userName = 'Placement Coordinator';
    }

    // Save to Context
    const userData = { 
      name: userName, 
      email: email, 
      role: userRole,
      universityId: universityId, // Save which uni they belong to
      universityName: universityName
    };
    
    setCurrentUser(userData);

    // Navigate to Dashboard
    navigation.replace('Dashboard');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        {/* Placeholder Logo */}
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>{universityName[0]}</Text>
        </View>
        
        {/* 2. Dynamic Title based on Selection */}
        <Text style={styles.welcomeText}>Login to</Text>
        <Text style={styles.uniName}>{universityName}</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* 3. Option to go back and change university */}
        <TouchableOpacity 
          style={styles.changeUniButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.changeUniText}>Change University</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logoBox: {
    width: 80, height: 80, backgroundColor: '#0f172a', borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 15,
    elevation: 5
  },
  logoText: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  welcomeText: { fontSize: 16, color: '#64748b' },
  uniName: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', textAlign: 'center', paddingHorizontal: 20 },
  
  formContainer: { paddingHorizontal: 30 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 8 },
  input: {
    backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20,
    borderWidth: 1, borderColor: '#e2e8f0', color: '#1e293b'
  },
  loginButton: {
    backgroundColor: '#2563eb', padding: 18, borderRadius: 12,
    alignItems: 'center', marginTop: 10, shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  
  changeUniButton: { marginTop: 20, alignItems: 'center' },
  changeUniText: { color: '#64748b', fontSize: 14, textDecorationLine: 'underline' }
});

export default LoginScreen;