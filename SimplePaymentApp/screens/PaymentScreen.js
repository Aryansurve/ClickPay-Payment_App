// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Alert,
//   FlatList,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// const PaymentScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { person, userBalance, setUserBalance } = route.params;

//   const [transactions, setTransactions] = useState([]);
//   const [showMessageInput, setShowMessageInput] = useState(false);
//   const [message, setMessage] = useState("");

//   const handlePayment = () => {
//     const amountToSend = parseFloat(message);

//     if (isNaN(amountToSend) || amountToSend <= 0) {
//       Alert.alert("Invalid Amount", "Enter a valid payment amount.");
//       return;
//     }

//     if (amountToSend > userBalance) {
//       Alert.alert("Insufficient Balance", "You don't have enough balance to make this payment.");
//       return;
//     }

//     const newBalance = userBalance - amountToSend;
//     setUserBalance(newBalance);

//     const newTransaction = {
//       id: transactions.length + 1,
//       amount: `₹ ${amountToSend}`,
//       paymentType: `Payment to ${person.name}`,
//       date: new Date().toLocaleDateString(),
//     };

//     setTransactions([...transactions, newTransaction]);
//     setMessage("");
//     setShowMessageInput(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Image source={{ uri: person.image }} style={styles.smallProfileImage} />
//         <View>
//           <Text style={styles.headerName}>{person.name}</Text>
//           <Text style={styles.phoneNumber}>{person.phoneNumber}</Text>
//         </View>
//       </View>

//       <FlatList
//         data={transactions}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={[styles.paymentCard, styles.paymentToThem, styles.rightAlign]}>
//             <Text style={styles.amountText}>{item.amount}</Text>
//             <Text style={styles.paymentType}>{item.paymentType}</Text>
//             <Text style={styles.dateText}>{item.date}</Text>
//           </View>
//         )}
//         ListEmptyComponent={<Text style={styles.noTransactionText}>No Transactions Yet</Text>}
//       />

//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionButton} onPress={() => setShowMessageInput(true)}>
//           <Text style={styles.actionText}>Pay</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionText}>Request</Text>
//         </TouchableOpacity>
//       </View>

//       {showMessageInput && (
//         <KeyboardAvoidingView behavior="padding" style={styles.messageInputContainer}>
//           <TextInput
//             style={styles.messageInput}
//             placeholder="Enter amount"
//             keyboardType="numeric"
//             value={message}
//             onChangeText={(text) => setMessage(text)}
//           />
//           <TouchableOpacity style={styles.sendButton} onPress={handlePayment}>
//             <Text style={styles.sendButtonText}>Send</Text>
//           </TouchableOpacity>
//         </KeyboardAvoidingView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 40 },
//   header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
//   backButton: { marginRight: 10 },
//   smallProfileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   headerName: { fontSize: 18, fontWeight: 'bold' },
//   phoneNumber: { fontSize: 14, color: '#555' },
//   paymentCard: { borderRadius: 10, padding: 15, marginBottom: 10, elevation: 3, width: '48%' },
//   paymentToThem: { backgroundColor: '#D4F7DC' },
//   rightAlign: { alignSelf: 'flex-end' },
//   amountText: { fontSize: 18, fontWeight: 'bold' },
//   paymentType: { fontSize: 14, marginTop: 5 },
//   dateText: { fontSize: 12, color: '#777', marginTop: 5 },
//   noTransactionText: { textAlign: 'center', color: '#777', marginTop: 20 },
//   actions: { flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
//   actionButton: { backgroundColor: '#007BFF', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 20 },
//   actionText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   messageInputContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
//   messageInput: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginRight: 10, fontSize: 16 },
//   sendButton: { backgroundColor: '#007BFF', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
//   sendButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });

// export default PaymentScreen;

// import React from "react";
// import { View, Text, Image, StyleSheet } from "react-native";

// const BASE_URL = "http://192.168.0.143:5000"; // Update with your backend IP

// const PaymentScreen = ({ route }) => {
//   const { receiverId, receiverName, receiverPhoneNumber, receiverimage } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Payment Screen</Text>

//       {/* Correctly load image */}
//       {receiverimage ? (
//         <Image source={{ uri: `${BASE_URL}${receiverimage}` }} style={styles.profileImage} />
//       ) : (
//         <Text style={styles.errorText}>No Image Available</Text>
//       )}

//       <Text style={styles.name}>{receiverName || "Unknown User"}</Text>
//       <Text style={styles.phone}>{receiverPhoneNumber || "No Phone Number"}</Text>
//       <Text style={styles.upiId}>UPI ID: {receiverId}@upi</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f4f4f4" },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
//   profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
//   name: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
//   phone: { fontSize: 16, color: "gray" },
//   upiId: { fontSize: 16, color: "gray" },
//   errorText: { color: "red", fontSize: 16, marginTop: 10 },
// });

// export default PaymentScreen;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Alert,
//   FlatList,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";

// const BASE_URL = "http://192.168.0.143:5000";

// const PaymentScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { receiverId, receiverName, receiverPhoneNumber, receiverimage, userBalance, setUserBalance } = route.params;

//   const [transactions, setTransactions] = useState([]);
//   const [showMessageInput, setShowMessageInput] = useState(false);
//   const [message, setMessage] = useState("");

//   const handlePayment = () => {
//     const amountToSend = parseFloat(message);

//     if (isNaN(amountToSend) || amountToSend <= 0) {
//       Alert.alert("Invalid Amount", "Enter a valid payment amount.");
//       return;
//     }

//     if (amountToSend > userBalance) {
//       Alert.alert("Insufficient Balance", "You don't have enough balance to make this payment.");
//       return;
//     }

//     const newBalance = userBalance - amountToSend;
//     setUserBalance(newBalance);

//     const newTransaction = {
//       id: transactions.length + 1,
//       amount: `₹ ${amountToSend}`,
//       paymentType: `Payment to ${receiverName}`,
//       date: new Date().toLocaleDateString(),
//     };

//     setTransactions([...transactions, newTransaction]);
//     setMessage("");
//     setShowMessageInput(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Image source={{ uri: `${BASE_URL}${receiverimage}` }} style={styles.smallProfileImage} />
//         <View>
//           <Text style={styles.headerName}>{receiverName || "Unknown User"}</Text>
//           <Text style={styles.phoneNumber}>{receiverPhoneNumber || "No Phone Number"}</Text>
//         </View>
//       </View>

//       <FlatList
//         data={transactions}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={[styles.paymentCard, styles.paymentToThem, styles.rightAlign]}>
//             <Text style={styles.amountText}>{item.amount}</Text>
//             <Text style={styles.paymentType}>{item.paymentType}</Text>
//             <Text style={styles.dateText}>{item.date}</Text>
//           </View>
//         )}
//         ListEmptyComponent={<Text style={styles.noTransactionText}>No Transactions Yet</Text>}
//       />

//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionButton} onPress={() => setShowMessageInput(true)}>
//           <Text style={styles.actionText}>Pay</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionText}>Request</Text>
//         </TouchableOpacity>
//       </View>

//       {showMessageInput && (
//         <KeyboardAvoidingView behavior="padding" style={styles.messageInputContainer}>
//           <TextInput
//             style={styles.messageInput}
//             placeholder="Enter amount"
//             keyboardType="numeric"
//             value={message}
//             onChangeText={(text) => setMessage(text)}
//           />
//           <TouchableOpacity style={styles.sendButton} onPress={handlePayment}>
//             <Text style={styles.sendButtonText}>Send</Text>
//           </TouchableOpacity>
//         </KeyboardAvoidingView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 40 },
//   header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   backButton: { marginRight: 10 },
//   smallProfileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   headerName: { fontSize: 18, fontWeight: "bold" },
//   phoneNumber: { fontSize: 14, color: "#555" },
//   paymentCard: { borderRadius: 10, padding: 15, marginBottom: 10, elevation: 3, width: "48%" },
//   paymentToThem: { backgroundColor: "#D4F7DC" },
//   rightAlign: { alignSelf: "flex-end" },
//   amountText: { fontSize: 18, fontWeight: "bold" },
//   paymentType: { fontSize: 14, marginTop: 5 },
//   dateText: { fontSize: 12, color: "#777", marginTop: 5 },
//   noTransactionText: { textAlign: "center", color: "#777", marginTop: 20 },
//   actions: { flexDirection: "row", justifyContent: "space-evenly", paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#ddd" },
//   actionButton: { backgroundColor: "#007BFF", paddingVertical: 10, paddingHorizontal: 25, borderRadius: 20 },
//   actionText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
//   messageInputContainer: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", backgroundColor: "#fff", padding: 10, borderTopWidth: 1, borderTopColor: "#ddd" },
//   messageInput: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginRight: 10, fontSize: 16 },
//   sendButton: { backgroundColor: "#007BFF", paddingHorizontal: 20, justifyContent: "center", alignItems: "center", borderRadius: 10 },
//   sendButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });

// export default PaymentScreen;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Alert,
//   FlatList,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import { jwtDecode } from "jwt-decode";

// const BASE_URL = "http://192.168.0.143:5000";

// const PaymentScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { token, receiverId, receiverName, receiverPhoneNumber, receiverimage, userBalance, setUserBalance } = route.params;
//   useEffect(() => {
//     try {
//       const decodedToken = jwtDecode(token);
//       const senderId = decodedToken.userId; // Adjust based on your token structure
//       console.log("Token:", token);
//       console.log("Sender ID:", senderId);
//       console.log("Receiver ID:", receiverId);
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   }, []);

//   const [transactions, setTransactions] = useState([]);
//   const [showMessageInput, setShowMessageInput] = useState(false);
//   const [message, setMessage] = useState("");

//   const handlePayment = async () => {
//     const amountToSend = parseFloat(message);

//     if (isNaN(amountToSend) || amountToSend <= 0) {
//       Alert.alert("Invalid Amount", "Enter a valid payment amount.");
//       return;
//     }

//     if (amountToSend > userBalance) {
//       Alert.alert("Insufficient Balance", "You don't have enough balance.");
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       const senderId = decodedToken.id; // Adjust based on token structure

//       const response = await fetch(`${BASE_URL}/api/payments/send`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${token}`,
//         },
//         body: JSON.stringify({
//           senderId,
//           receiverId,
//           amount: amountToSend,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Payment failed");
//       }

//       const newBalance = userBalance - amountToSend;
//       setUserBalance(newBalance);

//       const newTransaction = {
//         id: transactions.length + 1,
//         amount: `₹ ${amountToSend}`,
//         paymentType: `Payment to ${receiverName}`,
//         date: new Date().toLocaleDateString(),
//       };
//       setTransactions([...transactions, newTransaction]);

//       Alert.alert("Payment Successful", `You sent ₹${amountToSend} to ${receiverName}`);
//       setMessage("");
//       setShowMessageInput(false);
//     } catch (error) {
//       console.error("Payment error:", error);
//       Alert.alert("Payment Failed", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Image source={{ uri: `${BASE_URL}${receiverimage}` }} style={styles.smallProfileImage} />
//         <View>
//           <Text style={styles.headerName}>{receiverName || "Unknown User"}</Text>
//           <Text style={styles.phoneNumber}>{receiverPhoneNumber || "No Phone Number"}</Text>
//         </View>
//       </View>

//       <FlatList
//         data={transactions}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={[styles.paymentCard, styles.paymentToThem, styles.rightAlign]}>
//             <Text style={styles.amountText}>{item.amount}</Text>
//             <Text style={styles.paymentType}>{item.paymentType}</Text>
//             <Text style={styles.dateText}>{item.date}</Text>
//           </View>
//         )}
//         ListEmptyComponent={<Text style={styles.noTransactionText}>No Transactions Yet</Text>}
//       />

//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionButton} onPress={() => setShowMessageInput(true)}>
//           <Text style={styles.actionText}>Pay</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionText}>Request</Text>
//         </TouchableOpacity>
//       </View>

//       {showMessageInput && (
//         <KeyboardAvoidingView behavior="padding" style={styles.messageInputContainer}>
//           <TextInput
//             style={styles.messageInput}
//             placeholder="Enter amount"
//             keyboardType="numeric"
//             value={message}
//             onChangeText={(text) => setMessage(text)}
//           />
//           <TouchableOpacity style={styles.sendButton} onPress={handlePayment}>
//             <Text style={styles.sendButtonText}>Send</Text>
//           </TouchableOpacity>
//         </KeyboardAvoidingView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 40 },
//   header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   backButton: { marginRight: 10 },
//   smallProfileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   headerName: { fontSize: 18, fontWeight: "bold" },
//   phoneNumber: { fontSize: 14, color: "#555" },
//   paymentCard: { borderRadius: 10, padding: 15, marginBottom: 10, elevation: 3, width: "48%" },
//   paymentToThem: { backgroundColor: "#D4F7DC" },
//   rightAlign: { alignSelf: "flex-end" },
//   amountText: { fontSize: 18, fontWeight: "bold" },
//   paymentType: { fontSize: 14, marginTop: 5 },
//   dateText: { fontSize: 12, color: "#777", marginTop: 5 },
//   noTransactionText: { textAlign: "center", color: "#777", marginTop: 20 },
//   actions: { flexDirection: "row", justifyContent: "space-evenly", paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#ddd" },
//   actionButton: { backgroundColor: "#007BFF", paddingVertical: 10, paddingHorizontal: 25, borderRadius: 20 },
//   actionText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
//   messageInputContainer: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", backgroundColor: "#fff", padding: 10, borderTopWidth: 1, borderTopColor: "#ddd" },
//   messageInput: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginRight: 10, fontSize: 16 },
//   sendButton: { backgroundColor: "#007BFF", paddingHorizontal: 20, justifyContent: "center", alignItems: "center", borderRadius: 10 },
//   sendButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });

// export default PaymentScreen;

import * as Location from "expo-location";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const BASE_URL = "http://192.168.0.143:5000";

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const {
    token,
    receiverId,
    receiverName,
    receiverPhoneNumber,
    receiverimage,
    userBalance,
    setUserBalance,
  } = route.params;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [message, setMessage] = useState("");
  const [lastPaymentAmount, setLastPaymentAmount] = useState(null);

  useEffect(() => {
    if (showSuccessModal) {
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.goBack();
      }, 3000); // Closes in 3 seconds
    }
  }, [showSuccessModal]);

  // ✅ Fetch logged-in user details from backend
  useEffect(() => {
    console.log("DEBUG: Route Params in PaymentScreen:", route.params);
    console.log("DEBUG: Extracted Receiver ID:", route.params?.receiverId);

    if (!route.params?.receiverId) {
      console.error(
        "ERROR: Receiver ID is missing! Check navigation parameters."
      );
    }
    const fetchUserDetails = async () => {
      try {
        console.log("Retrieved Token:", token);
        const response = await fetch(`${BASE_URL}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("User Details Response:", data); // ✅ Debugging

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user details");
        }

        setUserId(data._id); // ✅ Ensure userId is properly set
      } catch (error) {
        console.error("Error fetching user details:", error);
        Alert.alert("Error", "Failed to retrieve user details.");
      }
    };

    fetchUserDetails();
  }, []);

  // ✅ Handle Payment Function
  const handlePayment = async () => {
    const amountToSend = parseFloat(message);

    if (isNaN(amountToSend) || amountToSend <= 0) {
      Alert.alert("Invalid Amount", "Enter a valid payment amount.");
      return;
    }

    if (amountToSend > userBalance) {
      Alert.alert("Insufficient Balance", "You don't have enough balance.");
      return;
    }

    // Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location access is required to proceed."
      );
      return;
    }

    // Fetch current location
    const location = await Location.getCurrentPositionAsync({});
    const senderLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    console.log("Sender Location:", senderLocation);

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to Proceed with Payment",
      fallbackLabel: "Use Passcode",
    });

    if (!biometricAuth.success) {
      Alert.alert("Authentication Failed", "Biometric verification failed.");
      return;
    }

    // ✅ Debugging User ID and Receiver ID
    console.log("DEBUG: Sender ID (userId):", userId);
    console.log("DEBUG: Receiver ID (receiverId):", receiverId);

    if (!userId || !receiverId) {
      Alert.alert(
        "Missing Required Fields",
        "Sender or receiver information is missing."
      );
      console.error("Payment error: Missing userId or receiverId");
      return;
    }

    try {
      console.log("Initiating payment with:", {
        senderId: userId,
        receiverId: receiverId,
        amount: amountToSend,
        location: senderLocation, // Send location with the transaction
      });

      const response = await fetch(`${BASE_URL}/api/payments/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: userId,
          receiverId: receiverId,
          amount: amountToSend,
        }),
      });

      const data = await response.json();
      console.log("Payment Response:", data); // ✅ Debugging

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      const newBalance = userBalance - amountToSend;
      setLastPaymentAmount(amountToSend); // Store the last payment amount
      setShowSuccessModal(true);
      setMessage(""); // Reset input
      setShowMessageInput(false);
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Payment Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={{ uri: `${BASE_URL}${receiverimage}` }}
          style={styles.smallProfileImage}
        />
        <View>
          <Text style={styles.headerName}>
            {receiverName || "Unknown User"}
          </Text>
          <Text style={styles.phoneNumber}>
            {receiverPhoneNumber || "No Phone Number"}
          </Text>
        </View>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.paymentCard,
              styles.paymentToThem,
              styles.rightAlign,
            ]}
          >
            <Text style={styles.amountText}>{item.amount}</Text>
            <Text style={styles.paymentType}>{item.paymentType}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noTransactionText}>No Transactions Yet</Text>
        }
      />

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowMessageInput(true)}
        >
          <Text style={styles.actionText}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Request</Text>
        </TouchableOpacity>
      </View>

      {showMessageInput && (
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.messageInputContainer}
        >
          <TextInput
            style={styles.messageInput}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handlePayment}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade" // Smooth fade-in effect
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Image
              source={require("../assets/check.png")} // ✅ Ensure correct path
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>Payment Successful</Text>
            <Text style={styles.amountText}>₹{lastPaymentAmount}</Text>
            <Text style={styles.modalMessage}>Sent to {receiverName}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 40 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { marginRight: 10 },
  smallProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerName: { fontSize: 18, fontWeight: "bold" },
  phoneNumber: { fontSize: 14, color: "#555" },
  paymentCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    width: "48%",
  },
  paymentToThem: { backgroundColor: "#D4F7DC" },
  rightAlign: { alignSelf: "flex-end" },
  amountText: { fontSize: 18, fontWeight: "bold" },
  paymentType: { fontSize: 14, marginTop: 5 },
  dateText: { fontSize: 12, color: "#777", marginTop: 5 },
  noTransactionText: { textAlign: "center", color: "#777", marginTop: 20 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  actionButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  actionText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  messageInputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50", // ✅ Green success color
    textAlign: "center",
  },
  amountText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 5,
  },
  modalMessage: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  sendButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default PaymentScreen;
