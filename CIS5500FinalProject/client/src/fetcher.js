import config from './config.json'

const getMovie = async (title, year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movie?title=${title}&year=${year}`, {
        method: 'GET',
    })
    return res.json()
}

const getCountry = async (country) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/country?country=${country}`, {
        method: 'GET',
    })
    return res.json()
}

const getMostPopular = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/mostpopular`, {
        method: 'GET',
    })
    return res.json()
}

const getFilteredMovieResults = async (language, genre, release_year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/filters?language=${language}&genre=${genre}&release_year=${release_year}`, {
        method: 'GET',
    })
    return res.json()
}

const getNumMoviesByCountry = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/nummoviesbycountry`, {
        method: 'GET',
    })
    return res.json()
}

const getPopularGenreByCountry = async (country) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/populargenre/${country}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getMovie,
    getCountry,
    getMostPopular,
    getFilteredMovieResults,
    getNumMoviesByCountry,
    getPopularGenreByCountry,
}