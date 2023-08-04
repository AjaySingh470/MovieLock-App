import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, fetchSearchData, image342 } from '../api/movieapi'
import { debounce } from 'lodash'
import Loading from '../components/Loading'


let {width , height } = Dimensions.get('window')
const SearchScreen = () => {
    const [results,setResults] = useState([])
    const [loading ,setLoading] = useState(false);
    // const [query , setQuery] = useState("Aveng")
    const handleSearch =value=>{
        // console.log(value)
        if(value && value.length>2)
        {
            // console.log("i am here")
            setLoading(true);   
            fetchSearchData(
                {
                    query: value,
                    include_adult: 'false',
                    language: 'en-US',
                    page: '1'
                }
            ).then(data=>{
                setResults(data.results);
                // console.log(data)
                setLoading(false);
            })
        }
        else{
            setLoading(false);
            setResults([])
        }

    }
    
    
    const handleSearchDebounce = useCallback(debounce(handleSearch,400),[]);

    const navigation = useNavigation();
  return (
    
   <SafeAreaView className='bg-neutral-800 flex-1' >
   

    
    <View className='mx-4 mb-3 flex-row justify-between rounded-full mt-3  items-center border border-neutral-500' >
        <TextInput placeholder='Search' placeholderTextColor={'lightgray'} onChangeText={handleSearchDebounce}
        className=' text-white pb-3 pt-3 pl-6 flex-1 text-base tracking-wider ' ></TextInput>

        <TouchableOpacity 
            onPress={()=>{
                navigation.navigate('Home')
            }}
            className='rounded-full p-3 m-1 bg-neutral-700'
        >
            <XMarkIcon color={'white'}></XMarkIcon>
        </TouchableOpacity>
    </View>
   
    { loading ? <Loading></Loading> :
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:20}}
        >
        
        <Text className='text-white font-semibold text-lg ml-1 mb-4 ' >{results?.length > 0 ? 'Results ('+results.length+')' : ''}</Text>
        
            
                <View className='flex flex-row flex-wrap justify-between '>
                {
                    results.length > 0 ? results.map((item,index)=>{
                        return (
                            <TouchableOpacity key={index} className='' onPress={()=>navigation.navigate('Movie',item)} >
                                <View className='space-y-1 mb-4'  >
                                    <Image className='rounded-2xl'
                                    style={{
                                        width : width*0.44,
                                        height : height*0.3
                                    }}
                                    source={{uri : image342(item?.poster_path) || fallbackMoviePoster}} ></Image>
                                    <Text className='text-neutral-100 text-center ' >{
                                        item?.title.length > 22 ? item?.title.slice(0,22)+'...' : item?.title
                                    }</Text>
                                </View>

                            </TouchableOpacity>
                        )
                    }) : null
                }
                </View>
    
        
    </ScrollView>
}
    </SafeAreaView>
            

  )
}

export default SearchScreen