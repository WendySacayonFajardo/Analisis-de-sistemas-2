const express = require('express');
const router = express.Router();
const { executeQuery } = require('../../database/connection');

// GET /api/advertisers - Obtener todos los anunciantes
router.get('/', async (req, res) => {
  try {
    const advertisers = await executeQuery('SELECT * FROM advertisers ORDER BY created_at DESC');
    res.json({
      success: true,
      data: advertisers,
      count: advertisers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo anunciantes',
      error: error.message
    });
  }
});

// GET /api/advertisers/:id - Obtener anunciante por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const advertiser = await executeQuery('SELECT * FROM advertisers WHERE id = ?', [id]);
    
    if (advertiser.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Anunciante no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: advertiser[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo anunciante',
      error: error.message
    });
  }
});

// POST /api/advertisers - Crear nuevo anunciante
router.post('/', async (req, res) => {
  try {
    const { name, email, company, phone } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y email son requeridos'
      });
    }
    
    const result = await executeQuery(
      'INSERT INTO advertisers (name, email, company, phone) VALUES (?, ?, ?, ?)',
      [name, email, company, phone]
    );
    
    res.status(201).json({
      success: true,
      message: 'Anunciante creado exitosamente',
      data: { id: result.insertId, name, email, company, phone }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creando anunciante',
      error: error.message
    });
  }
});

// PUT /api/advertisers/:id - Actualizar anunciante
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, company, phone, status } = req.body;
    
    const result = await executeQuery(
      'UPDATE advertisers SET name = ?, email = ?, company = ?, phone = ?, status = ? WHERE id = ?',
      [name, email, company, phone, status, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Anunciante no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Anunciante actualizado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error actualizando anunciante',
      error: error.message
    });
  }
});

// DELETE /api/advertisers/:id - Eliminar anunciante
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await executeQuery('DELETE FROM advertisers WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Anunciante no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Anunciante eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error eliminando anunciante',
      error: error.message
    });
  }
});

module.exports = router;
