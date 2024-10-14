import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";

const Profile = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const auth = getAuth();
		const currentUser = auth.currentUser;

		if (currentUser) {
			setUser({
				email: currentUser.email,
				photoURL: currentUser.photoURL,
				displayName: currentUser.displayName,
			});
		}
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.profileCard}>
				{user ? (
					<>
						<Image source={{ uri: user.photoURL }} style={styles.profileImage} />
						<Text style={styles.username}>{user.displayName}</Text>
						<Text style={styles.email}>{user.email}</Text>
						<TouchableOpacity style={styles.editButton}>
							<Text style={styles.buttonText}>Edit Profile</Text>
						</TouchableOpacity>
					</>
				) : (
					<Text style={styles.loadingText}>Loading user data...</Text>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f8f9fa", // Light background for modern look
	},
	profileCard: {
		backgroundColor: "#ffffff",
	 borderRadius: 12,
	 padding: 24,
	 width: "90%",
	 shadowColor: "#000",
	 shadowOffset: {
		 width: 0,
		 height: 2,
	 },
	 shadowOpacity: 0.3,
	 shadowRadius: 4,
	 elevation: 5, // For Android shadow
	 alignItems: "center",
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 16,
		borderWidth: 2,
		borderColor: "#007BFF", // Blue border for profile image
	},
	username: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 4,
	},
	email: {
		fontSize: 16,
		color: "#555",
		marginBottom: 16,
	},
	editButton: {
		backgroundColor: "#007BFF", // Blue background for the button
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	buttonText: {
		color: "#ffffff",
		fontWeight: "600",
	},
	loadingText: {
		fontSize: 16,
		color: "#555",
	},
});

export default Profile;
