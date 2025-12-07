<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title> Data Cryptocurrency</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="ion-padding">
        <ion-button expand="block" @click="fetchData">REFRESH</ion-button>
        
        <div v-if="isLoading" class="ion-text-center ion-margin-top">
          <ion-spinner></ion-spinner>
          <p>Memuat data...</p>
        </div>

        <ion-card v-if="error" color="danger" class="ion-margin-top">
          <ion-card-content>
            Gagal mengambil data: **{{ error }}**
          </ion-card-content>
        </ion-card>

        <div v-if="!isLoading && !error && tickers.length">
          <ion-list lines="none" class="crypto-list ion-margin-top">
            <ion-item 
              v-for="coin in tickers" 
              :key="coin.id" 
              class="crypto-item" 
              button 
              @click="showDetails(coin)"
            >
              <div class="item-grid">
                
                <div class="grid-rank">
                  <span class="label">Rank</span>
                  <span class="value rank-value">{{ coin.rank }}</span>
                </div>
                
                <div class="grid-name">
                  <span class="name-text">{{ coin.name }}</span>
                  <span class="symbol-text">{{ coin.symbol }}</span>
                </div>
                
                <div class="grid-price">
                  <span class="label usd-label">USD</span>
                  <span class="value price-value">
                    {{ formatCurrency(coin.price_usd) }}
                  </span>
                </div>
                
              </div>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
    
    <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ selectedCoin?.name }} Details</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModal">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-padding" v-if="selectedCoin">
        
        <ion-list lines="full">
          <ion-list-header>
            <ion-label>Informasi Dasar</ion-label>
          </ion-list-header>
          
          <ion-item>
            <ion-label>Rank</ion-label>
            <ion-note slot="end">{{ selectedCoin.rank }}</ion-note>
          </ion-item>
          
          <ion-item>
            <ion-label>Simbol</ion-label>
            <ion-note slot="end">{{ selectedCoin.symbol }}</ion-note>
          </ion-item>
          
          <ion-item>
            <ion-label>Harga USD</ion-label>
            <ion-note slot="end">${{ formatCurrency(selectedCoin.price_usd) }}</ion-note>
          </ion-item>
        </ion-list>

        <ion-list class="ion-margin-top">
          <ion-list-header>
            <ion-label>Konversi ke Rupiah (IDR)</ion-label>
          </ion-list-header>

          <ion-item>
            <ion-label position="floating">Jumlah (USD)</ion-label>
            <ion-input 
              type="number" 
              v-model.number="inputAmountUSD" 
              :min="0.000001"
              step="1"
              placeholder="Masukkan Jumlah USD"
            ></ion-input>
          </ion-item>

          <ion-card color="success" class="ion-margin-top">
            <ion-card-content class="ion-text-center">
              <p>Nilai {{ inputAmountUSD }} USD ({{ selectedCoin.name }}) Adalah:</p>
              <h2>{{ formatRupiah((parseFloat(selectedCoin.price_usd) * inputAmountUSD).toString()) }}</h2>
            </ion-card-content>
          </ion-card>
          
          <ion-note class="ion-text-center ion-padding-top" expand="block">
            <span v-if="usdToIdrRate > 0">
              *Menggunakan kurs terkini: 1 USD = {{ formatCurrency(usdToIdrRate.toString()) }} IDR*
            </span>
            <span v-else>
              *Sedang memuat kurs atau menggunakan kurs default (15,500 IDR).
            </span>
          </ion-note>
          
        </ion-list>
      </ion-content>
    </ion-modal>
    
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonList, 
  IonItem, 
  IonSpinner, 
  IonCard, 
  IonCardContent,
  IonModal, 
  IonNote,  
  IonLabel, 
  IonButtons, 
  IonInput, 
  IonListHeader 
} from '@ionic/vue';

// Definisikan tipe data untuk coin
interface Ticker {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price_usd: string;
}

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonSpinner,
    IonCard,
    IonCardContent,
    IonModal,
    IonNote,
    IonLabel,
    IonButtons,
    IonInput,
    IonListHeader
  },
  setup() {
    // State Aplikasi
    const tickers = ref<Ticker[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const API_URL = 'https://api.coinlore.net/api/tickers/';
    
    // State Modal & Konversi
    const isModalOpen = ref(false); 
    const selectedCoin = ref<Ticker | null>(null); 
    const inputAmountUSD = ref(1); // Jumlah USD yang ingin dikonversi
    const usdToIdrRate = ref(0); // <-- Inisialisasi dengan 0
    const EXCHANGE_RATE_API_URL = 'http://api.frankfurter.app/latest?from=USD&to=IDR'; // Kurs Hardcoded (Untuk Contoh)

    const fetchExchangeRate = async () => {
    try {
        // Menggunakan Axios untuk mengambil data kurs
        const response = await axios.get(EXCHANGE_RATE_API_URL);
        
        if (response.data && response.data.rates && response.data.rates.IDR) {
            usdToIdrRate.value = response.data.rates.IDR;
            console.log('Kurs USD/IDR Terkini:', usdToIdrRate.value);
        } else {
            console.error('Gagal mengambil kurs, menggunakan default.');
            usdToIdrRate.value = 15500; // Nilai fallback jika API gagal
        }
    } catch (err) {
        console.error('Error fetching exchange rate:', err);
        usdToIdrRate.value = 15500; // Nilai fallback jika terjadi error jaringan
      }
    };

    /**
     * Fungsi untuk mengambil data cryptocurrency dari API
     */
    const fetchData = async () => {
      isLoading.value = true;
      error.value = null; 
      
      try {
        const response = await axios.get(API_URL);
        
        if (response.data && response.data.data) {
          // Ambil SEMUA data
          const rawData: Ticker[] = response.data.data;
          tickers.value = rawData; 
        } else {
          error.value = 'Struktur data API tidak valid.';
          tickers.value = [];
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
        if (axios.isAxiosError(err) && err.message) {
          error.value = err.message;
        } else {
          error.value = 'Terjadi kesalahan saat mengambil data.';
        }
        tickers.value = [];
        
      } finally {
        isLoading.value = false;
      }
    };

    /**
     * Format nilai mata uang ke format yang mudah dibaca.
     * @param value Nilai harga dalam string
     */
    const formatCurrency = (value: string): string => {
      const numberValue = parseFloat(value);
      // Gunakan Intl.NumberFormat untuk format USD
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: numberValue < 1 ? 5 : 2,
        maximumFractionDigits: numberValue < 1 ? 8 : 2,
      }).format(numberValue);
    };

    /**
     * Format nilai mata uang ke format Rupiah (IDR).
     * @param usdValue Nilai total dalam USD (string)
     */
    const formatRupiah = (usdValue: string): string => {
      const numberValue = parseFloat(usdValue) * usdToIdrRate.value;
      // Gunakan Intl.NumberFormat untuk format IDR
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0,
      }).format(numberValue);
    };
    
    /**
     * Membuka modal detail
     */
    const showDetails = (coin: Ticker) => {
      selectedCoin.value = coin;
      inputAmountUSD.value = 1; // Default konversi ke 1 USD
      isModalOpen.value = true;
    };
    
    /**
     * Menutup modal detail
     */
    const closeModal = () => {
      isModalOpen.value = false;
      selectedCoin.value = null;
    };

    // Panggil fetchData saat komponen pertama kali dimuat
    onMounted(() => {
      fetchExchangeRate();
      fetchData();
    });

    return {
      tickers,
      isLoading,
      error,
      fetchData,
      formatCurrency,
      formatRupiah, // <--- Dipakai di Modal
      usdToIdrRate, // <--- Dipakai di Modal
      isModalOpen,
      selectedCoin,
      inputAmountUSD,
      showDetails,
      closeModal,
    };
  },
});
</script>

<style scoped>
/* --- STYLING LIST CRYPTO --- */
.crypto-list {
  --ion-item-background: #ffffff;
}

.crypto-item {
  margin-bottom: 8px; 
  border-radius: 8px; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); 
  --inner-border-width: 0; 
  border: 1px solid #ddd;
  padding: 5px 0;
}

.item-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.5fr 1.5fr; /* Rank, Nama/Simbol, Harga */
  width: 100%;
  align-items: center;
}

/* Kolom Rank */
.grid-rank {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  padding-left: 10px;
}
.rank-value {
  font-size: 1.8em;
  color: #3880ff; /* Biru/Warna primer */
}

/* Kolom Nama & Simbol */
.grid-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name-text {
  font-size: 1em;
  font-weight: 500;
  color: #555;
}
.symbol-text {
  font-size: 1.3em;
  font-weight: bold;
  color: #000;
  margin-top: 2px;
}

/* Kolom Harga USD */
.grid-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
  padding-right: 10px;
}
.usd-label {
  font-size: 0.8em;
  color: #666;
}
.price-value {
  font-size: 1.3em;
  font-weight: bold;
  color: #28a745; /* Hijau untuk harga */
}

.label {
  font-size: 0.7em;
  color: #777;
}

/* Peniruan warna latar belakang item seperti di gambar (putih dan sedikit kuning) */
.crypto-list ion-item:nth-child(4n + 1) {
    --background: #fff;
}
.crypto-list ion-item:nth-child(4n + 2) {
    --background: #fffbe6; /* Kuning muda */
}
.crypto-list ion-item:nth-child(4n + 3) {
    --background: #fff;
}
.crypto-list ion-item:nth-child(4n) {
    --background: #fffbe6; /* Kuning muda */
}
</style>
