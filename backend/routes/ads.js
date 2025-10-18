const express = require('express');
const router = express.Router();
const { executeQuery } = require('../../database/connection');

// GET /api/ads - Obtener todos los anuncios
router.get('/', async (req, res) => {
  try {
    const ads = await executeQuery(`
      SELECT ad.*, c.name as campaign_name, a.name as advertiser_name 
      FROM ads ad 
      LEFT JOIN campaigns c ON ad.campaign_id = c.id 
      LEFT JOIN advertisers a ON c.advertiser_id = a.id 
      ORDER BY ad.created_at DESC
    `);
    res.json({
      success: true,
      data: ads,
      count: ads.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo anuncios',
      error: error.message
    });
  }
});

// POST /api/ads - Crear nuevo anuncio
router.post('/', async (req, res) => {
  try {
    const { campaign_id, title, image_url, target_url, alt_text, width, height, format } = req.body;
    
    if (!campaign_id || !title || !target_url) {
      return res.status(400).json({
        success: false,
        message: 'ID de campaña, título y URL objetivo son requeridos'
      });
    }
    
    const result = await executeQuery(
      'INSERT INTO ads (campaign_id, title, image_url, target_url, alt_text, width, height, format) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [campaign_id, title, image_url, target_url, alt_text, width, height, format]
    );
    
    res.status(201).json({
      success: true,
      message: 'Anuncio creado exitosamente',
      data: { id: result.insertId, title, target_url }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creando anuncio',
      error: error.message
    });
  }
});

module.exports = router;
