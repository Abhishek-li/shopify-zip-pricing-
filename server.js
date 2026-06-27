const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const ZIP_PRICING = {
  '75028': { price: 1499, label: 'Dallas, TX' },
  '10001': { price: 1699, label: 'New York, NY' },
  '90210': { price: 1799, label: 'Beverly Hills, CA' },
};

const DEFAULT_PRICE = 1599;

app.post('/api/price', (req, res) => {
  const { zip, productId } = req.body;

  if (!zip || zip.length !== 5 || !/^\d+$/.test(zip)) {
    return res.status(400).json({ error: 'Invalid ZIP code' });
  }

  const rule = ZIP_PRICING[zip];
  const price = rule ? rule.price : DEFAULT_PRICE;
  const location = rule ? rule.label : 'Your Area';

  return res.json({
    zip,
    productId,
    price,
    currency: 'USD',
    location,
    message: `Price for ${location}: $${price.toLocaleString()}`
  });
});

app.get('/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
