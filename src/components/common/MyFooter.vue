<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Sección ¿QUÉ HACEMOS? -->
        <div class="footer-section">
          <h3 class="footer-title">¿QUÉ HACEMOS?</h3>
          <ul class="footer-links">
            <li>
              <a href="#" class="footer-link">Servicios de Internet</a>
            </li>
            <li>
              <a href="#" class="footer-link">Telecomunicaciones</a>
            </li>
            <li>
              <a href="#" class="footer-link">Soluciones empresariales</a>
            </li>
            <li><a href="#" class="footer-link">Soporte técnico</a></li>
            <li><a href="#" class="footer-link">Consultoría IT</a></li>
          </ul>
        </div>

        <!-- Sección SÍGUENOS EN REDES -->
        <div class="footer-section footer-center">
          <h3 class="footer-title">SÍGUENOS EN REDES</h3>
          <div class="social-links">
            <a href="#" class="social-link">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.759 2.893c-.274 1.035-1.004 2.314-1.504 3.117.847.262 1.735.403 2.663.403 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"
                />
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.759 2.893c-.274 1.035-1.004 2.314-1.504 3.117.847.262 1.735.403 2.663.403 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"
                />
              </svg>
            </a>
          </div>

          <!-- Logo Noretel centrado y más grande -->
          <div class="footer-logo">
            <img src="/img/Bolante2.png" alt="Noretel Logo" />
          </div>
        </div>

        <!-- Sección ¿NOS CUENTAS TU PROYECTO? -->
        <div class="footer-section">
          <h3 class="footer-title">¿NOS CUENTAS TU PROYECTO?</h3>
          <div class="contact-info">
            <p><strong>Noretel:</strong> Soluciones de Internet y Telecomunicaciones</p>
            <p>Prolongación Calle. Perú N° 6, San Jeronimo</p>
            <p><strong>Tel:</strong> 974549259</p>
            <p><strong>Mail:</strong> noretelsur@gmail.com</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <div class="footer-bottom-links">
            <a href="#" class="footer-bottom-link">Aviso legal</a>
            <a href="#" class="footer-bottom-link">Privacidad y Cookies</a>
          </div>
          <div class="copyright">© 2024 Noretel. Todos los derechos reservados.</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterNoretel',
}
</script>

<style scoped>
.footer {
  background: var(--gradient-dark-reverse);
  color: var(--color-white);
  padding: var(--spacing-12) 0 var(--spacing-8);
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
}

.footer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><path d="M0,0 L100,100 M0,20 L80,100 M0,40 L60,100 M0,60 L40,100 M0,80 L20,100 M20,0 L100,80 M40,0 L100,60 M60,0 L100,40 M80,0 L100,20" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></svg>');
  opacity: 0.05;
  pointer-events: none;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-8);
  position: relative;
  z-index: 1;
}

.footer-section {
  padding: var(--spacing-4);
}

.footer-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-6) 0;
  color: var(--color-white);
  position: relative;
  padding-bottom: var(--spacing-3);
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background: var(--gradient-primary);
}

.footer-center .footer-title::after {
  left: 50%;
  transform: translateX(-50%);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: var(--spacing-3);
}

.footer-link {
  color: var(--color-white);
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
  display: inline-block;
}

.footer-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gradient-primary);
  transition: width var(--transition-base);
}

.footer-link:hover {
  color: var(--color-yellow);
}

.footer-link:hover::before {
  width: 100%;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  transform: scale(0);
  transition: transform var(--transition-base);
}

.social-link:hover::before {
  transform: scale(1);
}

.social-link:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.social-icon {
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 1;
}

.footer-logo {
  margin-top: var(--spacing-4);
}

.footer-logo img {
  height: 80px;
  width: auto;
  transition: all var(--transition-base);
}

.footer-logo img:hover {
  transform: scale(1.05);
}

.contact-info {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.contact-info p {
  margin-bottom: var(--spacing-2);
}

.contact-info strong {
  color: var(--color-yellow);
}

.footer-bottom {
  background: rgba(0, 0, 0, 0.2);
  padding: var(--spacing-6) 0;
  margin-top: var(--spacing-8);
  position: relative;
  z-index: 1;
}

.footer-bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
}

.footer-bottom-links {
  display: flex;
  gap: var(--spacing-6);
}

.footer-bottom-link {
  color: var(--color-white);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  position: relative;
}

.footer-bottom-link::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gradient-primary);
  transition: width var(--transition-base);
}

.footer-bottom-link:hover {
  color: var(--color-yellow);
}

.footer-bottom-link:hover::before {
  width: 100%;
}

.copyright {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
}

@media (min-width: 768px) {
  .footer-bottom-content {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
