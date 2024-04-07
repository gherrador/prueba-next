const { Server } = require('../dist/server/server')
const app = new Server()._app
const supertest = require("supertest");
const agent = supertest(app);
const expect = require('chai').expect

const cardData = {
  IBAN: "ES987654321",
  type: "credit",  
  pin: "NikolaTesla" 
}

describe("GET requests", function() {
  let cookies;
  before((done) => {
    agent.post("/login").send(cardData).expect(200, (err, res) => {
      if (err) return done(err);        
      cookies = res.headers["set-cookie"].pop().split(";")[0];
      done();
    });
    
  });
  
  it("should return a status 200", function(done) {
    agent
      .put("/activate")
      .send({"IBAN":"ES987654321"})
      .set("Cookie", [cookies])
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect( res.text ).to.be.a("string");        
        done();
      })
    });

    it("should return a status 200", function(done) {
      agent
        .put("/changepin")
        .send({"IBAN": "ES987654321","pin":"Nikol@.2024"})
        .set("Cookie", [cookies])
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect( res.text ).to.be.a("string")
          done();
        })
      });


  it("should return a 200 HTTP status code", function(done) {
    agent
      .get("/movements")
      .set("Cookie", [cookies])
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect( res.body ).to.be.a("array");       
        done();
      });
    });
  it("should return a 200 HTTP status code. Log with final balance after deposit", function(done) {
    agent
      .post("/deposit")
      .set("Cookie", [cookies])
      .send({qty:500, bank:"BBVA"})
      .end(function(err, res) {
        if (err) return done(err);   
        expect( res.status ).to.equal( 200 );
        console.log(`The balance after deposit is $${res.body.quantity}`)
        done();
      });
  });
});