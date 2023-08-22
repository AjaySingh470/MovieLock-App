import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import Casts from '../components/Casts'
import MovieList from '../components/MovieList'
import { fallbackMoviePoster, fetchCredits, fetchMovieDetails, fetchSimilarMovies, fetchTVshowDetails, fetchTvShowSimilar, fetchTvshowCredits, image500} from '../api/movieapi'
import Loading from '../components/Loading'



let {width , height} = Dimensions.get('window')

const MovieScreen = () => {
  const navigation = useNavigation();
  const {params: item} = useRoute();
  const [movieDetails,setMovieDetails] = useState([]);
  const [loading , setLoading] = useState(false);
  const [isFav , setIsFav] = useState(false);
  const [cast , setCast] = useState([1,2,3,4,5]);
  const [similar,setSimilar] = useState([]);
  const [istvShow , setIstvShow] = useState(false);
  const [tvShowDetails , setTvShowDetails] = useState([]);
  useEffect(()=>{

    setLoading(true);
    if(item?.title?.length>0)
    {
      getMovieDetails(item.id)
      getMovieCast(item.id)
      getSimilarMovies(item.id)
    }
    else{
      setIstvShow(true);
      getTvshowdetails(item.id)
      getTvShowCast(item.id);
      getSimilarTvShows(item.id);
    }
    setLoading(false);
  },[item]);

  const getMovieDetails = async id=>{
    const data = await fetchMovieDetails(id)
    if(data)
    {
      setMovieDetails(data);
    }
  }
  const getMovieCast = async id=>{
    const data = await fetchCredits(id);
    if(data && data.cast)
    {
      setCast(data.cast)
    }
  }
  const getTvShowCast = async id=>{
    const data = await fetchTvshowCredits(id);
    if(data && data.cast)
    {
      setCast(data.cast)
    }
  }
  const getSimilarMovies = async id=>{
    const data = await fetchSimilarMovies(id);
    if(data && data.results)
    {
      setSimilar(data.results);
    }
  }
  const getSimilarTvShows = async id=>{
    const data = await fetchTvShowSimilar(id);
    if(data && data.results)
    {
      setSimilar(data.results);
    }
  }

  const getTvshowdetails = async id =>{
    const data = await fetchTVshowDetails(id);
    if(data)
    {
      setMovieDetails(data);
    }
  }

  return (
   
    <ScrollView
      contentContainerStyle = {{paddingBottom:20}}
      className = 'flex-1 bg-neutral-900'
    >
    <View className='w-full'>
        <SafeAreaView className={'absolute z-20 flex flex-row  justify-between  px-4 w-full items-center '} >
            <TouchableOpacity className='bg-yellow-500 p-1  rounded-md ' onPress={()=>navigation.goBack()} >
                  <ChevronLeftIcon color = 'white' size='26' ></ChevronLeftIcon>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setIsFav(!isFav)}>
              <HeartIcon color ={isFav ? 'white' : 'red'}  size='35' ></HeartIcon>
            </TouchableOpacity>
        </SafeAreaView>
        { loading ? <Loading></Loading> :
          <View className=''>
            <Image source={{uri : image500(movieDetails.poster_path)||fallbackMoviePoster}} 
            style={{
              width : width  , height : height*0.55
            }}
            
            ></Image>
            <LinearGradient
              colors = {['transparent','rgba(23, 23, 23, 0.8)','rgba(23, 23, 23, 1)']}
              // colors={['rgba(0,0,0,0.8)', 'transparent']}
              style = {{
                width  , 
                height : height*0.4
              }}
              start = {{
                x : 0.5 , y : 0
              }}
              end = {{
                x : 0.5 , y : 1
              }}
              className='absolute -bottom-1'
            >

            </LinearGradient>
        </View>
        }
   </View>
   <View style={{marginTop : -(height*0.08)}} className='space-y-2 px-3 ' >
        <Text className='text-white text-center  text-3xl font-bold tracking-wider'>
          {movieDetails?.title ? movieDetails?.title : movieDetails?.name}
        </Text>
        {/*status , release year , length */}
        {
          movieDetails?.id ? (

            <Text className='text-neutral-400 text-center font-light text-base ' >
              {/* {Released    2022  •  120mins   }  */}
              {movieDetails?.status }  •  { movieDetails?.release_date ? movieDetails?.release_date?.slice(0,4) : movieDetails?.first_air_date?.slice(0,4)}  •  { movieDetails?.runtime ?` ${movieDetails?.runtime}+'mins'`: `${movieDetails?.number_of_seasons+ '-season'}`}
            </Text>
          ) : null
        }
        {/* genre */}
        <View className='flex-row justify-center flex-wrap px-3' >
          {
            movieDetails?.genres?.length>0 ?  movieDetails?.genres?.map((item,index)=>{
              
              let showDot = index+1 !== movieDetails?.genres?.length

              return (
              <Text key={index}  className='text-neutral-400 pl-2 text-center font-semibold text-base ' >
                {item?.name}  {showDot ? '•' : ''}
              </Text>

              )
            }) : null
          }
        </View>
        {/* description */}
        <Text className='text-neutral-400 tracking-wide mx-4 ' >
          {movieDetails?.overview}
        </Text>
        {/*cast */}
       
          <Casts  cast = {cast} navigation={navigation}></Casts>

        {/*Similar Movies */}
              { similar?.length > 0 ? <MovieList title={ istvShow ? `Similar TvShow` : 'Similar Movies'  } data={similar} hideSeeAll={false}></MovieList> : null}
    </View>

  </ScrollView>
  )
}

export default MovieScreen