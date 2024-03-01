import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './profileScreen.styles';
const ProfileScreen = ({ navigation }) => {

        const [userData, setUserData] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchProfileData = async () => {
                const userToken = await AsyncStorage.getItem('userToken');
                const userId = await AsyncStorage.getItem('userId');
                if (!userToken || !userId) {
                  Alert.alert("Error", "No se encontró el token de autenticación o el ID del usuario.");
                  setLoading(false);
                  return;
              }
        
              const endpoint = `http://${global.ipDireccion}:3000/api/admins/${userId}`; // Construye el endpoint con el userId

              try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userToken}`, // Asumiendo un esquema de autenticación Bearer
                    },
                });

                if (response.ok) {
                    const json = await response.json();
                    setUserData(json);
                } else {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage || "Error al obtener datos del perfil.");
                }
            } catch (error) {
                Alert.alert("Error", error.message || "Ocurrió un error inesperado.");
            } finally {
                setLoading(false);
            }
        };

            fetchProfileData();
        }, []);

        if (loading) {
            return <ActivityIndicator />; // Muestra un indicador de carga mientras se obtienen los datos
        }

        if (!userData) {
            return <Text>No se pudo obtener los datos del usuario.</Text>; // Manejo de estado sin datos
        }

    /* const userData = {
        name: 'EMMA',
        designsPosted: 104,
        boardsCreated: 12,
        balance: 2084,
        orders: 14,
        phoneNumber: '(581) 305-6789',
        email: 'emma.terrain@gmail.com',
      }; */
    
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.header}>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              <MaterialIcons name="more-horiz" size={24} color="black" />
            </View>
            <View style={styles.profileContainer}>
              <Image source={require('../../assets/images/yo.jpg' )} style={styles.profilePic} />
              <Text style={styles.profileName}>{userData.name}</Text>
              <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('Graphic')}>
                <FontAwesome name="plus" size={14} color="white" />
                <Text style={styles.followButtonText}>Añadir Dispositivo</Text>
              </TouchableOpacity>
              <Text style={styles.contactInfo}>{userData.age}</Text>
              <Text style={styles.contactInfo}>{userData.email}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{userData.role}</Text>
                <Text style={styles.statLabel}>Rol</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{userData.email}</Text>
                <Text style={styles.statLabel}>Board created</Text>
              </View>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceAmount}>Monitores #: {userData.sentMonitoringRequests.length}</Text>
              <Text style={styles.balanceOrders}>Pendientes: {userData.sentMonitoringRequests.filter(request => request.status === 'pending').length}</Text>
            </View>
            <View style={styles.menuContainer}>
              <MenuItem
                icon="heart"
                text="Graficas"
                onPress={() => navigation.navigate('Graphic')} // Asegúrate de que 'FavoritesScreen' sea una ruta válida en tu configurador de navegación
              />
              <MenuItem
                icon="credit-card"
                text="Ajustar"
                onPress={() => navigation.navigate('Dashboard')}
              />
              <MenuItem
                icon="gift"
                text="Cards"
                onPress={() => navigation.navigate('Cards')}
              />
              <MenuItem
                icon="edit"
                text="Editar Perfil"
                onPress={() => navigation.navigate('Api')}
              />
              <MenuItem
                icon="star"
                text="Gestionar monitores"
                onPress={() => navigation.navigate('SettingsScreen')}
              />
              <MenuItem
                icon="cog"
                text="Settings"
                onPress={() => navigation.navigate('SettingsScreen')}
              />
            </View>
            <TouchableOpacity
              style={styles.logoutContainer}
              onPress={async () => {
                await AsyncStorage.removeItem('userToken');
                // Otras acciones de limpieza de estado aquí si es necesario
                navigation.navigate('LoginScreen'); // Asegúrate de que 'LoginScreen' sea una ruta válida
              }}
            >
              <MaterialIcons name="logout" size={24} color="red" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

          </ScrollView>
        </SafeAreaView>
      );
    };
    
    const MenuItem = ({ icon, text, onPress }) => (
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <FontAwesome name={icon} size={24} color="black" />
        <Text style={styles.menuText}>{text}</Text>
      </TouchableOpacity>
    );    

export default ProfileScreen;