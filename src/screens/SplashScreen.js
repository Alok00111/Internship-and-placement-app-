import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }) => {
  // Animation Values
  const scaleValue = useRef(new Animated.Value(0)).current;
  const progressValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Start Logo Animation (Scale Effect)
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    // 2. Start Progress Bar Animation (0% to 100% in 3 seconds)
    Animated.timing(progressValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false, // width property doesn't support native driver
    }).start();

    // 3. Timer to navigate to Login after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Interpolate width for progress bar
  const widthInterpolated = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* CENTER CONTENT */}
      <Animated.View style={[styles.centerContent, { transform: [{ scale: scaleValue }] }]}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="account-balance" size={70} color="#0F172A" />
        </View>
        
        <Text style={styles.universityName}>CHRIST</Text>
        <Text style={styles.subText}>(Deemed to be University)</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Internship & Placement Portal</Text>
        </View>
      </Animated.View>

      {/* BOTTOM PROGRESS BAR */}
      <View style={styles.bottomSection}>
        <Text style={styles.loadingText}>Initializing Secure Environment...</Text>
        <View style={styles.progressBarBackground}>
          <Animated.View 
            style={[
              styles.progressBarFill, 
              { width: widthInterpolated }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep Blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 100, // Circular
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  universityName: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    letterSpacing: 4,
    fontFamily: 'serif', 
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '300',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: {
    color: '#FFD700', // Amber/Gold
    fontWeight: 'bold',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.24)',
    fontSize: 10,
    marginBottom: 10,
  },
  progressBarBackground: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700', // Amber
  },
});

export default SplashScreen;