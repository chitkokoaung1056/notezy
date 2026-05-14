import { useNote } from "@/hooks/useNote";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { Modal, Platform, Pressable, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Setting = () => {
  const { toggleTheme, theme } = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);

  const { deleteAllNote } = useNote();
  const handleDeleteAll = () => {
    deleteAllNote();
    setModalOpen(false);
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-4 bg-blue-50 dark:bg-slate-800">
        <View
          className="flex-row justify-between items-center px-4 bg-white  dark:bg-slate-700  rounded-xl shadow-lg mb-4"
          style={Platform.OS === "android" ? { elevation: 4 } : {}}>
          <Text className="font-semibold dark:text-slate-300 text-slate-600">Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            onValueChange={toggleTheme}
            value={theme === "light" ? false : true}
          />
        </View>

        <Pressable
          onPress={() => setModalOpen(true)}
          className="px-4 bg-white rounded-xl dark:bg-slate-700 shadow-lg py-4 active:opacity-70"
          style={Platform.OS === "android" ? { elevation: 4 } : {}}>
          <Text className="font-semibold text-slate-600 dark:text-slate-300">Delete All Notes</Text>
        </Pressable>
      </SafeAreaView>

      <Modal
        visible={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        animationType="fade"
        transparent>
        <Pressable
          className="flex-1 bg-black/40 items-center justify-center"
          onPress={() => setModalOpen(false)}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-5 w-72">
            <Text className="text-center font-semibold text-lg">
              Delete All note?
            </Text>

            <View className="flex flex-row items-center justify-between mt-5">
              <Pressable
                className="bg-slate-500 rounded-md px-7 py-3 active:opacity-70"
                onPress={() => setModalOpen(false)}>
                <Text className="text-white font-semibold">Cancel</Text>
              </Pressable>

              <Pressable
                className="bg-red-500 rounded-md px-7 py-3 active:opacity-70"
                onPress={handleDeleteAll}>
                <Text className="text-white font-semibold">Delete</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default Setting;
