const express = require('express');
const router = express.Router();
const { executeQuery } = require('../../database/connection');

// GET /api/consents - Obtener consentimientos
router.get('/', async (req, res) => {
  try {
    const consents = await executeQuery(`
      SELECT cc.*, au.country, au.device_type 
      FROM cookie_consents cc 
      LEFT JOIN anonymous_users au ON cc.user_cookie_id = au.cookie_id 
      ORDER BY cc.timestamp DESC
    `);
    res.json({
      success: true,
      data: consents,
      count: consents.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo consentimientos',
      error: error.message
    });
  }
});

// POST /api/consents - Crear nuevo consentimiento
router.post('/', async (req, res) => {
  try {
    const { user_cookie_id, consent_type, granted } = req.body;
    
    if (!user_cookie_id || !consent_type) {
      return res.status(400).json({
        success: false,
        message: 'ID de cookie y tipo de consentimiento son requeridos'
      });
    }
    
    const result = await executeQuery(
      'INSERT INTO cookie_consents (user_cookie_id, consent_type, granted) VALUES (?, ?, ?)',
      [user_cookie_id, consent_type, granted]
    );
    
    res.status(201).json({
      success: true,
      message: 'Consentimiento registrado exitosamente',
      data: { id: result.insertId, user_cookie_id, consent_type, granted }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registrando consentimiento',
      error: error.message
    });
  }
});

module.exports = router;
