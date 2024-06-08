import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { compile, render, renderFile } from 'ejs';
import { readFile, writeFile } from 'fs/promises';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Define a type for business data
interface BusinessData {
    shopName: string;
    description: string;
    location: string;
    reviewers: { name: string; review: string; }[];
    contacts: { phone: string; email: string; };
}

interface RequestBody {
    shopName: string;
    description: string;
    location: string;
    reviewers: string;
    'contacts.phone': string;
    'contacts.email': string;
    template: string;
    sections: string[];
}

// Sample business data
const sampleBusinessData: BusinessData = {
    shopName: 'The Coffee House',
    description: 'A cozy place to enjoy your favorite coffee.',
    location: '123 Java Street, Caffeine City',
    reviewers: [
        { name: 'John Doe', review: 'Great coffee and atmosphere!' },
        { name: 'Jane Smith', review: 'A perfect place to relax and work.' }
    ],
    contacts: {
        phone: '123-456-7890',
        email: 'info@coffeehouse.com'
    }
};

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate', (req, res) => {
    const businessData: BusinessData = {
        shopName: req.body.shopName || sampleBusinessData.shopName,
        description: req.body.description || sampleBusinessData.description,
        location: req.body.location || sampleBusinessData.location,
        reviewers: JSON.parse(req.body.reviewers || JSON.stringify(sampleBusinessData.reviewers)),
        contacts: {
            phone: req.body['contacts.phone'] || sampleBusinessData.contacts.phone,
            email: req.body['contacts.email'] || sampleBusinessData.contacts.email
        }
    };

    const sections = req.body.sections || ['section1', 'section2'];
    const templatePath = path.join(__dirname, 'templates', `template1/index`);

    res.render(templatePath, { business: businessData, sections: sections });
});

app.get('/publish', async (req, res) => {
  const businessData: BusinessData = {
      shopName: req.body.shopName || sampleBusinessData.shopName,
      description: req.body.description || sampleBusinessData.description,
      location: req.body.location || sampleBusinessData.location,
      reviewers: JSON.parse(req.body.reviewers || JSON.stringify(sampleBusinessData.reviewers)),
      contacts: {
          phone: req.body['contacts.phone'] || sampleBusinessData.contacts.phone,
          email: req.body['contacts.email'] || sampleBusinessData.contacts.email
      }
  };

  const output = path.join(__dirname, 'output');
  const templatePath = path.join(__dirname, 'templates', `template1/index.ejs`);
  console.log('templatePath', templatePath);
  renderFile(templatePath, { business: businessData }, async (error, html) => {
    if (error) {
      res.status(500).send({
        message: error
      });
      return;
    }
    await writeFile(`the-coffee-house.html`, html, {
      encoding: 'utf-8'
    });
    res.json({
      html,
    });
  });
  // const html = template({ business: businessData });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
