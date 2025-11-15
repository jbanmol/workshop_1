const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to verify a license token
app.post('/api/verify-license', (req, res) => {
  const { token } = req.body;
  // TODO: Implement JWT validation and check against the database
  console.log(`Verifying token: ${token}`);
  // Placeholder response
  res.json({ valid: true, message: 'License is valid.' });
});

// Endpoint to serve the latest premium filter lists
app.get('/api/filters/latest', (req, res) => {
  // TODO: Implement logic to serve filters from a database or file store
  console.log('Serving latest premium filters.');
  // Placeholder response
  res.json({
    version: '1.1.0',
    filters: [
      {
        "priority": 1,
        "action": { "type": "block" },
        "condition": {
          "urlFilter": "||some-premium-tracker.com^",
          "resourceTypes": ["script"]
        }
      }
    ]
  });
});

// Webhook endpoint for Stripe subscription events
app.post('/webhook/stripe', (req, res) => {
  const event = req.body;
  // TODO: Implement Stripe webhook signature verification
  console.log('Received Stripe event:', event.type);
  // Handle events like checkout.session.completed, customer.subscription.deleted, etc.
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`CleanBrowse backend listening at http://localhost:${port}`);
});
