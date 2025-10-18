-- =============================================
-- LDD - DEFINICIÓN DE ESTRUCTURA
-- =============================================

-- Crear la base de datos
CREATE DATABASE doubleclick;
USE doubleclick;

-- Tabla de anunciantes
CREATE TABLE advertisers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    company VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Tabla de campañas publicitarias
CREATE TABLE campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    advertiser_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    budget DECIMAL(10,2),
    start_date DATE,
    end_date DATE,
    status ENUM('active', 'paused', 'completed', 'draft') DEFAULT 'draft',
    target_country VARCHAR(100),
    target_interests JSON,
    max_impressions INT,
    max_clicks INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (advertiser_id) REFERENCES advertisers(id) ON DELETE CASCADE
);

-- Tabla de anuncios (creativos)
CREATE TABLE ads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    target_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    width INT DEFAULT 300,
    height INT DEFAULT 250,
    format ENUM('banner', 'square', 'skyscraper') DEFAULT 'banner',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);

-- Tabla de sitios web afiliados
CREATE TABLE websites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    owner_email VARCHAR(255),
    category VARCHAR(100),
    privacy_policy_url VARCHAR(500),
    status ENUM('active', 'inactive', 'pending') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios anónimos
CREATE TABLE anonymous_users (
    cookie_id VARCHAR(255) PRIMARY KEY,
    country VARCHAR(100),
    browser VARCHAR(100),
    device_type ENUM('desktop', 'mobile', 'tablet'),
    interests JSON,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    opt_out BOOLEAN DEFAULT FALSE
);

-- Tabla de impresiones
CREATE TABLE impressions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ad_id INT NOT NULL,
    website_id INT NOT NULL,
    user_cookie_id VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    page_url VARCHAR(500),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ad_id) REFERENCES ads(id),
    FOREIGN KEY (website_id) REFERENCES websites(id),
    FOREIGN KEY (user_cookie_id) REFERENCES anonymous_users(cookie_id)
);

-- Tabla de clics
CREATE TABLE clicks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    impression_id BIGINT NOT NULL,
    ad_id INT NOT NULL,
    website_id INT NOT NULL,
    user_cookie_id VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (impression_id) REFERENCES impressions(id),
    FOREIGN KEY (ad_id) REFERENCES ads(id),
    FOREIGN KEY (website_id) REFERENCES websites(id),
    FOREIGN KEY (user_cookie_id) REFERENCES anonymous_users(cookie_id)
);

-- Tabla de consentimientos de cookies
CREATE TABLE cookie_consents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_cookie_id VARCHAR(255) NOT NULL,
    consent_type ENUM('necessary', 'analytics', 'advertising') DEFAULT 'necessary',
    granted BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_cookie_id) REFERENCES anonymous_users(cookie_id)
);

-- Tabla de configuraciones del sistema
CREATE TABLE system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de reportes diarios
CREATE TABLE daily_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_date DATE NOT NULL,
    ad_id INT NOT NULL,
    website_id INT NOT NULL,
    impressions_count INT DEFAULT 0,
    clicks_count INT DEFAULT 0,
    unique_users_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ad_id) REFERENCES ads(id),
    FOREIGN KEY (website_id) REFERENCES websites(id),
    UNIQUE KEY unique_daily_report (report_date, ad_id, website_id)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_impressions_timestamp ON impressions(timestamp);
CREATE INDEX idx_impressions_user_cookie ON impressions(user_cookie_id);
CREATE INDEX idx_clicks_timestamp ON clicks(timestamp);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_ads_status ON ads(status);
CREATE INDEX idx_anonymous_users_opt_out ON anonymous_users(opt_out);
CREATE INDEX idx_daily_reports_date ON daily_reports(report_date);

-- Crear vistas
CREATE VIEW campaign_performance AS
SELECT 
    c.id as campaign_id,
    c.name as campaign_name,
    a.name as advertiser_name,
    COUNT(DISTINCT i.id) as total_impressions,
    COUNT(DISTINCT cl.id) as total_clicks,
    ROUND((COUNT(DISTINCT cl.id) / COUNT(DISTINCT i.id)) * 100, 2) as ctr
FROM campaigns c
LEFT JOIN advertisers a ON c.advertiser_id = a.id
LEFT JOIN ads ad ON ad.campaign_id = c.id
LEFT JOIN impressions i ON i.ad_id = ad.id
LEFT JOIN clicks cl ON cl.ad_id = ad.id
GROUP BY c.id, c.name, a.name;

CREATE VIEW active_user_profiles AS
SELECT 
    cookie_id,
    country,
    device_type,
    interests,
    last_seen
FROM anonymous_users 
WHERE opt_out = FALSE 
AND last_seen >= DATE_SUB(NOW(), INTERVAL 30 DAY);