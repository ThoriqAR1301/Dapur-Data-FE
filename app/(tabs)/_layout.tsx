import { Tabs } from 'expo-router';
import { Colors } from '../../constants/theme';
import { Text } from 'react-native';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.6 }}>{emoji}</Text>;
}

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{

        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 3,
          borderTopColor: Colors.black,
          backgroundColor: Colors.white,
          height: 60,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveBackgroundColor: Colors.orange,
        tabBarLabelStyle: {
          fontFamily: 'SpaceMono',
          fontSize: 8,
          letterSpacing: 0.5,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'DASHBOARD',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⊞" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'PORTFOLIO',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⊡" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="sertifikat"
        options={{
          title: 'SERTIFIKAT',
          tabBarIcon: ({ focused }) => <TabIcon emoji="✓" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
