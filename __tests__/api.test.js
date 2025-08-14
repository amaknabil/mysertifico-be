// Import Supertest for making HTTP requests to our Express app
const request = require('supertest');

// --- Corrected Path ---
// We now require the files with the correct names.
const logosRouter = require('../routes/logo.route');
const templatesRouter = require('../routes/template.route');

// Import Express to create a mock application for testing
const express = require('express');

// --- Corrected Step 2: Define and Mock the Controllers ---
jest.mock('../controllers/logo.controller', () => ({
  getAllLogos: jest.fn((req, res) => res.status(200).json({ mock: 'logos' })),
  createLogo: jest.fn((req, res) => res.status(201).json({ mock: 'new logo' })),
  getLogoById: jest.fn((req, res) => res.status(200).json({ mock: 'single logo' })),
  updateLogo: jest.fn((req, res) => res.status(200).json({ mock: 'updated logo' })),
  deleteLogo: jest.fn((req, res) => res.status(204).send()),
}));

jest.mock('../controllers/template.controller', () => ({
  getAllTemplates: jest.fn((req, res) => res.status(200).json({ mock: 'templates' })),
  countAllTemplates: jest.fn((req, res) => res.status(200).json({ count: 10 })),
  createTemplate: jest.fn((req, res) => res.status(201).json({ mock: 'new template' })),
  getTemplateById: jest.fn((req, res) => res.status(200).json({ mock: 'single template' })),
  updateTemplate: jest.fn((req, res) => res.status(200).json({ mock: 'updated template' })),
  deleteTemplate: jest.fn((req, res) => res.status(204).send()),
}));

// --- Step 3: Create a Mock Express App ---
const app = express();
app.use(express.json()); // Needed to parse JSON body
app.use('/logos', logosRouter);
app.use('/templates', templatesRouter);

// --- Step 4: Write the Test Files ---
describe('API Router Tests', () => {

  // A "beforeEach" hook to reset the mock functions before each test
  beforeEach(() => {
    // We can now access the mock functions from the require cache
    // since they are defined inside the jest.mock calls.
    require('../controllers/logo.controller').getAllLogos.mockClear();
    require('../controllers/logo.controller').createLogo.mockClear();
    require('../controllers/logo.controller').getLogoById.mockClear();
    require('../controllers/logo.controller').updateLogo.mockClear();
    require('../controllers/logo.controller').deleteLogo.mockClear();
    
    require('../controllers/template.controller').getAllTemplates.mockClear();
    require('../controllers/template.controller').countAllTemplates.mockClear();
    require('../controllers/template.controller').createTemplate.mockClear();
    require('../controllers/template.controller').getTemplateById.mockClear();
    require('../controllers/template.controller').updateTemplate.mockClear();
    require('../controllers/template.controller').deleteTemplate.mockClear();
  });

  // --- Tests for the Logos Router ---
  describe('Logos Router', () => {

    it('should call logosController.getAllLogos on GET /logos', async () => {
      const { getAllLogos } = require('../controllers/logo.controller');
      await request(app).get('/logos').expect(200);
      expect(getAllLogos).toHaveBeenCalledTimes(1);
    });

    it('should call logosController.getAllLogos with pagination queries on GET /logos', async () => {
      const { getAllLogos } = require('../controllers/logo.controller');
      await request(app).get('/logos?page=2&limit=10').expect(200);
      expect(getAllLogos).toHaveBeenCalledTimes(1);
    });

    it('should call logosController.createLogo on POST /logos', async () => {
      const { createLogo } = require('../controllers/logo.controller');
      const newLogo = { name: 'Test Logo', url: 'http://test.com/logo.png' };
      await request(app).post('/logos').send(newLogo).expect(201);
      expect(createLogo).toHaveBeenCalledTimes(1);
    });

    it('should call logosController.getLogoById on GET /logos/:id', async () => {
      const { getLogoById } = require('../controllers/logo.controller');
      const logoId = '12345';
      await request(app).get(`/logos/${logoId}`).expect(200);
      expect(getLogoById).toHaveBeenCalledTimes(1);
    });

    it('should call logosController.updateLogo on PATCH /logos/:id', async () => {
      const { updateLogo } = require('../controllers/logo.controller');
      const logoId = '12345';
      const updatedData = { name: 'Updated Logo' };
      await request(app).patch(`/logos/${logoId}`).send(updatedData).expect(200);
      expect(updateLogo).toHaveBeenCalledTimes(1);
    });

    it('should call logosController.deleteLogo on DELETE /logos/:id', async () => {
      const { deleteLogo } = require('../controllers/logo.controller');
      const logoId = '12345';
      await request(app).delete(`/logos/${logoId}`).expect(204);
      expect(deleteLogo).toHaveBeenCalledTimes(1);
    });
  });

  // --- Tests for the Templates Router ---
  describe('Templates Router', () => {

    it('should call templateController.getAllTemplates on GET /templates', async () => {
      const { getAllTemplates } = require('../controllers/template.controller');
      await request(app).get('/templates').expect(200);
      expect(getAllTemplates).toHaveBeenCalledTimes(1);
    });

    it('should call templateController.getAllTemplates with search query on GET /templates', async () => {
      const { getAllTemplates } = require('../controllers/template.controller');
      await request(app).get('/templates?search=corporate').expect(200);
      expect(getAllTemplates).toHaveBeenCalledTimes(1);
    });

    it('should call templateController.countAllTemplates on GET /templates/count', async () => {
      const { countAllTemplates } = require('../controllers/template.controller');
      await request(app).get('/templates/count').expect(200);
      expect(countAllTemplates).toHaveBeenCalledTimes(1);
    });

    it('should call templateController.createTemplate on POST /templates', async () => {
      const { createTemplate } = require('../controllers/template.controller');
      const newTemplate = { name: 'Test Template' };
      await request(app).post('/templates').send(newTemplate).expect(201);
      expect(createTemplate).toHaveBeenCalledTimes(1);
    });

    it('should call templateController.getTemplateById on GET /templates/:id', async () => {
      const { getTemplateById } = require('../controllers/template.controller');
      const templateId = '67890';
      await request(app).get(`/templates/${templateId}`).expect(200);
      expect(getTemplateById).toHaveBeenCalledTimes(1);
    });

    it('should call templateController.updateTemplate on PATCH /templates/:id', async () => {
      const { updateTemplate } = require('../controllers/template.controller');
      const templateId = '67890';
      const updatedData = { name: 'Updated Template' };
      await request(app).patch(`/templates/${templateId}`).send(updatedData).expect(200);
      expect(updateTemplate).toHaveBeenCalledTimes(1);
    });

    it('should call templateController.deleteTemplate on DELETE /templates/:id', async () => {
      const { deleteTemplate } = require('../controllers/template.controller');
      const templateId = '67890';
      await request(app).delete(`/templates/${templateId}`).expect(204);
      expect(deleteTemplate).toHaveBeenCalledTimes(1);
    });
  });
});
