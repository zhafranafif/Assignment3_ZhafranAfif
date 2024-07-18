// __tests__/phonebook.test.js
const Request = require('supertest');
const TestHelper = require('../../../server/helpers/TestHelper');
const phonebook = require('../../../server/api/phonebook');
const Database = require('../../../server/services/Database');

let server;
describe('Phonebook', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/v1/phonebook', phonebook);
  });

  afterAll(async () => {
    await server.close();
  });

  test('should return 200 and phonebook list, when get list phonebook', async () => {
    const mockPhonebookList = [
      { id: 1, name: 'Nabhan XL', number: '+62818666040' },
      { id: 2, name: 'Nabhan TSEL', number: '+6281229743370' }
    ];
    jest.spyOn(Database, 'getListPhonebook').mockResolvedValue(mockPhonebookList);

    const response = await Request(server).get('/api/v1/phonebook');
    expect(response.status).toBe(200);
  });

  test('should return 404 when phonebook not found', async () => {
    jest.spyOn(Database, 'getListPhonebook').mockResolvedValue([]);

    const response = await Request(server).get('/api/v1/phonebook');
    expect(response.status).toBe(404);
  });
});
