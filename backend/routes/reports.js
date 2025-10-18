const express = require('express');
const router = express.Router();
const { executeQuery } = require('../../database/connection');

// GET /api/reports - Obtener reportes
router.get('/', async (req, res) => {
  try {
    const reports = await executeQuery(`
      SELECT * FROM campaign_performance 
      ORDER BY total_impressions DESC
    `);
    res.json({
      success: true,
      data: reports,
      count: reports.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo reportes',
      error: error.message
    });
  }
});

// GET /api/reports/daily - Obtener reportes diarios
router.get('/daily', async (req, res) => {
  try {
    const { date } = req.query;
    const query = date 
      ? 'SELECT * FROM daily_reports WHERE report_date = ?'
      : 'SELECT * FROM daily_reports ORDER BY report_date DESC LIMIT 30';
    
    const params = date ? [date] : [];
    const reports = await executeQuery(query, params);
    
    res.json({
      success: true,
      data: reports,
      count: reports.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo reportes diarios',
      error: error.message
    });
  }
});

module.exports = router;
