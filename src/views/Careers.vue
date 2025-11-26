<template>
  <div class="careers-page">
    <!-- Hero Section -->
    <section class="speed-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Únete al Equipo de Noretel</h1>
          <p class="hero-subtitle">
            Construye el futuro de las telecomunicaciones con nosotros. Somos una familia que valora
            el talento, la innovación y el crecimiento constante.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Join Us Section -->
    <section class="benefits-section">
      <div class="container">
        <h2 class="section-title">¿Por qué trabajar en NorEtel?</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">🚀</div>
            <h3>Crecimiento Profesional</h3>
            <p>
              Ofrecemos capacitaciones constantes y un plan de carrera claro para que puedas
              alcanzar tus metas.
            </p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🤝</div>
            <h3>Excelente Ambiente</h3>
            <p>
              Promovemos un ambiente de trabajo colaborativo, respetuoso y donde cada voz es
              escuchada.
            </p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">💰</div>
            <h3>Competitivo Salario</h3>
            <p>
              Ofrecemos una compensación justa y atractiva, acorde a tu experiencia y desempeño.
            </p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🏖️</div>
            <h3>Buenos Beneficios</h3>
            <p>
              Seguro médico, días de vacaciones flexibles y actividades team building para unirnos
              más.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Job Areas Section -->
    <section class="job-areas-section">
      <div class="container">
        <h2 class="section-title">Buscamos talento para estas áreas</h2>
        <div class="job-areas-grid">
          <div v-for="area in jobAreas" :key="area.id" class="job-card">
            <div class="job-icon">{{ area.icon }}</div>
            <h3 class="job-title">{{ area.title }}</h3>
            <p class="job-description">{{ area.description }}</p>
            <ul class="job-list">
              <li v-for="req in area.requirements" :key="req">{{ req }}</li>
            </ul>
            <button class="btn btn-outline" @click="prefillForm(area.id)">
              Aplicar a esta área
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Form Section -->
    <section id="application-form" class="application-form-section">
      <div class="container">
        <div class="form-container">
          <h2 class="section-title">Postula Ahora</h2>
          <p class="form-subtitle">
            Completa el formulario y un reclutador se pondrá en contacto contigo.
          </p>

          <div v-if="submitMessage" class="submit-message" :class="{ 'is-error': !isSuccess }">
            {{ submitMessage }}
          </div>

          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Nombre Completo *</label>
              <input type="text" id="name" v-model="formData.name" required />
            </div>
            <div class="form-group">
              <label for="email">Correo Electrónico *</label>
              <input type="email" id="email" v-model="formData.email" required />
            </div>
            <div class="form-group">
              <label for="phone">Teléfono / Celular *</label>
              <input type="tel" id="phone" v-model="formData.phone" required />
            </div>
            <div class="form-group">
              <label for="area">Área de Interés *</label>
              <select id="area" v-model="formData.area" required>
                <option value="" disabled>Selecciona un área</option>
                <option v-for="area in jobAreas" :key="area.id" :value="area.title">
                  {{ area.title }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Cuéntanos sobre ti (Adjunta tu CV o LinkedIn)</label>
              <textarea id="message" v-model="formData.message" rows="5"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block" :disabled="isSubmitting">
              <span v-if="isSubmitting">Enviando...</span>
              <span v-else>Enviar Postulación</span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Internship CTA Section -->
    <section class="internship-cta">
      <div class="container">
        <h2>¿Eres estudiante? ¡Buscamos tu talento!</h2>
        <p>
          Inicia tu carrera profesional con nosotros. Aprende, crece y contribuye en proyectos
          reales.
        </p>
        <a
          :href="whatsappInternshipLink"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-whatsapp"
        >
          Solicitar prácticas AHORA
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// --- Reactive Data ---
const isSubmitting = ref(false)
const submitMessage = ref('')
const isSuccess = ref(true)

const formData = ref({
  name: '',
  email: '',
  phone: '',
  area: '',
  message: '',
})

const jobAreas = ref([
  {
    id: 'tecnicos',
    title: 'Técnicos Instaladores',
    icon: '🛠️',
    description:
      'Eres el héroe detrás de cada conexión. Instalas y mantienes la infraestructura que nos mantiene conectados.',
    requirements: ['Experiencia en redes', 'Resolución de problemas', 'Disponibilidad de viaje'],
  },
  {
    id: 'callcenter',
    title: 'Call Center',
    icon: '📞',
    description:
      'Eres la voz de NorEtel. Ayudas a nuestros clientes con empatía y eficiencia en cada interacción.',
    requirements: ['Excelente comunicación', 'Manejo de CRM', 'Actitud proactiva'],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    icon: '📈',
    description:
      'Cuentas la historia de NorEtel. Diseñas campañas creativas que conectan con nuestra audiencia.',
    requirements: ['Experiencia en Digital Marketing', 'Análisis de datos', 'Creatividad'],
  },
  {
    id: 'ventas',
    title: 'Ventas',
    icon: '💼',
    description:
      'Eres un estratega que expande nuestro alcance. Conectas a nuevos clientes con nuestras soluciones.',
    requirements: [
      'Habilidades de negociación',
      'Orientación a resultados',
      'Experiencia en ventas B2C/B2B',
    ],
  },
  {
    id: 'it',
    title: 'Tecnologías de la Información (TI)',
    icon: '💻',
    description:
      'Mantienes nuestra operación digital funcionando sin problemas. Desde sistemas internos hasta ciberseguridad.',
    requirements: [
      'Conocimientos en redes y servidores',
      'Scripting (Python/Bash)',
      'Metodologías Agile',
    ],
  },
])

// --- Computed ---
const whatsappInternshipLink = ref(
  `https://wa.me/5198989845?text=${encodeURIComponent('Quiero las prácticas, deseo más información especializada')}`,
)

// --- Methods ---
const prefillForm = (areaId) => {
  const selectedArea = jobAreas.value.find((area) => area.id === areaId)
  if (selectedArea) {
    formData.value.area = selectedArea.title
    // Scroll to the form
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const submitForm = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  // --- SIMULACIÓN DE ENVÍO A UN BACKEND ---
  // En una aplicación real, aquí harías una llamada a tu API:
  // try {
  //   const response = await fetch('/api/careers/apply', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(formData.value)
  //   });
  //   if (!response.ok) throw new Error('Error en el servidor');
  //   isSuccess.value = true;
  //   submitMessage.value = '¡Gracias por tu postulación! Nos pondremos en contacto pronto.';
  // } catch (error) {
  //   isSuccess.value = false;
  //   submitMessage.value = 'Hubo un error al enviar tu postulación. Por favor, inténtalo de nuevo.';
  // } finally {
  //   isSubmitting.value = false;
  // }

  // Simulación para este ejemplo
  setTimeout(() => {
    console.log('Datos del formulario enviados:', formData.value)
    isSuccess.value = true
    submitMessage.value = '¡Gracias por tu postulación! Nos pondremos en contacto pronto.'

    // Reset form
    formData.value = { name: '', email: '', phone: '', area: '', message: '' }
    isSubmitting.value = false
  }, 1500)
}
</script>

<style scoped>
/* General Styles */
.careers-page {
  /* Eliminamos el padding-top para eliminar el vacío */
}

/* Hero Section con degradado verde-azul */
.speed-hero {
  background: linear-gradient(135deg, #0e7e57 0%, #0078d4 100%);
  color: white;
  padding: var(--spacing-12) 0 var(--spacing-8);
  position: relative;
  overflow: hidden;
}

.speed-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-3) 0;
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  opacity: 0.95;
  animation: fadeInUp 1s ease-out 0.3s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Benefits Section */
.benefits-section {
  padding: 4rem 1rem;
  background: var(--color-gray-50);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.benefit-card {
  background: var(--color-white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.benefit-card h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.benefit-card p {
  color: var(--color-gray-600);
}

/* Job Areas Section */
.job-areas-section {
  padding: 4rem 1rem;
}

.job-areas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.job-card {
  background: var(--color-white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
  border-top: 4px solid;
  border-image: var(--gradient-primary) 1;
}

.job-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.job-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.job-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.5rem;
  color: var(--color-gray-900);
}

.job-description {
  color: var(--color-gray-600);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.job-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.job-list li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 0.5rem;
  color: var(--color-gray-700);
}

.job-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--color-primary);
  font-weight: bold;
}

/* Application Form Section */
.application-form-section {
  padding: 4rem 1rem;
  background-color: #f9fafb;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  background: var(--color-white);
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.form-subtitle {
  text-align: center;
  color: var(--color-gray-600);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
  color: var(--color-gray-700);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-base);
  font-size: 1rem;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 153, 255, 0.1);
}

.submit-message {
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: var(--radius-base);
  text-align: center;
  font-weight: var(--font-weight-medium);
}

.submit-message:not(.is-error) {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}

.submit-message.is-error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

/* Internship CTA Section con degradado verde-azul */
.internship-cta {
  background: linear-gradient(135deg, #0e7e57 0%, #0078d4 100%);
  color: var(--color-white);
  padding: 4rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.internship-cta::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 25s linear infinite reverse;
}

.internship-cta .container {
  position: relative;
  z-index: 1;
}

.internship-cta h2 {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out;
}

.internship-cta p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.btn-whatsapp {
  background-color: #25d366;
  color: white;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  animation: fadeInUp 1s ease-out 0.6s both;
}

.btn-whatsapp:hover {
  background-color: #128c7e;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #0e7e57 0%, #0078d4 100%);
  border-radius: var(--radius-full);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .internship-cta h2 {
    font-size: 1.8rem;
  }
  .internship-cta p {
    font-size: 1rem;
  }
}
</style>
