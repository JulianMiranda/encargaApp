import React, {useContext} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAws from 'react-native-vector-icons/FontAwesome5';
import {ThemeContext} from '../context/theme/ThemeContext';
import {IS_IPHONE_X} from '../utils/isIphone';
import {TabBarAdvancedButton} from '../components/TabBarAdvancedButton';
import {SettingsStack} from './SettingsStack';
import {ShopStack} from './ShopStack';
import {HomeStack} from './HomeStack';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={props => (
        <View style={styles.navigatorContainer}>
          <BottomTabBar {...props} />
          {IS_IPHONE_X && (
            <View
              style={[
                styles.xFillLine,
                {
                  backgroundColor: 'rgba(255,255,255,0.92)',
                },
              ]}
            />
          )}
        </View>
      )}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        inactiveTintColor: 'gray',
        style: styles.navigator,
        labelStyle: {
          marginBottom: Platform.OS === 'ios' ? -5 : 3,
          fontSize: 11,
        },
        tabStyle: {
          backgroundColor: 'rgba(255,255,255,0.92)',
        },
        activeTintColor: colors.card,
      }}>
      <Tab.Screen
        name="Home"
        
        component={HomeStack}
        options={{
          title: 'Tienda',
         
          tabBarIcon: ({color}) => (
            <FontAws name="store" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="shop"
        /* options={{title: 'Mi Compra'}} */
        options={{
          tabBarButton: props => (
            <TabBarAdvancedButton bgColor={'#F6F7EB'} {...props} />
          ),
        }}
        component={ShopStack}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: 'Perfil',
          tabBarIcon: ({color}) => <Icon name="bars" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
  },
});
