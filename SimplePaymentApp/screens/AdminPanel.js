import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AdminPanel = ({ route }) => {
  const { token, user } = route.params || {}; // Get token and user details

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <Text style={styles.info}>Welcome, {user.name}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Phone: {user.phoneNumber}</Text>
      <Text style={styles.info}>Balance: ₹{user.balance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

export default AdminPanel;
