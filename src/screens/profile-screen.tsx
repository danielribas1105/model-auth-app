import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useAuth } from "@/src/store/AuthContext"
import { Button } from "@/src/components/ui"

export default function ProfileScreen() {
   const { user, logout } = useAuth()
   const [loading, setLoading] = useState(false)

   async function handleLogout() {
      setLoading(true)
      await logout()
      setLoading(false)
   }

   const initials = (user?.full_name ?? user?.email ?? "?")
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("")

   return (
      <ScrollView style={styles.root} contentContainerStyle={styles.container}>
         {/* Avatar */}
         <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
               <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.name}>{user?.full_name ?? "Usuário"}</Text>
            <Text style={styles.email}>{user?.email}</Text>
         </View>

         {/* Status badges */}
         <View style={styles.badges}>
            <Badge label="Conta ativa" active={user?.is_active ?? false} />
            <Badge label="Verificado" active={user?.is_verified ?? false} />
         </View>

         {/* Logout */}
         <View style={styles.section}>
            <Button
               title="Sair da conta"
               variant="ghost"
               loading={loading}
               onPress={handleLogout}
            />
         </View>
      </ScrollView>
   )
}

function Badge({ label, active }: { label: string; active: boolean }) {
   return (
      <View style={[styles.badge, active ? styles.badgeActive : styles.badgeInactive]}>
         <Text
            style={[styles.badgeText, active ? styles.badgeTextActive : styles.badgeTextInactive]}
         >
            {active ? "✓ " : "✗ "}
            {label}
         </Text>
      </View>
   )
}

const styles = StyleSheet.create({
   root: { flex: 1, backgroundColor: "#F9FAFB" },
   container: { padding: 24, gap: 24, alignItems: "center" },

   avatarWrapper: { alignItems: "center", gap: 8 },
   avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#4F46E5",
      alignItems: "center",
      justifyContent: "center",
   },
   avatarText: { color: "#fff", fontSize: 28, fontWeight: "700" },
   name: { fontSize: 20, fontWeight: "700", color: "#111827" },
   email: { fontSize: 14, color: "#6B7280" },

   badges: { flexDirection: "row", gap: 10 },
   badge: {
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderWidth: 1,
   },
   badgeActive: { backgroundColor: "#ECFDF5", borderColor: "#6EE7B7" },
   badgeInactive: { backgroundColor: "#FEF2F2", borderColor: "#FCA5A5" },
   badgeText: { fontSize: 13, fontWeight: "500" },
   badgeTextActive: { color: "#065F46" },
   badgeTextInactive: { color: "#991B1B" },

   section: { width: "100%" },
})
