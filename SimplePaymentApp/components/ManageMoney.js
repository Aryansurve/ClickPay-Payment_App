import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageMoney = ({ navigation }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('jwt_token');
      if (!storedToken) {
        Alert.alert('Error', 'Session expired. Please log in again.');
        navigation.replace('SignInScreen');
      } else {
        setToken(storedToken);
      }
    };
    getToken();
  }, []);

  const actions = [
    { icon: 'document-text-outline', title: 'Personal loan', subtitle: 'Instant approval & paperless', action: () => {} },
    { icon: 'checkmark-circle-outline', title: 'Check your CIBIL score for free', action: () => {} },
    { icon: 'time-outline', title: 'See transaction history', action: () => {} },
    { 
      icon: 'home-outline', 
      title: 'Check bank balance', 
      action: () => navigation.navigate('BankBalanceScreen', { token }) // ✅ Token passed here
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Manage your money</Text>
      {actions.map((item, index) => (
        <TouchableOpacity key={index} style={styles.actionItem} onPress={item.action}>
          <Ionicons name={item.icon} size={28} color='#007BFF' style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.actionTitle}>{item.title}</Text>
            {item.subtitle && <Text style={styles.actionSubtitle}>{item.subtitle}</Text>}
          </View>
          {index === 0 && <Text style={styles.applyNow}>Apply now</Text>}
          <MaterialCommunityIcons name='chevron-right' size={26} color='#A0A0A0' />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  icon: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  actionSubtitle: {
    color: '#6D6D6D',
    fontSize: 12,
    marginTop: 2,
  },
  applyNow: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default ManageMoney;
