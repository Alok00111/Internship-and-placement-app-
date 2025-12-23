import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import { JobProvider } from './src/context/JobContext';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import NotificationsScreen from './src/screens/NotificationsScreen'; // Import Notifications

// Student Screens
import StudentJobsScreen from './src/screens/StudentJobsScreen';
import StudentApplicationsScreen from './src/screens/StudentApplicationsScreen';
import StudentProfileScreen from './src/screens/StudentProfileScreen';

// Corporate Screens
import PostJobScreen from './src/screens/PostJobScreen';
import CorporateProposalsScreen from './src/screens/CorporateProposalsScreen';
import CorporateApplicantsScreen from './src/screens/CorporateApplicantsScreen';
import CorporateProfileScreen from './src/screens/CorporateProfileScreen';

// --- NEW ADMIN/PC SCREENS ---
import AdminReviewScreen from './src/screens/AdminReviewScreen';
import AdminVerifyScreen from './src/screens/AdminVerifyScreen';
import PcReviewScreen from './src/screens/PcReviewScreen';
import PcStatsScreen from './src/screens/PcStatsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <JobProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#0F172A" />
        
        <Stack.Navigator 
          initialRouteName="Splash" 
          screenOptions={{ headerShown: false }}
        >
          {/* Auth */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          
          {/* Notifications Route Added Here */}
          <Stack.Screen name="Notifications" component={NotificationsScreen} />

          {/* Student */}
          <Stack.Screen name="StudentJobs" component={StudentJobsScreen} options={{ headerShown: true, title: 'Latest Opportunities' }} />
          <Stack.Screen name="StudentApplications" component={StudentApplicationsScreen} options={{ headerShown: true, title: 'My Applications' }} />
          <Stack.Screen name="StudentProfile" component={StudentProfileScreen} options={{ headerShown: true, title: 'My Profile' }} />

          {/* Corporate */}
          <Stack.Screen name="PostJob" component={PostJobScreen} options={{ headerShown: true, title: 'New Job Proposal' }} />
          <Stack.Screen name="CorporateProposals" component={CorporateProposalsScreen} options={{ headerShown: true, title: 'My Proposals' }} />
          <Stack.Screen name="CorporateApplicants" component={CorporateApplicantsScreen} options={{ headerShown: true, title: 'Manage Applicants' }} />
          <Stack.Screen name="CorporateProfile" component={CorporateProfileScreen} options={{ headerShown: true, title: 'Company Profile' }} />

          {/* Admin & PC */}
          <Stack.Screen name="AdminReview" component={AdminReviewScreen} options={{ headerShown: true, title: 'Review Proposals' }} />
          <Stack.Screen name="AdminVerify" component={AdminVerifyScreen} options={{ headerShown: true, title: 'Verify Corporates' }} />
          <Stack.Screen name="PcReview" component={PcReviewScreen} options={{ headerShown: true, title: 'Approve for Students' }} />
          <Stack.Screen name="PcStats" component={PcStatsScreen} options={{ headerShown: true, title: 'Placement Statistics' }} />

        </Stack.Navigator>
      </NavigationContainer>
    </JobProvider>
  );
}