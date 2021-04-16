const app = require('../app')
const request = require('supertest')

// As a client consuming application,
// I want to be able to receive a list of movies from the database,
// so that I can list them on my interface.
//
//  GET  /movies

describe("the /movies path", () =>{
    it("should return a list of movies from /movies", done => {
        request(app)
            .get('/movies')
            .expect(200)
            .end( (err, res) => {
                expect(res.body.length).toBe(3)
                done();
            });
    });
    it("should return the correct movie from any given title search", done => {
        request(app)
            .get('/movies?title=paris')
            .expect(200)
            .end((err,res)=>{
                expect(res.body).toEqual([{
                    "id": 1,
                    "title": "Midnight In Paris",
                    "runtime": 96,
                    "release_year": 2011,
                    "director": "Woody Allen"
                },
                {
                    "id": 3,
                    "title": "From Paris With Love",
                    "runtime": 94,
                    "release_year": 2010,
                    "director": "Pierre Morel"
                }])

                done();
            })
    });

    it('Should return details for a movie given an Id', done => {
        const expectedMovie =  {
            "id": 1,
            "title": "Midnight In Paris",
            "runtime": 96,
            "release_year": 2011,
            "director": "Woody Allen"
        };
        request(app)
            .get('/movies/1')
            .expect(200)
            .end(( err, res) => {
                expect(res.body).toEqual(expectedMovie);
                done();
            });
    });

    it("should allow the user to post a movie into the movieList", done=>{
        request(app)
            .post('/movie')
            .send({
                "id": 4,
                "title": "The Batman",
                "runtime": 195,
                "release_year": 2022,
                "director": "Matt Reeves"
                })
            .expect(200)
            .end(( err, res) =>{
                expect(res.body.length).toBe(4);
                done();
            });
    })
});


