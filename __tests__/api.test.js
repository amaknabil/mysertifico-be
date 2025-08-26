const request = require('supertest');
const express = require('express');

const logosRouter = require('../routes/logo.route');
const templatesRouter = require('../routes/template.route');
const myprofileRouter = require('../routes/myprofile.route');

// Mock all controllers used in the test file
jest.mock('../controllers/logo.controller', () => ({
  getAllLogos: jest.fn((req, res) => res.status(200).json({ mock: 'logos' })),
  createLogo: jest.fn((req, res) => res.status(201).json({ mock: 'new logo' })),
  getLogoById: jest.fn((req, res) => res.status(200).json({ mock: 'single logo' })),
  updateLogo: jest.fn((req, res) => res.status(200).json({ mock: 'updated logo' })),
  deleteLogo: jest.fn((req, res) => res.status(204).send()),
  getLogoByName: jest.fn((req, res) => res.status(200).json({ mock: 'searched logo' })),
}));

jest.mock('../controllers/template.controller', () => ({
  getAllTemplates: jest.fn((req, res) => res.status(200).json({ mock: 'templates' })),
  countAllTemplates: jest.fn((req, res) => res.status(200).json({ count: 10 })),
  createTemplate: jest.fn((req, res) => res.status(201).json({ mock: 'new template' })),
  getTemplateById: jest.fn((req, res) => res.status(200).json({ mock: 'single template' })),
  updateTemplate: jest.fn((req, res) => res.status(200).json({ mock: 'updated template' })),
  deleteTemplate: jest.fn((req, res) => res.status(204).send()),
}));

jest.mock('../controllers/myprofile.controller', () => ({
  getProfile: jest.fn((req, res) => res.status(200).json({ mock: 'profile' })),
  updateProfile: jest.fn((req, res) => res.status(200).json({ mock: 'updated profile' })),
  uploadProfilePicture: jest.fn((req, res) => res.status(200).json({ mock: 'profile picture uploaded' })),
}));

// Mock the authentication and upload middleware to allow tests to run
jest.mock('../middleware/auth.middleware', () => ({
  authMiddleware: (req, res, next) => {
    req.user = { id: 'mock-user-id' };
    next();
  },
}));

jest.mock('../middleware/upload.middleware', () => ({
  single: () => (req, res, next) => {
    req.file = { filename: 'mock_filename.jpg' };
    next();
  },
}));

// Mock app
const app = express();
app.use(express.json());
app.use('/logos', logosRouter);
app.use('/templates', templatesRouter);
app.use('/api/myprofile', myprofileRouter);

describe('API Router Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Logos Router', () => {
    it('GET /logos calls getAllLogos', async () => {
      const { getAllLogos } = require('../controllers/logo.controller');
      await request(app).get('/logos').expect(200);
      expect(getAllLogos).toHaveBeenCalled();
    });

    it('POST /logos calls createLogo', async () => {
      const { createLogo } = require('../controllers/logo.controller');
      await request(app).post('/logos').send({}).expect(201);
      expect(createLogo).toHaveBeenCalled();
    });

    it('GET /logos/search calls getLogoByName', async () => {
      const { getLogoByName } = require('../controllers/logo.controller');
      await request(app).get('/logos/search?name=test').expect(200);
      expect(getLogoByName).toHaveBeenCalled();
    });

    it('GET /logos/:id calls getLogoById', async () => {
      const { getLogoById } = require('../controllers/logo.controller');
      await request(app).get('/logos/123').expect(200);
      expect(getLogoById).toHaveBeenCalled();
    });

    it('PATCH /logos/:id calls updateLogo', async () => {
      const { updateLogo } = require('../controllers/logo.controller');
      await request(app).patch('/logos/123').send({}).expect(200);
      expect(updateLogo).toHaveBeenCalled();
    });

    it('DELETE /logos/:id calls deleteLogo', async () => {
      const { deleteLogo } = require('../controllers/logo.controller');
      await request(app).delete('/logos/123').expect(204);
      expect(deleteLogo).toHaveBeenCalled();
    });
  });

  describe('Templates Router', () => {
    it('GET /templates calls getAllTemplates', async () => {
      const { getAllTemplates } = require('../controllers/template.controller');
      await request(app).get('/templates').expect(200);
      expect(getAllTemplates).toHaveBeenCalled();
    });

    it('GET /templates/count calls countAllTemplates', async () => {
      const { countAllTemplates } = require('../controllers/template.controller');
      await request(app).get('/templates/count').expect(200);
      expect(countAllTemplates).toHaveBeenCalled();
    });

    it('POST /templates calls createTemplate', async () => {
      const { createTemplate } = require('../controllers/template.controller');
      await request(app).post('/templates').send({}).expect(201);
      expect(createTemplate).toHaveBeenCalled();
    });

    it('GET /templates/:id calls getTemplateById', async () => {
      const { getTemplateById } = require('../controllers/template.controller');
      await request(app).get('/templates/123').expect(200);
      expect(getTemplateById).toHaveBeenCalled();
    });

    it('PATCH /templates/:id calls updateTemplate', async () => {
      const { updateTemplate } = require('../controllers/template.controller');
      await request(app).patch('/templates/123').send({}).expect(200);
      expect(updateTemplate).toHaveBeenCalled();
    });

    it('DELETE /templates/:id calls deleteTemplate', async () => {
      const { deleteTemplate } = require('../controllers/template.controller');
      await request(app).delete('/templates/123').expect(204);
      expect(deleteTemplate).toHaveBeenCalled();
    });
  });

  // Added My Profile Router tests
  describe('My Profile Router', () => {
    it('GET /api/myprofile calls getProfile', async () => {
      const { getProfile } = require('../controllers/myprofile.controller');
      // Pass a mock header to satisfy the auth middleware
      await request(app).get('/api/myprofile').set('Authorization', 'Bearer mock-token').expect(200);
      expect(getProfile).toHaveBeenCalled();
    });

    it('PATCH /api/myprofile calls updateProfile', async () => {
      const { updateProfile } = require('../controllers/myprofile.controller');
      await request(app).patch('/api/myprofile').set('Authorization', 'Bearer mock-token').send({}).expect(200);
      expect(updateProfile).toHaveBeenCalled();
    });
    
    it('POST /api/myprofile/photo calls uploadProfilePicture', async () => {
      const { uploadProfilePicture } = require('../controllers/myprofile.controller');
      // A mock file needs to be sent for the multipart/form-data request
      await request(app).post('/api/myprofile/photo').set('Authorization', 'Bearer mock-token').attach('file', Buffer.from('mock file content'), 'test.jpg').expect(200);
      expect(uploadProfilePicture).toHaveBeenCalled();
    });
  });
});