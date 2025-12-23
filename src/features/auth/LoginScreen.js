import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../../context/JobContext';

const ROLES = ["Student", "Corporate", "Master Admin", "Placement Coordinator"];

const LoginScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { setCurrentUser } = useContext(JobContext);

  const handleLogin = () => {
    if (!selectedRole) {
      Alert.alert("Error", "Please select a role first.");
      return;
    }

    // Update global user state
    setCurrentUser(prev => ({ ...prev, role: selectedRole }));

    // Navigate to Dashboard and pass the role param
    navigation.replace('Dashboard', { role: selectedRole });
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="school" size={60} color="#1E293B" />
      <Text style={styles.title}>CUIPMS Portal</Text>

      {/* Role Selection Grid */}
      <View style={styles.roleContainer}>
        <Text style={styles.label}>Select Role:</Text>
        <View style={styles.roleList}>
          {ROLES.map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleButton,
                selectedRole === role && styles.roleButtonSelected
              ]}
              onPress={() => setSelectedRole(role)}
            >
              <Text style={[
                styles.roleText,
                selectedRole === role && styles.roleTextSelected
              ]}>
                {role}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity 
        style={[styles.loginButton, !selectedRole && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={!selectedRole}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 40,
    color: '#1E293B',
  },
  roleContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    color: '#64748B',
  },
  roleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roleButton: {
    width: '48%',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  roleButtonSelected: {
    backgroundColor: '#1E293B',
    borderColor: '#1E293B',
  },
  roleText: {
    color: '#1E293B',
  },
  roleTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;