import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DashboardScreen = ({ route, navigation }) => {
  const { role } = route.params || { role: 'Student' };

  const getMenuOptions = () => {
    switch (role) {
      case 'Corporate':
        return [
          { id: '1', title: "Post Proposal", icon: "add-circle-outline", screen: "PostJob" },
          { id: '2', title: "My Proposals", icon: "list-alt", screen: "CorporateProposals" },
          { id: '3', title: "Applicants", icon: "people-outline", screen: "CorporateApplicants" },
          { id: '4', title: "Company Profile", icon: "business", screen: "CorporateProfile" },
        ];
      case 'Master Admin':
        return [
          { id: '1', title: "Review Proposals", icon: "rate-review", screen: "AdminReview" },
          { id: '2', title: "Verify Corporates", icon: "verified-user", screen: "AdminVerify" },
        ];
      case 'Placement Coordinator':
        return [
          { id: '1', title: "Final Approval", icon: "checklist", screen: "PcReview" },
          { id: '2', title: "Placement Stats", icon: "analytics", screen: "PcStats" },
        ];
      case 'Student':
      default:
        return [
          { id: '1', title: "Find Jobs", icon: "search", screen: "StudentJobs" },
          { id: '2', title: "Applied", icon: "history", screen: "StudentApplications" },
          { id: '3', title: "My Profile", icon: "person-outline", screen: "StudentProfile" },
        ];
    }
  };

  const handleNavigation = (screenName) => {
    // --- UPDATED LOGIC FOR STEP 5 ---
    // All screens are now implemented!
    navigation.navigate(screenName);
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => handleNavigation(item.screen)}
    >
      <MaterialIcons name={item.icon} size={32} color="#1E293B" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* LEFT SIDE: Back Button + Title */}
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={() => navigation.replace('Login')} 
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{role} Dashboard</Text>
        </View>

        {/* RIGHT SIDE: Notifications & Logout */}
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Notifications', { role })} 
            style={{ marginRight: 16 }}
          >
            <MaterialIcons name="notifications-none" size={28} color="#1E293B" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <MaterialIcons name="logout" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {role}</Text>
        
        <FlatList
          data={getMenuOptions()}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  content: { flex: 1, padding: 24 },
  welcomeText: { fontSize: 20, fontWeight: 'bold', marginBottom: 32, color: '#1E293B' },
  gridContainer: { paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    backgroundColor: '#F8FAFC', width: '47%', aspectRatio: 1,
    justifyContent: 'center', alignItems: 'center', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(150, 150, 150, 0.1)',
  },
  cardText: { marginTop: 10, fontWeight: '600', color: '#1E293B', textAlign: 'center' },
});

export default DashboardScreen;