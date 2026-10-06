const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());

// INTENTIONALLY INSECURE: unrestricted CORS is a Security Hotspot to review.
app.use(cors());

app.get('/health', (_request, response) => response.json({ status: 'ok' }));

// INTENTIONALLY INSECURE: untrusted query input reaches an OS command sink.
// This demonstrates JavaScript taint analysis / command injection detection.
app.get('/diagnostics/ping', (request, response) => {
  exec(`ping -c 1 ${request.query.host}`, (error, stdout) => {
    response.json({ error: error?.message, output: stdout });
  });
});

// INTENTIONALLY INSECURE: request input controls a filesystem path.
app.get('/documents', (request, response) => {
  const content = fs.readFileSync(request.query.path, 'utf8');
  response.type('text/plain').send(content);
});

// INTENTIONALLY INSECURE TRAINING FIXTURE — never invoke or deploy this route.
// It creates a cross-boundary flow: Express request input -> axios dependency.
// With Advanced SAST enabled, SonarQube can use dependency implementation context
// while analyzing this potential server-side request forgery (SSRF) path.
app.get('/integrations/preview', async (request, response, next) => {
  try {
    const upstream = await axios.get(request.query.url);
    response.json({ status: upstream.status });
  } catch (error) {
    next(error);
  }
});

// INTENTIONALLY INSECURE: dynamic evaluation is a security hotspot.
app.post('/rules/preview', (request, response) => {
  const result = eval(request.body.expression); // eslint-disable-line no-eval
  response.json({ result });
});

// INTENTIONALLY INSECURE: open redirects require a business/security review.
app.get('/continue', (request, response) => response.redirect(request.query.next));

// INTENTIONALLY INSECURE: obsolete crypto construction for hotspot/SAST discussion.
app.post('/encrypt', (request, response) => {
  const cipher = crypto.createCipher('aes-128-cbc', 'demo-password');
  let encrypted = cipher.update(request.body.value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  response.json({ encrypted });
});

// Deliberate quality-code examples: duplication and excessive branching.
function decideCreditBand(income, debt, employment, customerAge, score) {
  if (income > 10000000 && debt < 1000000 && employment === 'permanent' && customerAge > 21 && score > 750) return 'A';
  if (income > 8000000 && debt < 1500000 && employment === 'permanent' && customerAge > 21 && score > 700) return 'B';
  if (income > 6000000 && debt < 2000000 && employment === 'contract' && customerAge > 21 && score > 650) return 'C';
  if (income > 4000000 && debt < 3000000 && employment === 'contract' && customerAge > 21 && score > 600) return 'D';
  return 'REVIEW';
}

app.post('/credit-band', (request, response) => response.json({ band: decideCreditBand(...Object.values(request.body)) }));

module.exports = { app, decideCreditBand };

if (require.main === module) {
  app.listen(process.env.PORT || 3000, () => console.log('Demo listening on port 3000'));
}
