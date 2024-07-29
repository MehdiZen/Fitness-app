import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'nutrition' : 'nutrition-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="steps"
        options={{
          title: 'Steps',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'walk' : 'walk-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sport"
        options={{
          title: 'Exercices',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'fitness' : 'fitness-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'barcode' : 'barcode-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
