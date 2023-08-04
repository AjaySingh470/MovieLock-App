import { View, Text, ScrollView, TouchableOpacity, Image,style, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import MovieList from '../components/MovieList'
import { fallbackPersonImage, fetchPersonDetails, fetchPersonSimilarMovies, image500 } from '../api/movieapi'
import Loading from '../components/Loading'
const PersonScreen = () => {
    const {params : item} = useRoute();
    const navigation = useNavigation();
    const [person,setPerson] = useState();
    const [personMovies,setPersonMovies] = useState([1,2,3,4,5]);
    const [isFav , setIsFav] = useState(false);
    const {width , height} = Dimensions.get('window')
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        getPersonDetails(item.id)
        getPersonMovies(item.id);
    },[item])
    const getPersonDetails =async (id)=>{
       const data =await fetchPersonDetails(id)
    //    console.log(data)
       if(data)
       setPerson(data);
    }
    const getPersonMovies = async(id)=>{
        const data = await fetchPersonSimilarMovies(id);
        // console.log(data);
        if(data && data.cast)
        {
            setPersonMovies(data.cast);
        }
    }



  return (
    <ScrollView className='flex-1  bg-neutral-800'  contentContainerStyle={{paddingBottom:20}} >
      
        <SafeAreaView className={'z-20 flex flex-row  justify-between  px-4 w-full items-center '} >
            <TouchableOpacity className='bg-yellow-500 p-1  rounded-md ' onPress={()=>navigation.goBack()} >
                  <ChevronLeftIcon color = 'white' size='26' ></ChevronLeftIcon>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setIsFav(!isFav)}>
              <HeartIcon color ={isFav ? 'white' : 'red'}  size='35' ></HeartIcon>
            </TouchableOpacity>
        </SafeAreaView>
        {/*Person Details */}
      { loading ? <Loading></Loading> : <View>
            <View className='flex-row justify-center'
                style={{
                    shadowColor : 'red',
                    shadowOffset : {height:5 , width : 0},
                    shadowOpacity : 1,
                    shadowRadius : 40
                }}
            >

                <View className='items-center  rounded-full overflow-hidden border-2 border-neutral-800 h-72 w-72 '>
                    <Image source={{uri : image500(person?.profile_path) || fallbackPersonImage}}
                        style={{
                            height : height*0.43,
                            width : width*0.74
                        }}
                    ></Image>
                </View>
            </View>
            <View className='mt-6'>
                    <Text className='text-3xl text-white font-bold text-center '>{person?.name}</Text>
                    <Text className='text-base text-neutral-400 text-center'>{person?.place_of_birth}</Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
                <View className='border-r-2 px-2 border-r-neutral-500 items-center  ' >
                    <Text className='text-white font-semibold' >Gender</Text>
                    <Text className='text-neutral-300 text-sm ' >{person?.gender == 1 ? "Female" : "Male"}</Text>
                </View>
                <View className='border-r-2 px-2 border-r-neutral-500 items-center ' >
                    <Text className='text-white font-semibold' >BirthDay</Text>
                    <Text className='text-neutral-300 text-sm ' >{person?.birthday}</Text>
                </View>
                <View className='border-r-2 px-2 border-r-neutral-500 items-center ' >
                    <Text className='text-white font-semibold' >Knowm For</Text>
                    <Text className='text-neutral-300 text-sm ' >{person?.known_for_department}</Text>
                </View>
                <View className=' px-2  items-center ' >
                    <Text className='text-white font-semibold' >Popularity</Text>
                    <Text className='text-neutral-300 text-sm ' >{person?.popularity}</Text>
                </View>
            </View>
            {/*Biography */}
            <View className='my-6 mx-5'>
                <Text className='text-white text-xl' >Biography</Text>
                <Text className='text-neutral-300 tracking-wide' >
                    {person?.biography}
                </Text>
            </View>
            {/*Person Movies */}
            <MovieList title={'Movies'} data={personMovies} hideSeeAll={false} ></MovieList>
        </View>}
    </ScrollView>
  )
}

export default PersonScreen