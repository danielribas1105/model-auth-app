import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

interface TabConfig {
   name: string
   title: string
   icon: IoniconName
   iconFocused: IoniconName
}

const TABS: TabConfig[] = [
   {
      name: "home",
      title: "Início",
      icon: "home-outline",
      iconFocused: "home",
   },
   {
      name: "profile",
      title: "Perfil",
      icon: "person-outline",
      iconFocused: "person",
   },
]

export default function AppLayout() {
   const insets = useSafeAreaInsets()

   return (
      <Tabs
         screenOptions={{
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { fontWeight: "600", color: "#111827" },
            headerShadowVisible: false,
            tabBarActiveTintColor: "#4F46E5",
            tabBarInactiveTintColor: "#9CA3AF",
            tabBarStyle: {
               backgroundColor: "#fff",
               borderTopColor: "#E5E7EB",
               borderTopWidth: 1,
               height: 60 + insets.bottom,
               paddingBottom: 8,
               paddingTop: 6,
            },
            tabBarLabelStyle: {
               fontSize: 11,
               fontWeight: "500",
            },
         }}
      >
         {TABS.map((tab) => (
            <Tabs.Screen
               key={tab.name}
               name={tab.name}
               options={{
                  title: tab.title,
                  tabBarIcon: ({ focused, color, size }) => (
                     <Ionicons
                        name={focused ? tab.iconFocused : tab.icon}
                        size={size}
                        color={color}
                     />
                  ),
               }}
            />
         ))}
      </Tabs>
   )
}
