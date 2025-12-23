import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Auth Features
import SplashScreen from '../features/auth/SplashScreen';
import LoginScreen from '../features/auth/LoginScreen';

// Shared Features
import DashboardScreen from '../features/shared/DashboardScreen';
import NotificationsScreen from '../features/shared/NotificationsScreen';

// Student Features
import StudentJobsScreen from '../features/student/StudentJobsScreen';
import StudentApplicationsScreen from '../features/student/StudentApplicationsScreen';
import StudentProfileScreen from '../features/student/StudentProfileScreen';

// Corporate Features
import PostJobScreen from '../features/corporate/PostJobScreen';
import CorporateProposalsScreen from '../features/corporate/CorporateProposalsScreen';
import CorporateApplicantsScreen from '../features/corporate/CorporateApplicantsScreen';
import CorporateProfileScreen from '../features/corporate/CorporateProfileScreen';

// Admin & PC Features
import AdminReviewScreen from '../features/admin/AdminReviewScreen';
import AdminVerifyScreen from '../features/admin/AdminVerifyScreen';
import PcReviewScreen from '../features/placementCell/PcReviewScreen';
import PcStatsScreen from '../features/placementCell/PcStatsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash" 
        screenOptions={{ headerShown: false }}
      >
        {/* Auth */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        
        {/* Notifications */}
        <Stack.Screen name="Notifications" component={NotificationsScreen} />

        {/* Student */}
        <Stack.Screen 
          name="StudentJobs" 
          component={StudentJobsScreen} 
          options={{ headerShown: true, title: 'Latest Opportunities' }} 
        />
        <Stack.Screen 
          name="StudentApplications" 
          component={StudentApplicationsScreen} 
          options={{ headerShown: true, title: 'My Applications' }} 
        />
        <Stack.Screen 
          name="StudentProfile" 
          component={StudentProfileScreen} 
          options={{ headerShown: true, title: 'My Profile' }} 
        />

        {/* Corporate */}
        <Stack.Screen 
          name="PostJob" 
          component={PostJobScreen} 
          options={{ headerShown: true, title: 'New Job Proposal' }} 
        />
        <Stack.Screen 
          name="CorporateProposals" 
          component={CorporateProposalsScreen} 
          options={{ headerShown: true, title: 'My Proposals' }} 
        />
        <Stack.Screen 
          name="CorporateApplicants" 
          component={CorporateApplicantsScreen} 
          options={{ headerShown: true, title: 'Manage Applicants' }} 
        />
        <Stack.Screen 
          name="CorporateProfile" 
          component={CorporateProfileScreen} 
          options={{ headerShown: true, title: 'Company Profile' }} 
        />

        {/* Admin & PC */}
        <Stack.Screen 
          name="AdminReview" 
          component={AdminReviewScreen} 
          options={{ headerShown: true, title: 'Review Proposals' }} 
        />
        <Stack.Screen 
          name="AdminVerify" 
          component={AdminVerifyScreen} 
          options={{ headerShown: true, title: 'Verify Corporates' }} 
        />
        <Stack.Screen 
          name="PcReview" 
          component={PcReviewScreen} 
          options={{ headerShown: true, title: 'Approve for Students' }} 
        />
        <Stack.Screen 
          name="PcStats" 
          component={PcStatsScreen} 
          options={{ headerShown: true, title: 'Placement Statistics' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;