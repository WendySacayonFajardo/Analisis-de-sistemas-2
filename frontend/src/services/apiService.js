// Servicio para conectar con el backend
const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  // Método genérico para hacer requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }
      
      return data;
    } catch (error) {
      console.error('Error en API request:', error);
      throw error;
    }
  }

  // Test de conexión
  async testConnection() {
    return this.request('/test');
  }

  // Anunciantes
  async getAdvertisers() {
    return this.request('/advertisers');
  }

  async createAdvertiser(advertiserData) {
    return this.request('/advertisers', {
      method: 'POST',
      body: JSON.stringify(advertiserData),
    });
  }

  // Campañas
  async getCampaigns() {
    return this.request('/campaigns');
  }

  async createCampaign(campaignData) {
    return this.request('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
  }

  // Anuncios
  async getAds() {
    return this.request('/ads');
  }

  async createAd(adData) {
    return this.request('/ads', {
      method: 'POST',
      body: JSON.stringify(adData),
    });
  }

  // Sitios web
  async getWebsites() {
    return this.request('/websites');
  }

  async createWebsite(websiteData) {
    return this.request('/websites', {
      method: 'POST',
      body: JSON.stringify(websiteData),
    });
  }

  // Reportes
  async getReports() {
    return this.request('/reports');
  }

  async getDailyReports(date) {
    const endpoint = date ? `/reports/daily?date=${date}` : '/reports/daily';
    return this.request(endpoint);
  }

  // Consentimientos
  async getConsents() {
    return this.request('/consents');
  }

  async createConsent(consentData) {
    return this.request('/consents', {
      method: 'POST',
      body: JSON.stringify(consentData),
    });
  }
}

// Crear instancia única
const apiService = new ApiService();

export default apiService;
