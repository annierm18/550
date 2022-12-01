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

const getTenMostPopular = async () => {
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

const getMovieSearch = async (title) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search?title=${title}`, {
        method: 'GET',
    })
    return res.json()
}

/************************************************************************************************************************/
/* SG: I didn't delete any of these from HW2 yet so they can be used as reference when building out the front-end pages */
/************************************************************************************************************************/
const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getMovie,
    getCountry,
    getTenMostPopular,
    getFilteredMovieResults,
    getNumMoviesByCountry,
    getPopularGenreByCountry,
    getMovieSearch,

    // of the below can be deleted later once we no longer need to reference them
    getAllMatches,
    getAllPlayers,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch
}