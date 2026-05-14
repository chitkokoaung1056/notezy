import { NoteType } from "@/types/NoteType";
import { Link } from "expo-router";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";

const NoteComponent = ({ id, title, description }: NoteType) => {
  return (
    <Link href={`/notes/${id}`} asChild>
      <Pressable
        className="p-4 rounded-lg bg-white dark:bg-slate-700 active:opacity-70"
        style={
          Platform.OS === "android"
            ? { elevation: 2.5 }
            : {
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
              }
        }>
        <View className="flex-row items-center mb-2">
          <Text
            className="text-slate-600 text-lg dark:text-slate-100 font-semibold flex-1"
            numberOfLines={1}>
            {title}
          </Text>
        </View>

        <Text
          className="text-slate-600 text-[13px] dark:text-slate-300"
          numberOfLines={2}>
          {description}
        </Text>
      </Pressable>
    </Link>
  );
};

export default NoteComponent;
