import { View, Text ,ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { fallbackPersonImage, image185 } from '../api/movieapi';



const Casts = ({cast,navigation}) => {
    // const navigation = useNavigation()
  return (
    <View className='my-6'>
            <Text className = 'text-white mx-6 mb-5 text-lg'>Cast</Text>
            <ScrollView
            horizontal 
            showsHorizontalScrollIndicator = {false}
            contentContainerStyle = {{
              paddingHorizontal: 15
            }}
            >
                {
                    cast && cast.map((person,index)=>{
                        return (
                            <TouchableOpacity key = {index} className='mr-4 items-center' 
                                onPress={()=>navigation.navigate('Person' , person)}
                            >
                                <View className='overflow-hidden rounded-full h-20 w-20 items-center shadow-md shadow-white drop-shadow-md '>
                                <Image source={{uri : image185(person?.profile_path || fallbackPersonImage)}}
                                className='h-24 w-20 rounded-lg'
                                ></Image>

                                </View>
                                <Text className='text-white  text-xs mt-1' >
                                    {
                                        
                                        person?.character?.length > 10 ? person?.character?.slice(0,10) + '...' : person?.character 
                                    }
                                </Text> 
                                <Text className='text-neutral-400  text-xs mt-1' >
                                    {
                                        person?.original_name?.length > 10 ? person?.original_name?.slice(0,10) + '...' : person?.original_name 
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
    </View>
  )
}

export default Casts