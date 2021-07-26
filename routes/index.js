const express = require('express');
const router = express.Router();
const guitarController = require('../controllers/guitarController');
const sessionController = require('../controllers/sessionController');
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });

//npm i swagger-jsdoc swagger-ui-express
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API for Guitar Store 2.0',
      descrition: 'Test of the use of swagger for openapi-validator',
      contact: { name: 'Ian' },
      servers: ['http://localhost:3000/'],
    },
  },
  apis: ['./routes/index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.get('/', (req, res) => {
  res.render('index', { title: 'Guitar store 2.0' });
});

/**
 * @swagger
 * /guitars:
 *  get:
 *    description: Use to request a list of all guitars
 *    responses:
 *    '200':
 *      description: Success!
 */

router.get('/guitars', (req, res) => {
  let user;

  const listGuitars = guitarController.compileListOfGuitars();

  let mySession = sessionController.getSession(req.cookies.IDsession);
  // passando para get session
  // console.log(req.cookies)

  user = mySession.user;


  res.render('listGuitars', { listGuitars, user });
});

router.post('/guitarSelection', (req, res) => {
  const { id } = req.body;

  console.log(req.body);
  const guitar = guitarController.findById(id);

  res.render('guitarSelection', guitar);
});

router.get('/guitars/add', (req, res) => {
  res.render('addGuitar');
});

/**
 * @swagger
 * /guitars/add:
 *  post:
 *    description: Use to add a new guitar
 *    responses:
 *      '200':
 *        description: Success!
 */

router.post('/guitars/add', (req, res) => {
  const { maker, model, year, price, stock } = req.body;

  guitarController.addGuitar(maker, model, year, price, stock);

  res.redirect('/guitars');
});

router.post('/guitars/import', upload.single('file'), (req, res) => {
  guitarController.importGuitars(req.file.path);
  res.redirect('/guitars');
});

module.exports = router;
