import React, { useContext, useEffect, useState } from 'react'

const AppContext = React.createContext();

export const API_URL = 'https://www.omdbapi.com/?apikey=ef30e08d';

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [query, setQuery] = useState("titanic");
    const [isError, setisError] = useState({
        show: "false", msg: ""
    });
    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "True") {
                setIsLoading(false);
                setMovie(data.Search)
                console.log(data.Search);
                setisError({
                    show: false,
                    msg: ""
                })
                setIsLoading(false);
            }
            else {
                setisError({
                    show: true,
                    msg: data.Error
                })
            }
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        let timeOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 500);
        return () => clearTimeout(timeOut);
    }, [query])

    return <AppContext.Provider value={{ isLoading, isError, movie, setQuery, query }}>
        {children}
    </AppContext.Provider>

}
const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };