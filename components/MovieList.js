import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image342 } from '../api/movieapi'

let {width,height} = Dimensions.get('window')


const MovieList = ({title , data , hideSeeAll}) => {
    const navigation = useNavigation();
  return (
    <View  className=" mb-8 mt-4" >
        <View className="mx-4 flex-row justify-between" >
            <Text className="text-white text-xl" >{title}</Text>
            {
                hideSeeAll &&
                <TouchableOpacity className= ""  >
                    <Text className="font-bold text-lg text-yellow-500 " >See All</Text>
                </TouchableOpacity>
            }
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
        >
            {
                data?.map((item,index)=>{
                    return(

                        <TouchableOpacity
                            key = {index}
                            className="mt-4 mr-3"
                            onPress={()=>navigation.push('Movie',item)}
                        >
                            <View className=" space-y-1 rounded-2xl overflow-hidden">
                                <Image source={{uri : image342(item.poster_path) || fallbackMoviePoster}}
                                style={{
                                    width : width*0.33,
                                    height : height*0.22
                                }}
                                ></Image>
                            </View>
                            <Text className="text-neutral-400 text-center translate-x-1/3 " >
                                { item?.title?.length > 10 ? item?.title?.slice(0,14)+'...' : item.title }
                            </Text>
                         </TouchableOpacity>
                        )
                })
            }

        </ScrollView>
    </View>
  )
}

export default MovieList