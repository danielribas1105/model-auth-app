import { AuthProvider, useAuth } from "@/src/store/auth-context"
import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

function NavigationGuard() {
   const { isAuthenticated, isLoading } = useAuth()
   const segments = useSegments()
   const router = useRouter()

   useEffect(() => {
      if (isLoading) return

      const inAuthGroup = segments[0] === "(auth)"
      const inAppGroup = segments[0] === "(app)"

      if (!isAuthenticated && inAppGroup) {
         router.replace("/(auth)/login")
      } else if (isAuthenticated && inAuthGroup) {
         router.replace("/(app)/home")
      }
   }, [isAuthenticated, isLoading, segments, router])

   return <Slot />
}

export default function RootLayout() {
   return (
      <SafeAreaProvider>
         <AuthProvider>
            <NavigationGuard />
         </AuthProvider>
      </SafeAreaProvider>
   )
}
