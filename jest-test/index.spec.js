const request = require('supertest')
const app=require('./index')

describe('Test todo methods', ()=>{
    it('Return all todos', async done=>{
        await request(app).get('/todo').expect(200).then((res)=>{
            expect(res.body.length).toBe(3);
        });
        done();
    });
    it(`Return a todo with id: ${2}`, async done=>{
        await request(app).get('/todo/2').expect(200).then((res)=>{
            expect(res.body.name).toBe('Get pizza for dinner');
        });
        done();
    });
});

describe('Test responses from querying an external API', ()=>{
    it('Should retrieve a random chuck Norris joke', async done=>{
        let jokeResp = await request(app).get('/joke');
        let joke = JSON.parse(jokeResp.text);
        expect(joke.value).toBeTruthy();
        done();
    });
    it(`No 2 chuck Norris jokes will be teh same`, async done=>{
        let joke1 = await request(app).get('/joke');
        let joke2 = await request(app).get('/joke');
        let j1 = JSON.parse(joke1.text);
        let j2 = JSON.parse(joke2.text);
        expect((j1.value === j2.value)).toBeFalsy();
        done();
    });
});