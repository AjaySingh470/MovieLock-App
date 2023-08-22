import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ViewPropTypes } from 'deprecated-react-native-prop-types'
import { StatusBar } from 'expo-status-bar'
import {  SafeAreaView , SafeAreaProvider } from 'react-native-safe-area-context'
import {Bars3CenterLeftIcon ,MagnifyingGlassIcon } from 'react-native-heroicons/solid'
import TrendingScreen from '../components/TrendingMovies'
import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import { useNavigation } from '@react-navigation/native'
import { fetchRatedMovies, fetchTrendingMovies, fetchTrendingTvShows, fetchTvShowsRated, fetchUpcomingMovies } from '../api/movieapi'
const HomeScreen = () => {
  const [trending,setTrending] = useState([]);
  const [upcoming,setUpcoming] = useState([]);
  const [toprated , setToprated] = useState([]);
  const [trendingTVShows , setTrendingTVShows] = useState([]); 
  const [ratedTVshows , setRatedTVshows] = useState([]);
  const [loading , setLoading] = useState(false);
  const navigation = useNavigation();
  //////
  const getTrendingMovies= async ()=>{
    const data = await fetchTrendingMovies();
    if(data && data.results)
    {
        setTrending(data.results);
    }
  }

  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies();
    if(data && data.results)
    {
      setUpcoming(data.results);
    }
  }
  const getTrendingTvShows = async ()=>{
    const data = await fetchTrendingTvShows();
    if(data && data.results)
    {
      setTrendingTVShows(data.results)
    }
  }

  const getTopRatedTVShows = async ()=>{
    const data = await fetchTvShowsRated();
    if(data && data.results)
    {
      setRatedTVshows(data.results)
    }
  }

  const getTopRatedMovies = async ()=>{
    const data = await fetchRatedMovies();
    if(data && data.results)
    {
      setToprated(data.results)
    }
  }


  useEffect(()=>{
    setLoading(true)
     getTrendingMovies();
     getUpcomingMovies();
     getTopRatedMovies();
     getTrendingTvShows();
     getTopRatedTVShows();
     setLoading(false);
  },[]);


  return (
    <View className="flex-1 bg-neutral-800" >

      <SafeAreaView className="h-full mb-3 bg-neutral-800">

      <StatusBar style="light" ></StatusBar>
        <View className="flex-row text-white justify-between items-center mt-4 mx-4" >
            <Bars3CenterLeftIcon size='30' color="white"  ></Bars3CenterLeftIcon>
            <Text className="text-white font-bold text-3xl" >
              <Text className="text-yellow-600" >M</Text>ovieLock
            </Text>
            <MagnifyingGlassIcon size="30"  color="white" onPress={()=>navigation.navigate("Search")} ></MagnifyingGlassIcon>
        </View>
        { loading ? <Loading></Loading> :
        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:10}}
        >
            {/* trending movies */}
       {  trending.length>0 && <TrendingMovies data={trending} ></TrendingMovies> }
        {/* upcoming movies */ }
      { upcoming.length>0 &&  <MovieList title="Upcoming" hideSeeAll={true} data={upcoming} ></MovieList>}
      { toprated.length>0 && <MovieList title="Top Rated" data={toprated} hideSeeAll={true} ></MovieList>}
      {trendingTVShows.length>0 && <MovieList title='TV Shows - Trending' data={trendingTVShows} ></MovieList>}
      {ratedTVshows.length>0 && <MovieList title='TV Shows - Top Rated' data={ratedTVshows} ></MovieList>}
        </ScrollView> 
      }
        </SafeAreaView>
      </View>
  )
}

export default HomeScreen