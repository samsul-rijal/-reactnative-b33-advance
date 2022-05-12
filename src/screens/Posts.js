import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

// Import Axios
import axios from 'axios'
import { NavigationContainer } from "@react-navigation/native";

const Posts = ({navigation}) => {
  //Init State
  const [post, setPost]= useState([])
  const [isLoading, setIsLoading] = useState(false)

  //Function Exception
  const getPost = () => {
    setIsLoading(true)

    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      console.log(res);
      setPost(res.data)
      setIsLoading(false)
    })
    .catch(() => {
      alert("Error Fetch data")
      setIsLoading(false)
    })
  }

  // Create LifeCycle
  useEffect(()=>{
    getPost()
  },[])


  // Create Function to fetch
  const _renderItem = ({item}) => {
    return (
      <ListItem    
        key={item.id}
        onPress={() => navigation.navigate("DetailPost", item)}
        bottomDivider
      >
        <Avatar
          rounded
          title={item.title.slice(0,2)}
          countainerStyle={{ backgroundColor: "black"}}
        />

        <ListItem.Content>
          
          <ListItem.Title h4 numberOflines={1}>
            {item.title}
          </ListItem.Title>

          <ListItem.Subtitle numberOflines={2}>
            {item.body}
          </ListItem.Subtitle>

        </ListItem.Content>

      </ListItem>
    )
  }

  //   Create Component List
  return (
    <View style={style.container}>
      <View>

        <FlatList 
          data={post}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
          refreshing={isLoading}
          onRefresh={getPost}
        />

      </View>
    </View>
  );
};

export default Posts;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
