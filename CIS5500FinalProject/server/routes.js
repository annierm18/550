const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 0 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the TEAM PAAS server!`)
    } else {
        res.send(`Hello! Welcome to the TEAM PAAS server!`)
    }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************

/* Route 1 (handler) for the GET route '/movie'
*
* DESCRIPTION: returns an array of information about a movie, specified by Title and Year (PRIMARY KEYS)
* ROUTE PARAMETER: NONE
* QUERY PARAMETER: title (string), year (int)
* ROUTE HANDLER: movie(req, res)
* RETURN TYPE: JSON
* RETURN PARAMETERS:
* g.Title, g.Year, g.Language, g.Overview, g.Popularity, g.Runtime, g.Type, g.Genres, g.Companies, g.Countries, g.SpokenLanguages, sp.PosterLink, sp.URL, sp.RatingValue, sp.RatingCount
*
* EXPECTED (OUTPUT) BEHAVIOR:
*   If the (Title, Year) is found, return the singleton array of all the attributes available, but
*   if not, empty results array is returned.
*   Error message if Title AND Year are not specified
* */
async function movie(req, res) {
    // a GET request to /movie?title=The+Lion+King&year=1994
    // a GET request to /movie?title=Altar&year=2014
    var title = req.query.title;
    const year = req.query.year;

    if (title.includes("'")) {
        title = title.replace("'", "''");
        // console.log(title);
    }

    // connection.query(`
    //     drop view Movie_Info;
    // `)

    // connection.query(`
    //     CREATE VIEW Movie_Info(Title, Year, Language, Overview, Popularity, Runtime, Type, Genres, Countries, PosterLink, URL) AS
    //     With G as (
    //     SELECT s.Title, s.Year, s.Language, s.Overview, s.Popularity, s.Runtime, s.Type, GROUP_CONCAT(g.Genre SEPARATOR ', ') as Genres
    //     FROM MoviesTVShows s
    //         LEFT JOIN Genres g ON s.Title = g.Title AND s.Year = g.Year
    //     GROUP BY s.title, s.year
    //     ),
    //     C as (
    //     SELECT g.Title, g.Year, g.Language, g.Overview, g.Popularity, g.Runtime, g.Type, g.Genres, GROUP_CONCAT(c.Country SEPARATOR ', ') as Countries
    //     FROM G g
    //         LEFT JOIN Countries c ON g.Title = c.Title AND g.Year = c.Year
    //     GROUP BY g.title, g.year
    //     ),
    //     Rating as (
    //     SELECT g.Title, g.Year, g.Language, g.Overview, g.Popularity, g.Runtime, g.Type, g.Genres, g.Countries, sp.PosterLink, sp.URL
    //     FROM C g
    //         JOIN RatingsLinks sp ON g.Title = sp.Title AND g.Year = sp.Year
    //     GROUP BY g.title, g.year
    //     )
    //     SELECT *
    //     From Rating;
    // `);


    // SELECT *
    // From Movie_Info
    // WHERE Title = '${title}' AND Year = '${year}'

    // NaN refers to Not-a-Number
    if (req.query.title && req.query.year && !isNaN(req.query.year)) {
        connection.query(`
        SELECT s.Title, s.Year, s.Language, s.Overview, s.Popularity, s.Runtime, s.Type,
            GROUP_CONCAT(DISTINCT g.Genre SEPARATOR ', ') as Genres,
            GROUP_CONCAT(DISTINCT cnt.Country SEPARATOR ', ') as Countries,
            r.PosterLink, r.URL
        FROM RatingsLinks r
        LEFT JOIN Genres g ON r.Title = g.Title AND r.Year = g.Year
        LEFT JOIN Countries cnt ON r.Title = cnt.Title AND r.Year = cnt.Year
        Join MoviesTVShows s on r.Year = s.Year AND r.Title = s.Title
        WHERE s.Title = '${title}' AND s.Year='${year}'
        GROUP BY r.Title, r.Year`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({error: error})
            } else if (results) {
                res.json({results: results})
            }
        });
    } else {
        return res.json({error: "Please specify a movie or TV show's Title and Year!"});
    }
}

/* Route 2 (handler) for the GET route '/country'
*
* DESCRIPTION: Returns an array of all the movies/TV shows from a given country, specified by country
* ROUTE PARAMETER: NONE
* QUERY PARAMETER: country (string)
* ROUTE HANDLER: country(req, res)
* RETURN TYPE: JSON
* RETURN PARAMETERS: { results (JSON array of { Title (string), Popularity ( ), Rating Value ( ), Country (string), PosterLink (string) } ) }
*
* (mt.Title), Popularity, RatingValue, Country, PosterLink
*
* EXPECTED (OUTPUT) BEHAVIOR:
*   If the country is found, return all movies from that country in DESCENDING popularity and ratings order
*   if not, empty results array is returned.
*   Error message if country is not specified
*
*/
async function get_all_from_country(req, res) {
    // a GET request to /country?country=India
    // a GET request to /country?country=United+States+of+America
    const country = req.query.country;

    // NaN refers to Not-a-Number
    if (req.query.country) {
        connection.query(`
            SELECT distinct(mt.Title) as Title, Popularity, RatingValue, Country, PosterLink, rl.Year as Year
            FROM MoviesTVShows mt
            JOIN RatingsLinks rl ON mt.Title = rl.Title AND mt.Year = rl.Year
            JOIN Countries c on mt.Year = c.Year and mt.Title = c.Title
            WHERE c.Country= '${country}'
            ORDER BY Country, Popularity desc, RatingValue desc
            LIMIT 10`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({error: error})
            } else if (results) {
                res.json({results: results})
            }
        });
    } else {
        return res.json({error: "Please specify a country!"});
    }
}

/* Route 3 (handler) for the GET route '/mostpopular */
async function most_popular_movies(req, res) {

    connection.query(`
            SELECT distinct(mt.Title) as Title, rl.Posterlink as PosterLink, mt.Popularity as Popularity, rl.RatingValue as RatingValue, rl.Year as Year
            FROM MoviesTVShows mt
            JOIN RatingsLinks rl ON mt.Title = rl.Title AND mt.Year = rl.Year
            ORDER BY Popularity desc, RatingValue desc
            LIMIT 100`, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({error: error})
        } else if (results) {
            res.json({results: results})
        }
    });

}

/* Route 4 (handler) for the GET route '/filters'
*
* If no parameters are specified, it will prompt you to enter either language, genre, and/or release year
* Else, handles all combinations of filters specified (language, language and release_year, all three, etc.)
*
* */
// async function filters(req, res) {
//     const language = req.query.language; /* ? req.params.language : 'en'; */
//     const genre = req.query.genre;
//     const release_year = req.query.release_year;

//     /* ADDITIONAL NICE TO HAVE FILTER PARAMETERS WE CAN ADD LATER IF WE'D LIKE
//     const runtime = req.query.runtime;
//     const rating = req.query.rating; */

//     // NaN refers to Not-a-Number
//     if (! req.query.language && ! req.query.genre && ! req.query.release_year) {
//         return res.json({error: "Please specify a language, genre, and/or release year!"});

//     } else if (req.query.language && !req.query.genre && !req.query.release_year) { // ONLY language is specified

//         connection.query(`
//             SELECT DISTINCT (mt.Title) as Title, rl.PosterLink as Poster, rl.Year as Year
//             FROM MoviesTVShows mt
//             INNER JOIN RatingsLinks rl
//             ON mt.Title = rl.Title AND mt.Year = rl.Year
//             INNER JOIN Genres g
//             ON mt.Title = g.Title AND mt.Year = g.Year
//             WHERE mt.Language = '${language}'`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({error: error})
//             } else if (results) {
//                 res.json({results: results})
//             }
//         });

//     } else if (!req.query.language && req.query.genre && !req.query.release_year) { // ONLY genre is specified

//         connection.query(`
//             SELECT DISTINCT (mt.Title) as Title, rl.PosterLink as Poster, rl.Year as Year
//             FROM MoviesTVShows mt
//             INNER JOIN RatingsLinks rl
//             ON mt.Title = rl.Title AND mt.Year = rl.Year
//             INNER JOIN Genres g
//             ON mt.Title = g.Title AND mt.Year = g.Year
//             WHERE g.genre = '${genre}'`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({error: error})
//             } else if (results) {
//                 res.json({results: results})
//             }
//         });

//     } else if (!req.query.language && !req.query.genre && req.query.release_year) { // ONLY release_year is specified

//         connection.query(`
//             SELECT DISTINCT (mt.Title) as Title, rl.PosterLink as Poster, rl.Year as Year
//             FROM MoviesTVShows mt
//             INNER JOIN RatingsLinks rl
//             ON mt.Title = rl.Title AND mt.Year = rl.Year
//             INNER JOIN Genres g
//             ON mt.Title = g.Title AND mt.Year = g.Year
//             WHERE mt.year = '${release_year}'`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({error: error})
//             } else if (results) {
//                 res.json({results: results})
//             }
//         });

//     } else if (req.query.language && req.query.genre && !req.query.release_year) { // ONLY language and genre are specified

//         connection.query(`
//             SELECT DISTINCT (mt.Title) as Title, rl.PosterLink as Poster, rl.Year as Year
//             FROM MoviesTVShows mt
//             INNER JOIN RatingsLinks rl
//             ON mt.Title = rl.Title AND mt.Year = rl.Year
//             INNER JOIN Genres g
//             ON mt.Title = g.Title AND mt.Year = g.Year
//             WHERE mt.Language = '${language}' AND g.genre LIKE '${genre}'`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({error: error})
//             } else if (results) {
//                 res.json({results: results})
//             }
//         });

//     } else if (!req.query.language && req.query.genre && req.query.release_year) { // ONLY genre and release_year are specified

//         connection.query(`
//             SELECT DISTINCT (mt.Title) as Title, rl.PosterLink as Poster, rl.Year as Year
//             FROM MoviesTVShows mt
//             INNER JOIN RatingsLinks rl
//             ON mt.Title = rl.Title AND mt.Year = rl.Year
//             INNER JOIN Genres g
//             ON mt.Title = g.Title AND mt.Year = g.Year
//             WHERE  g.genre LIKE '${genre}' AND mt.year = '${release_year}'`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({error: error})
//             } else if (results) {
//                 res.json({results: results})
//             }
//         });

//     } else if (req.query.language && !req.query.genre && req.query.release_year) { // ONLY language and release_year are specified// ONLY release_year is specified

//         connection.query(`
//             SELECT DISTINCT (mt.Title) as Title, rl.PosterLink as Poster, rl.Year as Year
//             FROM MoviesTVShows mt
//             INNER JOIN RatingsLinks rl
//             ON mt.Title = rl.Title AND mt.Year = rl.Year
//             INNER JOIN Genres g
//             ON mt.Title = g.Title AND mt.Year = g.Year
//             WHERE mt.Language = '${language}' AND mt.year = '${release_year}'`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({error: error})
//             } else if (results) {
//                 res.json({results: results})
//             }
//         });

//     } else { // all three filters are specified
//         connection.query(`
//             SELECT DISTINCT (mt.Title) as Title, rl.PosterLink as Poster, rl.Year as Year
//             FROM MoviesTVShows mt
//             INNER JOIN RatingsLinks rl
//             ON mt.Title = rl.Title AND mt.Year = rl.Year
//             INNER JOIN Genres g
//             ON mt.Title = g.Title AND mt.Year = g.Year
//             WHERE mt.Language = '${language}' and
//                g.genre LIKE '${genre}' and
//                mt.year = '${release_year}'`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({error: error})
//             } else if (results) {
//                 res.json({results: results})
//             }
//         });
//     }
// }

async function filters(req, res) {
    const language = req.query.language ? req.query.language :'en' /* ? req.params.language : 'en'; */
    const genre = req.query.genre ? req.query.genre : 'Comedy'
    const release_year = req.query.release_year ? req.query.release_year : 2001

    /* ADDITIONAL NICE TO HAVE FILTER PARAMETERS WE CAN ADD LATER IF WE'D LIKE
    const runtime = req.query.runtime;
    const rating = req.query.rating; */

    // NaN refers to Not-a-Number
    if (! req.query.language && ! req.query.genre && ! req.query.release_year) {
        return res.json({error: "Please specify a language, genre, and/or release year!"});

    } else { 
        connection.query(`
            SELECT DISTINCT (mt.Title) as Title, rl.PosterLink as PosterLink, rl.Year as Year
            FROM MoviesTVShows mt
            INNER JOIN RatingsLinks rl
            ON mt.Title = rl.Title AND mt.Year = rl.Year
            INNER JOIN Genres g
            ON mt.Title = g.Title AND mt.Year = g.Year
            WHERE mt.Language = '${language}' AND 
                g.genre LIKE '${genre}' AND
                mt.year = '${release_year}'`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({error: error})
            } else if (results) {
                res.json({results: results})
            }
        });
    }
}

/* Route 5 (handler) for the GET route '/nummoviesbycountry */
async function num_movies_by_country(req, res) {
    // a GET request to /nummoviesbycountry

        connection.query(`
            SELECT COUNT(m.title) as NumMovies, Country
            FROM Countries c JOIN MoviesTVShows m ON c.year=m.year AND c.title=m.title
            GROUP BY Country`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({error: error})
            } else if (results) {
                res.json({results: results})
            }
        });
}

/* Route 6 (handler) for the GET route '/populargenre/:country'
* Returns the most popular genre given a country
* */
async function popular_genre_by_country(req, res) {
    // a GET request to /populargenre/United%20States%20of%20America
    // a GET request to /populargenre/India
    const country = req.params.country ? req.params.country : 'United States of America';

    connection.query(`
        With Temp as (
          SELECT c.Country, g.Genre, COUNT(g.Genre) as Num
          FROM Countries c JOIN Genres g ON c.Year = g.Year AND c.Title = g.Title
          GROUP BY c.Country, g.Genre
          ORDER BY Num DESC
        )
        SELECT Country, Genre AS MostPopularGenre, MAX(Num) AS NumMoviesOfGenre
        From Temp
        WHERE Country = '${country}'
        GROUP BY Country`, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({error: error})
        } else if (results) {
            res.json({results: results})
        }
    });
}

/* Route 7 (handler) for the GET route '/search/movies'
* SIMPLE search function that enables search by Title and other parameters (Country or Language)
* May be enhanced to include search over keywords in 'Overview'
* */
async function search(req, res) {
    const title = req.query.title;

    // NaN refers to Not-a-Number
    if (req.query.title) {
        connection.query(`
            SELECT *
            FROM MoviesTVShows NATURAL JOIN Countries
            WHERE
            (
              Title LIKE '${title}'
            )
            ORDER BY Title LIMIT 1`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({error: error})
            } else if (results) {
                res.json({results: results})
            }
        });

    } else {
        return res.json({error: "Please specify a search parameter!"});
    }
}

"Title, Dilwale Dulhania Le Jayenge, Year, Language, Overview, Popularity, Runtime, Type, Country"

module.exports = {
    hello,
    movie,
    get_all_from_country,
    most_popular_movies,
    filters,
    num_movies_by_country,
    popular_genre_by_country,
    search
}