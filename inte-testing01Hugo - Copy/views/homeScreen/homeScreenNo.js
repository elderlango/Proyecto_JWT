import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './homeScreenNo.styles';

const HomeScreenNo = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <View style={styles.container}>
    {/* <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.backgroundImage}> */}
    <ImageBackground source={require('../../assets/images/fondoEdificios.jpg')} style={styles.backgroundImage}>
    <View style={styles.overlay}>
    
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.logo}>AirGuard</Text>
        <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)}>
        {/* <Icon name="menu" size={24} color="#fff"/> */}
        </TouchableOpacity>
      </View>

        {menuVisible && (
        <View style={styles.menu}>
          <View style={styles.menuHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setMenuVisible(false)}>
              <Icon name="close" size={30} color="#000"/>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.menuContent}>
          <View style={styles.menuContent}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.menuItem}>
            <Icon name="home" size={24} color="#000"/>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.menuItem}>
            <Icon name="home" size={24} color="#000"/>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.menuItem}>
            <Icon name="home" size={24} color="#000"/>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Nosotros')} style={styles.tryFreeButton}>
            <Icon name="home" size={24} color="#000"/>
            <Text style={styles.tryFreeText}>Nosotros</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      )}
      
      
      {/* Main Content Section */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Easy Way to Manage Your Accounting Software</Text>
          <Text style={styles.heroSubtitle}>Accounting is built into all small businesses' operations...</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cards')} style={styles.demoButton}>
              <Text style={styles.buttonText} >Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

              {/* Brands Section */}
        <View style={styles.brandsSection}>
          <Text style={styles.titleText}>Equipo</Text>
          <View style={styles.profileItem}>
            <Image source={require('../../assets/images/yo.jpg' )} style={styles.profileImage} />
            <Text style={styles.profileText}>Description 1</Text>
          </View>
          <View style={styles.profileItem}>
            <Image source={{ uri: 'https://saaslandingpage.com/wp-content/uploads/2022/03/Appy-830x4223.png' }} style={styles.profileImage} />
            <Text style={styles.profileText}>Description 2</Text>
          </View>
          <View style={styles.profileItem}>
            <Image source={require('../../assets/images/yo.jpg' )} style={styles.profileImage} />
            <Text style={styles.profileText}>Description 3</Text>
          </View>
          <View style={styles.profileItem}>
            <Image source={require('../../assets/images/yo.jpg' )} style={styles.profileImage} />
            <Text style={styles.profileText}>Description 4</Text>
          </View>
          <View style={styles.profileItem}>
            <Image source={require('../../assets/images/yo.jpg' )} style={styles.profileImage} />
            <Text style={styles.profileText}>Description 4</Text>
          </View>
          <View style={styles.profileItem}>
            <Image source={require('../../assets/images/yo.jpg' )} style={styles.profileImage} />
            <Text style={styles.profileText}>Description 4</Text>
          </View>
          
          {/* Add more profile items as needed */}
        </View>




        {/* Feature Cards Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.featureCardsContainer}>
          {/* Feature Card Example */}
          <View style={styles.featureCard}>
            <Icon name="analytics" size={24} color={styles.iconColor} />
            <Text style={styles.featureCardTitle}>Analytics</Text>
            <Text style={styles.featureCardText}>Track and analyze your data...</Text>
          </View>
          <View style={styles.featureCard}>
            <Icon name="analytics" size={24} color={styles.iconColor} />
            <Text style={styles.featureCardTitle}>Analytics</Text>
            <Text style={styles.featureCardText}>Track and analyze your data...</Text>
          </View>
          <View style={styles.featureCard}>
            <Icon name="analytics" size={24} color={styles.iconColor} />
            <Text style={styles.featureCardTitle}>Analytics</Text>
            <Text style={styles.featureCardText}>Track and analyze your data...</Text>
          </View>
          <View style={styles.featureCard}>
            <Icon name="analytics" size={24} color={styles.iconColor} />
            <Text style={styles.featureCardTitle}>Analytics</Text>
            <Text style={styles.featureCardText}>Track and analyze your data...</Text>
          </View>
          {/* Add more feature cards */}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Qualytics. All rights reserved.</Text>
          {/* Aquí se pueden añadir más elementos al footer si es necesario */}
        </View>
      
      </ScrollView>
    </View>
    </ImageBackground>
    </View>
    
  );



};

export default HomeScreenNo;
