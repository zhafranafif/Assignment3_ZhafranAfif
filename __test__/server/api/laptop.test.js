// __tests__/phonebook.test.js
const Request = require('supertest');
const TestHelper = require('../../../server/helpers/TestHelper');
const laptop = require('../../../server/api/laptop');
const Database = require('../../../server/services/Database');
const Prisma = require('../../../server/services/Prisma');

let server;
describe('Laptop', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api', laptop);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('API V1 Query Database', () => {
    describe('GET /v1/laptop', () => {
      it('should return 200 and laptop list, when get list laptop', async () => {
        const mockLaptopList = [
          { id: 1, name: 'Titan 18 HX A14VX', price: 3000000, stock: 10, brand_id: 1 },
          { id: 2, name: 'MSI Bravo 15', price: 9000000, stock: 20, brand_id: 1 }
        ];
        jest.spyOn(Database, 'getListLaptop').mockResolvedValue(mockLaptopList);

        const response = await Request(server).get('/api/v1/laptop');
        expect(response.status).toBe(200);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(Database, 'getListLaptop').mockResolvedValue([]);
        const response = await Request(server).get('/api/v1/laptop');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'getListLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/v1/laptop');
        expect(response.status).toBe(500);
      });
    });

    describe('POST /v1/laptop', () => {
      it('should return 200 and success message, when add laptop', async () => {
        jest.spyOn(Database, 'addLaptop').mockResolvedValue('success');
        const response = await Request(server).post('/api/v1/laptop').send({
          name: 'Titan 18 HX A14VX',
          price: 3000000,
          stock: 10,
          brand_id: 1
        });
        expect(response.status).toBe(200);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'addLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).post('/api/v1/laptop').send({
          name: 'Titan 18 HX A14VX',
          price: 3000000,
          stock: 10,
          brand_id: 1
        });
        expect(response.status).toBe(500);
      });
    });

    describe('PUT /v1/laptop/:id', () => {
      it('should return 200 and success message, when edit laptop', async () => {
        jest
          .spyOn(Database, 'editLaptop')
          .mockResolvedValue({ name: 'Titan 18 HX A14VX', price: 3000000, stock: 10, brand_id: 1 });
        const response = await Request(server).put('/api/v1/laptop/1').send({
          name: 'Titan 18 HX A14VX',
          price: 6000000,
          stock: 20,
          brand_id: 1
        });
        expect(response.status).toBe(200);
      });

      it('should return 400 and success message, incorrect body', async () => {
        const response = await Request(server).put('/api/v1/laptop/1').send({
          name: 1,
          price: 6000000,
          stock: 20,
          brand_id: 1
        });
        expect(response.status).toBe(400);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(Database, 'editLaptop').mockResolvedValue(false);
        const response = await Request(server).put('/api/v1/laptop/1').send({
          name: 'Titan 18 HX A14VX',
          price: 6000000,
          stock: 20,
          brand_id: 1
        });
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'editLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).put('/api/v1/laptop/1').send({
          name: 'Titan 18 HX A14VX',
          price: 6000000,
          stock: 20,
          brand_id: 1
        });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /v1/laptop/:id', () => {
      it('should return 200 and success message, when delete laptop', async () => {
        jest.spyOn(Database, 'deleteLaptop').mockResolvedValue({ id: 1 });
        const response = await Request(server).delete('/api/v1/laptop/1');
        expect(response.status).toBe(200);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(Database, 'deleteLaptop').mockResolvedValue(false);
        const response = await Request(server).delete('/api/v1/laptop/1');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'deleteLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).delete('/api/v1/laptop/1');
        expect(response.status).toBe(500);
      });
    });
  });

  describe('APi V2 ORM', () => {
    describe('GET /v2/laptop', () => {
      it('should return 200 and laptop list, when get list laptop', async () => {
        const mockPhonebookList = [
          { id: 1, name: 'Titan 18 HX A14VX', price: 3000000, stock: 10, brand_id: 1 },
          { id: 2, name: 'MSI Bravo 15', price: 9000000, stock: 20, brand_id: 1 }
        ];
        jest.spyOn(Prisma, 'getListLaptopV2').mockResolvedValue(mockPhonebookList);

        const response = await Request(server).get('/api/v2/laptop');
        expect(response.status).toBe(200);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(Prisma, 'getListLaptopV2').mockResolvedValue([]);
        const response = await Request(server).get('/api/v2/laptop');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'getListLaptopV2').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/v2/laptop');
        expect(response.status).toBe(500);
      });
    });

    describe('POST /v2/laptop', () => {
      it('should return 200 and success message, when add laptop', async () => {
        jest.spyOn(Prisma, 'addLaptopV2').mockResolvedValue('success');
        const response = await Request(server).post('/api/v2/laptop').send({
          name: 'Titan 18 HX A14VX',
          price: 3000000,
          stock: 10,
          brand_id: 1
        });
        expect(response.status).toBe(200);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'addLaptopV2').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).post('/api/v2/laptop').send({
          name: 'Titan 18 HX A14VX',
          price: 3000000,
          stock: 10,
          brand_id: 1
        });
        expect(response.status).toBe(500);
      });
    });

    describe('PUT /v2/laptop/:id', () => {
      it('should return 200 and success message, when edit laptop', async () => {
        jest
          .spyOn(Prisma, 'editLaptopV2')
          .mockResolvedValue({ id: 1, name: 'Titan 18 HX A14VX', price: 3000000, stock: 10, brand_id: 1 });
        const response = await Request(server).put('/api/v2/laptop/1').send({
          name: 'Titan 18 HX A14VX',
          price: 6000000,
          stock: 20,
          brand_id: 1
        });
        expect(response.status).toBe(200);
      });

      it('should return 400 and success message, incorrect body', async () => {
        const response = await Request(server).put('/api/v2/laptop/1').send({
          name: 1,
          price: 3000000,
          stock: 10,
          brand_id: 1
        });
        expect(response.status).toBe(400);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(Prisma, 'editLaptopV2').mockResolvedValue(false);
        const response = await Request(server).put('/api/v2/laptop/1').send({
          name: 'Titan 18 HX A14VX',
          price: 3000000,
          stock: 10,
          brand_id: 1
        });
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'editLaptopV2').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).put('/api/v2/laptop/1').send({
          name: 'Titan 18 HX A14VX',
          price: 3000000,
          stock: 10,
          brand_id: 1
        });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /v2/laptop/:id', () => {
      it('should return 200 and success message, when delete laptop', async () => {
        jest.spyOn(Prisma, 'deleteLaptopV2').mockResolvedValue({ id: 1 });
        const response = await Request(server).delete('/api/v2/laptop/1');
        expect(response.status).toBe(200);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(Prisma, 'deleteLaptopV2').mockResolvedValue(false);
        const response = await Request(server).delete('/api/v2/laptop/1');
        expect(response.status).toBe(404);
      });

      it('should return 400 when invalid id', async () => {
        jest.spyOn(Prisma, 'deleteLaptopV2').mockResolvedValue(false);
        const response = await Request(server).delete('/api/v2/laptop/satu');
        expect(response.status).toBe(400);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'deleteLaptopV2').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).delete('/api/v2/laptop/1');
        expect(response.status).toBe(500);
      });
    });
  });
});
