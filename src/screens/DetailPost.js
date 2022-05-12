import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";

// Import Axios
import axios from 'axios'

const PostDetail = ({route}) => {
  //init Props

  console.log(route);

  const {title, id, body} = route.params
  
  //Init State
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  //Function Exception
  const getComment = () => {
    setIsLoading(true)

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((res) => {
      console.log(res);
      setComments(res.data)
      setIsLoading(false)
    })
    .catch(() => {
      alert("Error Fetch data")
      setIsLoading(false)
    })
  }

  // Create LifeCycle
  useEffect(()=>{
    getComment()
  },[])

  // Create Function to fetch


  const _renderItem = ({item}) => {
    return (
      <ListItem    
        key={item.id}
      >
        <ListItem.Content>
          
          <ListItem.Title h4 numberOflines={1}>
            {item.email}
          </ListItem.Title>

          <ListItem.Subtitle numberOflines={2}>
            {`${item.name} - ${item.body}`}
          </ListItem.Subtitle>

        </ListItem.Content>

      </ListItem>
    )
  }

  //   Create Component List
  return (
    <View style={style.container}>
      <Text h2 style={{ fontWeight: "bold" }}>
        This Is Post Detail
      </Text>

      <Text>
        {title}
      </Text>
      <Text>
        {body}
      </Text>
      <Text>Comments</Text>


      <FlatList 
        data={comments}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={getComment}
      />


    </View>
  );
};

export default PostDetail;

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 16,
    flex: 1,
  },
});
