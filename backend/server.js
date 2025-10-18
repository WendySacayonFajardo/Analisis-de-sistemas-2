const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { testConnection } = require('../database/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100 // límite de 100 requests por ventana
});
app.use('/api/', limiter);

// Middlewares para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/advertisers', require('./routes/advertisers'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/ads', require('./routes/ads'));
app.use('/api/websites', require('./routes/websites'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/consents', require('./routes/consents'));

// Ruta de prueba
app.get('/api/test', async (req, res) => {
  try {
    const connected = await testConnection();
    res.json({
      success: true,
      message: 'Backend funcionando correctamente',
      database: connected ? 'Conectado' : 'Desconectado',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'DoubleClick Backend',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado'
  });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend ejecutándose en puerto ${PORT}`);
  console.log(`📊 API disponible en: http://localhost:${PORT}/api`);
  console.log(`🔍 Test de conexión: http://localhost:${PORT}/api/test`);
});

module.exports = app;
