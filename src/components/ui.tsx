import React from "react"
import {
   ActivityIndicator,
   StyleSheet,
   Text,
   TextInput,
   TextInputProps,
   TouchableOpacity,
   TouchableOpacityProps,
   View,
} from "react-native"

// ─── Button ──────────────────────────────────────────────────────────────────

interface ButtonProps extends TouchableOpacityProps {
   title: string
   loading?: boolean
   variant?: "primary" | "ghost"
}

export function Button({
   title,
   loading,
   variant = "primary",
   style,
   disabled,
   ...props
}: ButtonProps) {
   const isPrimary = variant === "primary"

   return (
      <TouchableOpacity
         style={[
            styles.button,
            isPrimary ? styles.buttonPrimary : styles.buttonGhost,
            (disabled || loading) && styles.buttonDisabled,
            style,
         ]}
         disabled={disabled || loading}
         activeOpacity={0.8}
         {...props}
      >
         {loading ? (
            <ActivityIndicator color={isPrimary ? "#fff" : "#4F46E5"} size="small" />
         ) : (
            <Text style={[styles.buttonText, !isPrimary && styles.buttonTextGhost]}>{title}</Text>
         )}
      </TouchableOpacity>
   )
}

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends TextInputProps {
   label?: string
   error?: string
}

export function Input({ label, error, style, ...props }: InputProps) {
   return (
      <View style={styles.inputWrapper}>
         {label && <Text style={styles.label}>{label}</Text>}
         <TextInput
            style={[styles.input, error && styles.inputError, style]}
            placeholderTextColor="#9CA3AF"
            {...props}
         />
         {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
   )
}

// ─── ErrorBanner ──────────────────────────────────────────────────────────────

export function ErrorBanner({ message }: { message: string }) {
   return (
      <View style={styles.errorBanner}>
         <Text style={styles.errorBannerText}>{message}</Text>
      </View>
   )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
   // Button
   button: {
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
   },
   buttonPrimary: {
      backgroundColor: "#4F46E5",
   },
   buttonGhost: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: "#4F46E5",
   },
   buttonDisabled: {
      opacity: 0.55,
   },
   buttonText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "600",
   },
   buttonTextGhost: {
      color: "#4F46E5",
   },

   // Input
   inputWrapper: {
      gap: 6,
   },
   label: {
      fontSize: 14,
      fontWeight: "500",
      color: "#374151",
   },
   input: {
      height: 48,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#D1D5DB",
      backgroundColor: "#fff",
      paddingHorizontal: 14,
      fontSize: 15,
      color: "#111827",
   },
   inputError: {
      borderColor: "#EF4444",
   },
   errorText: {
      fontSize: 12,
      color: "#EF4444",
   },

   // Error Banner
   errorBanner: {
      backgroundColor: "#FEF2F2",
      borderWidth: 1,
      borderColor: "#FCA5A5",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
   },
   errorBannerText: {
      color: "#B91C1C",
      fontSize: 13,
   },
})
