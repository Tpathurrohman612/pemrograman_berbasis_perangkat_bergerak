<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Cuaca Jakarta Terkini</ion-title>
      </ion-toolbar>
    </ion-header>
      
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Cuaca Jakarta</ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="loading">
        <div id="container">
          <p>Memuat Data Cuaca...</p>
        </div>
      </div>
      <div v-else-if="error">
        <div id="container">
          <p>Gagal Memuat Data : {{ error.message }}</p>
        </div>
      </div>
      <ion-list v-else lines="full">
        <ion-item v-for="(item, index) in forecast" :key='index'>
          <ion-label>
            Jam : {{ item.time }}
            <p>Suhu : {{ item.temperature }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/vue';
import { ref, onMounted } from 'vue';

interface ForecastItem {
  time: string;
  temperature: number;
}

interface weatherApiResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
  }
}

const forecast = ref<ForecastItem[]>([]);
const loading = ref(true);
const error = ref<Error|null>(null);
const apiWeather = "https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m";

function formatHour (isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('id-ID',{
    hour : '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta'
  });
}

async function fecthWeather() {
  try {
    const response = await fetch (apiWeather);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status : ${response.status}`)
    }
    const date:weatherApiResponse = await response.json();
    const processeData = date.hourly.time.map((time, index) => {
      return {
        time : formatHour(time),
        temperature: date.hourly.temperature_2m[index]
      };
    }).slice(0,24);
    forecast.value = processeData;
  }
  catch (e) {
    if(e instanceof  Error) {
      error.value = new Error;
      
    } else {
      error.value = new Error('Terjadi Kesalahan');
    }
    console.log('Error Fetching wheater date', e)
  } finally {
    loading.value = false;
  }
}

onMounted (() => {
  fecthWeather();
}); 

</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 50vh;
  text-align: center;

  color: #004cff; /* Biru vibrant */
  animation: fadeIn 0.3s ease;
}

#container p {
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  color: #004cff;
}

/* LIST ITEM CARD vibrant */
ion-item {
  --background: linear-gradient(135deg, #2979ff, #ffd600); /* Biru → Kuning */
  margin: 8px 12px;
  border-radius: 14px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

ion-item:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 6px 14px rgba(0,0,0,0.2);
}

/* Label teks */
ion-label {
  font-size: 18px;
  font-weight: bold;
  color: #0d1bff; /* Biru neon */
}

ion-label p {
  margin-top: 6px;
  color: #ffab00; /* Kuning kuat */
  font-size: 15px;
  font-weight: 700;
}

/* Animasi */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
