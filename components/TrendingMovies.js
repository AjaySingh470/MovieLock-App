import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/movieapi';


var {width , height} = Dimensions.get('window');

const TrendingMovies = ({data}) => {
  // console.log(data)
  const navigation = useNavigation();
  const handleClick = (item)=>{
    navigation.navigate('Movie',item);
  }


  return (
    <View className="mt-4" >
      <Text className="text-white text-xl mx-4 mb-5 " >Trending</Text>
      <Carousel 
      data = {data}
      renderItem={({item})=><MovieCard item={item} handleClick={handleClick}></MovieCard>}
      firstItem={1}
      inactiveSlideOpacity={0.3}
      sliderWidth={width}
      itemWidth={0.62*width}
      slideStyle={{display:'flex', alignItems : 'center'}}

      ></Carousel>
    </View>
  )
}

const MovieCard = ({item,handleClick})=>{
  // console.log(item.poster_path)
      return (
        <TouchableOpacity onPress={()=>handleClick(item)} >
          
            <Image source={{uri : image500(item.poster_path)}} style={{
              width : width*0.6,
              height : height*0.4
            }}
            className="rounded-xl" ></Image>
        </TouchableOpacity>
      )
}


export default TrendingMovies