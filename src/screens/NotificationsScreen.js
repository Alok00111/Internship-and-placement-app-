import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NotificationsScreen = ({ route, navigation }) => {
  const { role } = route.params;

  const getNotifications = () => {
    if (role === 'Student') {
      return [
        { id: '1', title: 'Application Viewed', body: 'TechCorp has viewed your application for Flutter Dev.', time: '2m ago', icon: 'visibility', color: '#3B82F6' },
        { id: '2', title: 'New Job Alert', body: 'DataBiz just posted a new role: Data Analyst.', time: '1h ago', icon: 'work', color: '#F59E0B' },
      ];
    } else if (role === 'Corporate') {
      return [
        { id: '1', title: 'New Applicant', body: 'Alok (Student) applied for Flutter Developer Intern.', time: '5m ago', icon: 'person', color: '#3B82F6' },
        { id: '2', title: 'Job Verified', body: 'Your "Data Analyst" proposal was verified by Master Admin.', time: '1d ago', icon: 'check-circle', color: '#22C55E' },
      ];
    } else if (role === 'Master Admin') {
      return [
        { id: '1', title: 'Verification Request', body: 'New company "StartupHub" uploaded legal documents.', time: '10m ago', icon: 'business', color: '#A855F7' },
      ];
    } else {
      // Placement Coordinator
      return [
        { id: '1', title: 'Pending Approval', body: '3 verified jobs are waiting for final publishing.', time: '30m ago', icon: 'checklist', color: '#EF4444' },
      ];
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
        <MaterialIcons name={item.icon} size={24} color={item.color} />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={getNotifications()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyCenter}>
            <MaterialIcons name="notifications-off" size={64} color="#CBD5E1" />
            <Text style={{ color: '#94A3B8', marginTop: 16 }}>No new notifications</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 50, paddingBottom: 16, paddingHorizontal: 16,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  backButton: { marginRight: 16, padding: 8, backgroundColor: '#F8FAFC', borderRadius: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  card: {
    flexDirection: 'row', padding: 16, marginBottom: 16,
    backgroundColor: 'white', borderRadius: 12,
    borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  iconBox: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  body: { color: '#64748B', marginTop: 4, lineHeight: 20 },
  time: { color: '#94A3B8', fontSize: 12, marginTop: 8 },
  emptyCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
});

export default NotificationsScreen;