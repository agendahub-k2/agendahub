import React from 'react';
import { View, Image, Text, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIcon}>
                    <MaterialIcons name="menu" size={24} color="#121212" /> 
                </TouchableOpacity>

                <Image 
                    source={{ uri: "https://github.com/Devwillmarinho.png" }} 
                    style={styles.img}
                />

                <View style={styles.user}>
                    <Text style={styles.hi}>Olá,</Text>
                    <Text style={styles.username}>Willian Marinho</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 32,
        backgroundColor: "#FFFFFF",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 12,
    },
    user: {
        flex: 1,
        justifyContent: "center",
    },
    hi: {
        fontSize: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: "700",
    },
    menuIcon: {
        marginRight: 10, 
    },
});
