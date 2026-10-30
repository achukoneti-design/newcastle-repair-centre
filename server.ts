import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { handleChatRequest } from './src/server/api.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // API Endpoints
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      workshop: 'Newcastle Repair Centre',
      location: 'Condercum Road, Newcastle upon Tyne, NE4 9XN',
      timestamp: new Date().toISOString()
    });
  });

  app.post('/api/chat', (req, res) => {
    handleChatRequest(req, res);
  });

  const mockLeads: Array<any> = [];
  app.post('/api/lead', (req, res) => {
    const { phone, name, damageType, notes } = req.body || {};
    if (!phone) {
      return res.status(400).json({ error: 'Mobile phone number is required' });
    }
    const lead = {
      id: `NRC-${Date.now().toString().slice(-5)}`,
      phone,
      name: name || 'Customer',
      damageType: damageType || 'General Bodyshop Inquiry',
      notes: notes || '',
      status: 'Pending Workshop Review',
      createdAt: new Date().toISOString()
    };
    mockLeads.push(lead);
    console.log(`[Newcastle Repair Centre] Logged lead callback for ${phone} (${lead.id})`);
    return res.json({
      success: true,
      message: 'Workshop manager callback booked successfully',
      leadId: lead.id
    });
  });

  if (!isProd) {
    // Mount Vite middlewares in development per React Guidelines
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production for Cloud Run
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Newcastle Repair Centre running on port ${PORT} [${isProd ? 'PRODUCTION' : 'DEV'}]`);
  });
}

startServer();
