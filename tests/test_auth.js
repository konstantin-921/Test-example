import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../models/index';
import server from '../app';

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-undef
describe('---Test auth route---', () => {
  // eslint-disable-next-line no-undef
  before((done) => {
    models.sequelize.sync({force: true}).then(() => {
          done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should POST /api/auth/signUp', done => {
    const user = {
      password: '1',
      email: 'vova@yandex.ru',
      language: 'en',
    };
    chai
      .request(server)
      .post(`/api/auth/signUp`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('it should GET /api/auth/signIn', done => {
    chai
      .request(server)
      .get('/api/auth/signIn?email=vova@yandex.ru&password=1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        server.close();
        done();
      });
  });
});
