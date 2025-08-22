const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const contactUsRouter = require('./contactUs.route');
const {authMiddleware} = require('../middleware/auth.middleware');
const appRouter = require('./app.route');
const roleRouter = require('./role.route');
const organizationRouter = require('./organization.route');
const myWallRouter = require('./mywall.route');
const boRouter = require('./bo.route');
const certificateRouter = require('./certificate.route');
const templateRouter = require('./template.route');
const logoRouter = require('./logo.route');
const myprofileRouter = require('./myprofile.route'); 
const swaggerUi = require('swagger-ui-express');
const supportRouter = require('./support.route');
const replyRouter = require('./reply.route'); 
const { swaggerSpecification } = require('../config/swagger.config');


router.use('/auth', authRouter);
router.use('/users',authMiddleware, userRouter);
router.use('/contact-us',contactUsRouter);
router.use('/apps',appRouter);
router.use('/roles', roleRouter);
router.use('/organizations', organizationRouter);
router.use('/mywall',myWallRouter);
router.use('/bo',boRouter);
router.use('/certificates',certificateRouter);
router.use('/templates', templateRouter);
router.use('/logos', logoRouter);
router.use('/support', supportRouter); 
router.use('/myprofile', myprofileRouter); 
router.use('/api/support', replyRouter);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

// Note: The two lines below for Swagger are redundant and can be simplified as one line above
// router.use('/docs',swaggerUi.serve);
// router.use('/docs',swaggerUi.setup(swaggerSpecification))

module.exports = router