import axios from "axios";

const API_KEY = '9906ce3a4cc6d4230d78d15cb05e506c';


const baseUrl = 'https://api.themoviedb.org/3'

const apiCall = async(url,params)=>{

    const options = {
        method : 'GET',
        url ,
        params : params ? params : {}
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error.message)
        return {};
    }
}

const personDetails = id=>`${baseUrl}/person/${id}?api_key=${API_KEY}`
const personSimilarMovies = id=>`${baseUrl}/person/${id}/combined_credits?api_key=${API_KEY}`
const movieDetails = id=> `${baseUrl}/movie/${id}?api_key=${API_KEY}`
const movieCredits = id=> `${baseUrl}/movie/${id}/credits?api_key=${API_KEY}`
const movieSimilar = id=> `${baseUrl}/movie/${id}/recommendations?api_key=${API_KEY}`
const trendingMovies = `${baseUrl}/trending/movie/week?api_key=${API_KEY}`
const upcomingMovies = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`
const topRatedMovies = `${baseUrl}/movie/top_rated?api_key=${API_KEY}&sort_by=vote_average`
const searchMovie = `${baseUrl}/search/multi?api_key=${API_KEY}`


//======================================TV SHOWS=============================================

const tvShowsTrending =`${baseUrl}/trending/tv/day?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;
const tvShowsTopRated =`${baseUrl}/tv/top_rated?api_key=${API_KEY}&language=en-US&sort_by=vote_average`;
const tvShowDetails =  id=>`${baseUrl}/tv/${id}?api_key=${API_KEY}`;
const tvShowsCredits = id => `${baseUrl}/tv/${id}/credits?api_key=${API_KEY}`;
const tvShowSimilar = id => `${baseUrl}/tv/${id}/recommendations?api_key=${API_KEY}`;
//===================================================================================

export const fetchTvShowSimilar = (id)=>{
    return apiCall(tvShowSimilar(id));
}

export const fetchTvshowCredits = (id)=>{
    return apiCall(tvShowsCredits(id));
}

export const fetchTVshowDetails = (id)=>{
    return apiCall(tvShowDetails(id));
}

export const fetchTvShowsRated = ()=>{
    return apiCall(tvShowsTopRated);
}

export const fetchPersonSimilarMovies = (id)=>{
    return apiCall(personSimilarMovies(id))
}
export const fetchSearchData = (params)=>{
    return apiCall(searchMovie,params);
}
export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMovies);
}
export const fetchRatedMovies = ()=>{
    return apiCall(topRatedMovies);
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMovies);
}
export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetails(id))
}
export const fetchCredits = (id)=>{
    return apiCall(movieCredits(id));
}
export const fetchSimilarMovies = (id)=>{
    return apiCall(movieSimilar(id));
}
export const fetchPersonDetails = (id)=>{
    return apiCall(personDetails(id));
}

export const fetchTrendingTvShows = ()=>{
    return apiCall(tvShowsTrending)
}


export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';



export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null ;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null ;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null ;