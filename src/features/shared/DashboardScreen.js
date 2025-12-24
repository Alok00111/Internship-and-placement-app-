import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { JobContext } from '../../context/JobContext';

const DashboardScreen = ({ navigation }) => {
  const { currentUser } = useContext(JobContext);

  // If for some reason user is null, send them back to login
  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={{color: 'blue', marginTop: 20}}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- COMPONENT: MENU BUTTON ---
  const MenuButton = ({ title, icon, color, route }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate(route)}
    >
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={32} color="white" />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
    </TouchableOpacity>
  );

  // --- RENDER DIFFERENT MENUS BASED ON ROLE ---
  const renderMenu = () => {
    switch (currentUser.role) {
      case 'corporate':
        return (
          <>
            <MenuButton title="Post New Job" icon="add-circle" color="#2563EB" route="PostJob" />
            <MenuButton title="My Proposals" icon="list" color="#0F172A" route="CorporateProposals" />
            <MenuButton title="View Applicants" icon="people" color="#10B981" route="CorporateApplicants" />
            <MenuButton title="Company Profile" icon="business" color="#64748B" route="CorporateProfile" />
          </>
        );
      case 'admin':
        return (
          <>
            <MenuButton title="Review Proposals" icon="rate-review" color="#F59E0B" route="AdminReview" />
            <MenuButton title="Verify Companies" icon="verified-user" color="#7C3AED" route="AdminVerify" />
          </>
        );
      case 'pc':
        return (
          <>
            <MenuButton title="Approve for Students" icon="check-circle" color="#059669" route="PcReview" />
            <MenuButton title="Placement Statistics" icon="bar-chart" color="#2563EB" route="PcStats" />
          </>
        );
      default: // STUDENT
        return (
          <>
            <MenuButton title="Latest Opportunities" icon="work" color="#2563EB" route="StudentJobs" />
            <MenuButton title="My Applications" icon="assignment" color="#0F172A" route="StudentApplications" />
            <MenuButton title="My Profile" icon="person" color="#64748B" route="StudentProfile" />
          </>
        );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.userRole}>{currentUser.role.toUpperCase()} • {currentUser.universityName}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <MaterialIcons name="notifications-none" size={28} color="#1E293B" />
        </TouchableOpacity>
      </View>

      {/* Dynamic Menu Grid */}
      <View style={styles.menuContainer}>
        {renderMenu()}
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => navigation.replace('InstitutionSelection')}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  greeting: { fontSize: 16, color: '#64748B' },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  userRole: { fontSize: 12, color: '#2563EB', fontWeight: 'bold', marginTop: 4 },
  
  menuContainer: { padding: 20 },
  
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#1E293B', flex: 1 },
  
  logoutButton: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  logoutText: { color: '#EF4444', fontWeight: '600', fontSize: 16 },
});

export default DashboardScreen;