<template>
  <div class="filter-container">
    <!-- Precio Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('precio')">
        <h3>Precio</h3>
        <i
          class="chevron"
          :class="{ 'chevron-up': openSections.precio }"
        >▼</i>
      </div>
      <transition name="slide-fade">
        <div v-show="openSections.precio" class="section-content">
          <div class="price-range">
            <div class="range-container">
              <!-- Track de fondo -->
              <div class="range-track"></div>
              <!-- Track activo (celeste) -->
              <div
                class="range-track-active"
                :style="rangeTrackStyle"
              ></div>
              <!-- Sliders -->
              <input
                type="range"
                v-model="filters.priceMin"
                :min="0"
                :max="500"
                step="10"
                class="range-slider"
                @input="updatePriceRange"
              />
              <input
                type="range"
                v-model="filters.priceMax"
                :min="0"
                :max="500"
                step="10"
                class="range-slider range-max"
                @input="updatePriceRange"
              />
            </div>
            <div class="price-labels">
              <span class="price-min">S/ {{ filters.priceMin }}</span>
              <span class="price-max">S/ {{ filters.priceMax }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Velocidad Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('velocidad')">
        <h3>Velocidad</h3>
        <span v-if="activeSpeedsCount > 0" class="badge">{{ activeSpeedsCount }}</span>
        <button
          v-if="activeSpeedsCount > 0"
          @click.stop="clearSpeeds"
          class="clear-btn"
        >
          Limpiar ×
        </button>
        <i
          class="chevron"
          :class="{ 'chevron-up': openSections.velocidad }"
        >▼</i>
      </div>
      <transition name="slide-fade">
        <div v-show="openSections.velocidad" class="section-content">
          <div class="checkbox-group">
            <label
              v-for="speed in speedOptions"
              :key="speed.value"
              class="checkbox-item"
              :class="{ 'checked': filters.speeds.includes(speed.value) }"
            >
              <input
                type="checkbox"
                :value="speed.value"
                v-model="filters.speeds"
                @change="animateCheckbox($event)"
              />
              <span class="checkmark"></span>
              <span class="label-text">{{ speed.label }}</span>
            </label>
          </div>
        </div>
      </transition>
    </div>

    <!-- Servicios Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('servicios')">
        <h3>Servicios</h3>
        <span v-if="activeServicesCount > 0" class="badge">{{ activeServicesCount }}</span>
        <button
          v-if="activeServicesCount > 0"
          @click.stop="clearServices"
          class="clear-btn"
        >
          Limpiar ×
        </button>
        <i
          class="chevron"
          :class="{ 'chevron-up': openSections.servicios }"
        >▼</i>
      </div>
      <transition name="slide-fade">
        <div v-show="openSections.servicios" class="section-content">
          <div class="checkbox-group">
            <label
              v-for="service in serviceOptions"
              :key="service.value"
              class="checkbox-item"
              :class="{ 'checked': filters.services.includes(service.value) }"
            >
              <input
                type="checkbox"
                :value="service.value"
                v-model="filters.services"
                @change="animateCheckbox($event)"
              />
              <span class="checkmark"></span>
              <span class="label-text">{{ service.label }}</span>
            </label>
          </div>
        </div>
      </transition>
    </div>

    <!-- Pago Mensual Section -->
    <div class="filter-section">
      <div class="section-header" @click="toggleSection('pago')">
        <h3>Pago Mensual</h3>
        <span v-if="activePaymentsCount > 0" class="badge">{{ activePaymentsCount }}</span>
        <button
          v-if="activePaymentsCount > 0"
          @click.stop="clearPayments"
          class="clear-btn"
        >
          Limpiar ×
        </button>
        <i
          class="chevron"
          :class="{ 'chevron-up': openSections.pago }"
        >▼</i>
      </div>
      <transition name="slide-fade">
        <div v-show="openSections.pago" class="section-content">
          <div class="checkbox-group">
            <label
              v-for="payment in paymentOptions"
              :key="payment.value"
              class="checkbox-item"
              :class="{ 'checked': filters.payments.includes(payment.value) }"
            >
              <input
                type="checkbox"
                :value="payment.value"
                v-model="filters.payments"
                @change="animateCheckbox($event)"
              />
              <span class="checkmark"></span>
              <span class="label-text">{{ payment.label }}</span>
            </label>
          </div>
        </div>
      </transition>
    </div>

    <!-- Results Summary -->
    <div class="results-summary" v-if="hasActiveFilters">
      <div class="summary-card">
        <h4>Filtros aplicados:</h4>
        <div class="active-filters">
          <span v-if="priceRangeActive" class="filter-tag">
            Precio: S/{{ filters.priceMin }} - S/{{ filters.priceMax }}
            <button @click="resetPrice">×</button>
          </span>
          <span v-for="speed in selectedSpeedLabels" :key="speed" class="filter-tag">
            {{ speed }}
            <button @click="removeSpeed(speed)">×</button>
          </span>
          <span v-for="service in selectedServiceLabels" :key="service" class="filter-tag">
            {{ service }}
            <button @click="removeService(service)">×</button>
          </span>
          <span v-for="payment in selectedPaymentLabels" :key="payment" class="filter-tag">
            {{ payment }}
            <button @click="removePayment(payment)">×</button>
          </span>
        </div>
        <button @click="clearAllFilters" class="clear-all-btn">
          Limpiar todos los filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicFilter',
  data() {
    return {
      openSections: {
        precio: true,
        velocidad: false,
        servicios: false,
        pago: false
      },
      filters: {
        priceMin: 0,
        priceMax: 500,
        speeds: [],
        services: ['internet-fijo'], // Internet Fijo preseleccionado
        payments: []
      },
      speedOptions: [
        { value: '181-300', label: '181Mbps - 300Mbps' },
        { value: '301-1000', label: '301Mbps - 1000Mbps' }
      ],
      serviceOptions: [
        { value: 'internet-fijo', label: 'Internet Fijo' },
        { value: 'internet-claro-tv', label: 'Internet y Claro TV+' },
        { value: 'internet-telefonia', label: 'Internet + telefonía' },
        { value: 'internet-claro-telefonia', label: 'Internet, Claro TV+ y Telefonía' }
      ],
      paymentOptions: [
        { value: '59-99', label: '59 - 99' },
        { value: '100-159', label: '100 - 159' }
      ]
    }
  },
  computed: {
    activeServicesCount() {
      return this.filters.services.length;
    },
    activeSpeedsCount() {
      return this.filters.speeds.length;
    },
    activePaymentsCount() {
      return this.filters.payments.length;
    },
    hasActiveFilters() {
      return this.priceRangeActive ||
             this.filters.speeds.length > 0 ||
             this.filters.services.length > 0 ||
             this.filters.payments.length > 0;
    },
    priceRangeActive() {
      return this.filters.priceMin > 0 || this.filters.priceMax < 500;
    },
    rangeTrackStyle() {
      const min = parseInt(this.filters.priceMin);
      const max = parseInt(this.filters.priceMax);
      const minPercent = (min / 500) * 100;
      const maxPercent = (max / 500) * 100;

      return {
        left: `${minPercent}%`,
        width: `${maxPercent - minPercent}%`
      };
    },
    selectedSpeedLabels() {
      return this.filters.speeds.map(speed =>
        this.speedOptions.find(option => option.value === speed)?.label
      ).filter(Boolean);
    },
    selectedServiceLabels() {
      return this.filters.services.map(service =>
        this.serviceOptions.find(option => option.value === service)?.label
      ).filter(Boolean);
    },
    selectedPaymentLabels() {
      return this.filters.payments.map(payment =>
        this.paymentOptions.find(option => option.value === payment)?.label
      ).filter(Boolean);
    }
  },
  methods: {
    toggleSection(section) {
      this.openSections[section] = !this.openSections[section];
    },
    updatePriceRange() {
      // Asegurar que min no sea mayor que max
      if (parseFloat(this.filters.priceMin) > parseFloat(this.filters.priceMax)) {
        this.filters.priceMin = this.filters.priceMax;
      }
      this.emitFiltersChange();
    },
    animateCheckbox(event) {
      const checkbox = event.target;
      const label = checkbox.closest('.checkbox-item');

      if (checkbox.checked) {
        label.classList.add('animate-check');
        setTimeout(() => {
          label.classList.remove('animate-check');
        }, 300);
      }

      this.emitFiltersChange();
    },
    clearServices() {
      this.filters.services = [];
      this.emitFiltersChange();
    },
    clearSpeeds() {
      this.filters.speeds = [];
      this.emitFiltersChange();
    },
    clearPayments() {
      this.filters.payments = [];
      this.emitFiltersChange();
    },
    resetPrice() {
      this.filters.priceMin = 0;
      this.filters.priceMax = 500;
      this.emitFiltersChange();
    },
    removeSpeed(speedLabel) {
      const speedValue = this.speedOptions.find(option => option.label === speedLabel)?.value;
      if (speedValue) {
        this.filters.speeds = this.filters.speeds.filter(speed => speed !== speedValue);
        this.emitFiltersChange();
      }
    },
    removeService(serviceLabel) {
      const serviceValue = this.serviceOptions.find(option => option.label === serviceLabel)?.value;
      if (serviceValue) {
        this.filters.services = this.filters.services.filter(service => service !== serviceValue);
        this.emitFiltersChange();
      }
    },
    removePayment(paymentLabel) {
      const paymentValue = this.paymentOptions.find(option => option.label === paymentLabel)?.value;
      if (paymentValue) {
        this.filters.payments = this.filters.payments.filter(payment => payment !== paymentValue);
        this.emitFiltersChange();
      }
    },
    clearAllFilters() {
      this.filters = {
        priceMin: 0,
        priceMax: 500,
        speeds: [],
        services: [],
        payments: []
      };
      this.emitFiltersChange();
    },
    emitFiltersChange() {
      this.$emit('filters-changed', this.filters);
    }
  },
  mounted() {
    // Emit initial filters
    this.emitFiltersChange();
  }
}
</script>

<style scoped>
.filter-container {
  max-width: 400px;
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.filter-section {
  background: white;
  margin-bottom: 2px;
  transition: all 0.3s ease;
}

.filter-section:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  background: #ffffff;
  transition: all 0.3s ease;
  position: relative;
}

.section-header:hover {
  background: #f8f9fa;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.badge {
  background: #007bff;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: bold;
  margin-right: 8px;
  animation: pulse 2s infinite;
}

.clear-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: #c82333;
  transform: scale(1.05);
}

.chevron {
  font-size: 12px;
  color: #666;
  transition: transform 0.3s ease;
}

.chevron-up {
  transform: rotate(180deg);
}

.section-content {
  padding: 0 20px 20px;
}

/* Price Range Styles */
.price-range {
  margin-top: 10px;
}

.range-container {
  position: relative;
  height: 40px;
  margin-bottom: 15px;
}

.range-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  z-index: 1;
}

.range-track-active {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 6px;
  background: linear-gradient(90deg, #00bcd4, #26c6da);
  border-radius: 3px;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);
}

.range-slider {
  position: absolute;
  width: 100%;
  height: 6px;
  background: transparent;
  outline: none;
  -webkit-appearance: none;
  pointer-events: all;
  z-index: 3;
  top: 50%;
  transform: translateY(-50%);
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background: #00bcd4;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 3px 12px rgba(0, 188, 212, 0.4);
  transition: all 0.2s ease;
}

.range-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  background: #26c6da;
  box-shadow: 0 4px 16px rgba(0, 188, 212, 0.6);
}

.range-slider::-webkit-slider-thumb:active {
  transform: scale(1.25);
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.8);
}

.range-slider::-webkit-slider-track {
  background: transparent;
}

.range-slider::-moz-range-thumb {
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background: #00bcd4;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 3px 12px rgba(0, 188, 212, 0.4);
}

.range-slider::-moz-range-track {
  background: transparent;
}

.price-labels {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: #007bff;
}

/* Checkbox Styles */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  background: #f8f9fa;
}

.checkbox-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.checkbox-item.checked {
  background: #e3f2fd;
  border-left: 4px solid #007bff;
}

.checkbox-item.animate-check {
  animation: checkBounce 0.3s ease;
}

.checkbox-item input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 12px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-item.checked .checkmark {
  background: #007bff;
  border-color: #007bff;
}

.checkbox-item.checked .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.label-text {
  flex: 1;
  font-size: 14px;
  color: #333;
  transition: color 0.3s ease;
}

.checkbox-item.checked .label-text {
  color: #007bff;
  font-weight: 500;
}

/* Results Summary */
.results-summary {
  margin-top: 20px;
  padding: 0 20px 20px;
}

.summary-card {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 16px;
  animation: slideInUp 0.5s ease;
}

.summary-card h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #856404;
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.filter-tag {
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  animation: fadeIn 0.3s ease;
}

.filter-tag button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.filter-tag button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.clear-all-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.clear-all-btn:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

/* Animations */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

@keyframes checkBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive */
@media (max-width: 480px) {
  .filter-container {
    margin: 0 10px;
  }

  .section-header {
    padding: 12px 16px;
  }

  .section-content {
    padding: 0 16px 16px;
  }
}
</style>
