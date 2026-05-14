import { useTheme } from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const _layout = () => {
  const { theme } = useTheme();

  const headerBg = theme === "dark" ? "#1E293B" : "#EFF6FF";
  const headerText = theme === "dark" ? "#F1F5F9" : "#1E293B";
  const tabActive = theme === "dark" ? "#93c5fd" : "#2563EB";
  const tabInactive = theme === "dark" ? "#94A3B8" : "#64748B";
  const tabBg = theme === "dark" ? "#0F172A" : "#FFFFFF";

  return (
    <Tabs
      screenOptions={{
        // ---------- HEADER ----------
        headerStyle: {
          height: Platform.OS === "android" ? 88 : 96,
          backgroundColor: headerBg,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 20,
          color: headerText,
        },
        headerShadowVisible: false,

        // ---------- TAB BAR ----------
        tabBarStyle: {
          height: Platform.OS === "android" ? 64 : 78,
          paddingBottom: Platform.OS === "android" ? 8 : 16,
          backgroundColor: tabBg,
        },
        tabBarItemStyle: {
          justifyContent: "center",
        },
        tabBarIconStyle: {
          marginTop: 4
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,
          fontWeight: "500",
        },

        // ---------- COLORS ----------
        tabBarActiveTintColor: tabActive,
        tabBarInactiveTintColor: tabInactive,

        // ---------- BEHAVIOR ----------
        tabBarHideOnKeyboard: true,
      }}>
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />

      {/* SETTINGS */}
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
