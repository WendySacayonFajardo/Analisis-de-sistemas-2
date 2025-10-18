const express = require('express');
const router = express.Router();
const { executeQuery } = require('../../database/connection');

// GET /api/websites - Obtener todos los sitios web
router.get('/', async (req, res) => {
  try {
    const websites = await executeQuery('SELECT * FROM websites ORDER BY created_at DESC');
    res.json({
      success: true,
      data: websites,
      count: websites.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo sitios web',
      error: error.message
    });
  }
});

// POST /api/websites - Crear nuevo sitio web
router.post('/', async (req, res) => {
  try {
    const { domain, name, owner_email, category, privacy_policy_url } = req.body;
    
    if (!domain || !name) {
      return res.status(400).json({
        success: false,
        message: 'Dominio y nombre son requeridos'
      });
    }
    
    const result = await executeQuery(
      'INSERT INTO websites (domain, name, owner_email, category, privacy_policy_url) VALUES (?, ?, ?, ?, ?)',
      [domain, name, owner_email, category, privacy_policy_url]
    );
    
    res.status(201).json({
      success: true,
      message: 'Sitio web registrado exitosamente',
      data: { id: result.insertId, domain, name }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registrando sitio web',
      error: error.message
    });
  }
});

module.exports = router;
