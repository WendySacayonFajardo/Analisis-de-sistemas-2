const express = require('express');
const router = express.Router();
const { executeQuery } = require('../../database/connection');

// GET /api/campaigns - Obtener todas las campañas
router.get('/', async (req, res) => {
  try {
    const campaigns = await executeQuery(`
      SELECT c.*, a.name as advertiser_name 
      FROM campaigns c 
      LEFT JOIN advertisers a ON c.advertiser_id = a.id 
      ORDER BY c.created_at DESC
    `);
    res.json({
      success: true,
      data: campaigns,
      count: campaigns.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo campañas',
      error: error.message
    });
  }
});

// POST /api/campaigns - Crear nueva campaña
router.post('/', async (req, res) => {
  try {
    const { advertiser_id, name, description, budget, start_date, end_date, target_country } = req.body;
    
    if (!advertiser_id || !name || !budget) {
      return res.status(400).json({
        success: false,
        message: 'ID del anunciante, nombre y presupuesto son requeridos'
      });
    }
    
    const result = await executeQuery(
      'INSERT INTO campaigns (advertiser_id, name, description, budget, start_date, end_date, target_country) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [advertiser_id, name, description, budget, start_date, end_date, target_country]
    );
    
    res.status(201).json({
      success: true,
      message: 'Campaña creada exitosamente',
      data: { id: result.insertId, name, budget }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creando campaña',
      error: error.message
    });
  }
});

module.exports = router;
