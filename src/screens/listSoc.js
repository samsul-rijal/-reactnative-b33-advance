import * as React from "react";
import { Text, Box, FlatList, Pressable } from "native-base";

// Add Props in Hello({navigation})
export default function Hello({ navigation }) {
  // Set Dummy Data with Array
  const socialMedia = ["Facebook","Twitter","Instagram","Tiktok"]

  // Make Function handle press to get value per list
  const hanldePress = (data) => {
    navigation.navigate("Detail Social Media", {data})
  }

  return (
    <Box
      safeArea
      bg="primary.400"
      flex={1}
      alignItems="center"
      justifyContent="center"
      p={10}
    >
      {/* Render Array With Flatlist */}

      <FlatList 
        data={socialMedia}
        renderItem={({item}) => (
          <Pressable onPress={() => hanldePress(item)}>
            <Text
              fontFamily="body"
              fontWeight={400}
              fontStyle="italic"
              fontSize={25}
              margin={5}
            >
              {item}
            </Text>
          </Pressable>
        )}
      
      />

    </Box>
  );
}
