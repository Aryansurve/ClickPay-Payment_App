import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import QuickActions from '../components/QuickAction';
import PeopleList from '../components/PeopleList';
import BusinessList from '../components/BusinessList';

const DashboardScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('jwt_token');
        console.log("Retrieved Token:", storedToken); 
        if (!storedToken) {
          Alert.alert("Session Expired", "Please log in again.");
          navigation.replace("SignInScreen");
          return;
        }
        setToken(storedToken);
      } catch (error) {
        console.error("Error retrieving token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Header navigation={navigation} token={token} /> 
      <Image source={require('../assets/bag.png')} style={styles.logo} />
      <QuickActions navigation={navigation} />
      <View style={styles.separator} />
      <PeopleList token={token}/>
      <View style={styles.separator} />
      <BusinessList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  separator: {
    backgroundColor: 'black',
    height: 2,
    marginHorizontal: 10,
    alignSelf: 'center',
    width: '90%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
