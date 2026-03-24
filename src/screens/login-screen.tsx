import React, { useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useAuth } from "@/src/store/AuthContext"
import { Button, ErrorBanner, Input } from "@/src/components/ui"

export default function LoginScreen() {
   const { login } = useAuth()

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)

   async function handleLogin() {
      if (!email || !password) {
         setError("Preencha e-mail e senha.")
         return
      }
      setError(null)
      setLoading(true)
      try {
         await login(email.trim().toLowerCase(), password)
      } catch (err: unknown) {
         setError(err instanceof Error ? err.message : "Erro ao entrar.")
      } finally {
         setLoading(false)
      }
   }

   return (
      <KeyboardAvoidingView
         style={styles.flex}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
         <StatusBar style="dark" />
         <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            {/* Logo / icon */}
            <View style={styles.iconWrapper}>
               <Text style={styles.iconText}>🔐</Text>
            </View>

            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.subtitle}>Entre com sua conta para continuar</Text>

            {/* Card */}
            <View style={styles.card}>
               {error && <ErrorBanner message={error} />}

               <Input
                  label="E-mail"
                  placeholder="voce@exemplo.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
               />

               <Input
                  label="Senha"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
               />

               <Button title="Entrar" loading={loading} onPress={handleLogin} />
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}

const styles = StyleSheet.create({
   flex: { flex: 1, backgroundColor: "#F9FAFB" },
   container: {
      flexGrow: 1,
      justifyContent: "center",
      paddingHorizontal: 24,
      paddingVertical: 40,
      gap: 8,
   },
   iconWrapper: {
      width: 72,
      height: 72,
      borderRadius: 20,
      backgroundColor: "#EEF2FF",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
      alignSelf: "center",
   },
   iconText: { fontSize: 36 },
   title: {
      fontSize: 28,
      fontWeight: "700",
      color: "#111827",
      textAlign: "center",
   },
   subtitle: {
      fontSize: 14,
      color: "#6B7280",
      textAlign: "center",
      marginBottom: 16,
   },
   card: {
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 24,
      gap: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
   },
})
