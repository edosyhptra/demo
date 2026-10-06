const request = require('supertest');
const { app, decideCreditBand } = require('../src/server');

describe('baseline behaviour', () => {
  it('exposes a health endpoint', async () => {
    await request(app).get('/health').expect(200, { status: 'ok' });
  });

  it('calculates an A credit band for the supplied demo scenario', () => {
    expect(decideCreditBand(11000000, 500000, 'permanent', 30, 800)).toBe('A');
  });
});
