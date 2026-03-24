import { useAuth } from "@/src/store/AuthContext"
import React from "react"
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native"

export default function HomeScreen() {
   const { user } = useAuth()

   return (
      <ScrollView style={styles.root} contentContainerStyle={styles.container}>
         {/* Welcome banner */}
         <View style={styles.banner}>
            <Text style={styles.bannerLabel}>Bem-vindo de volta 👋</Text>
            <Text style={styles.bannerName}>{user?.full_name ?? user?.email}</Text>
         </View>

         {/* Info card */}
         <View style={styles.card}>
            <Text style={styles.cardTitle}>Dados da conta</Text>

            <InfoRow label="E-mail" value={user?.email ?? "—"} />
            <InfoRow label="Nome" value={user?.full_name ?? "—"} />
            <InfoRow label="ID" value={user?.id ?? "—"} mono />
            <InfoRow label="Ativo" value={user?.is_active ? "Sim" : "Não"} />
            <InfoRow label="Verificado" value={user?.is_verified ? "Sim" : "Não"} />
            <InfoRow
               label="Criado em"
               value={
                  user?.created_at ? new Date(user.created_at).toLocaleDateString("pt-BR") : "—"
               }
            />
         </View>
      </ScrollView>
   )
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
   return (
      <View style={styles.row}>
         <Text style={styles.rowLabel}>{label}</Text>
         <Text
            style={[styles.rowValue, mono && styles.mono]}
            numberOfLines={1}
            ellipsizeMode="middle"
         >
            {value}
         </Text>
      </View>
   )
}

const styles = StyleSheet.create({
   root: { flex: 1, backgroundColor: "#F9FAFB" },
   container: { padding: 20, gap: 16 },

   banner: {
      backgroundColor: "#4F46E5",
      borderRadius: 20,
      padding: 20,
      gap: 4,
   },
   bannerLabel: { color: "#C7D2FE", fontSize: 13, fontWeight: "500" },
   bannerName: { color: "#fff", fontSize: 22, fontWeight: "700" },

   card: {
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 20,
      gap: 0,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
   },
   cardTitle: {
      fontSize: 11,
      fontWeight: "700",
      color: "#9CA3AF",
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 12,
   },

   row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 11,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "#F3F4F6",
      gap: 12,
   },
   rowLabel: { fontSize: 14, color: "#6B7280", flexShrink: 0 },
   rowValue: { fontSize: 14, color: "#111827", flexShrink: 1, textAlign: "right" },
   mono: { fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", fontSize: 12 },
})
