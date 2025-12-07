# 📱 Pemrograman Berbasis Perangkat Bergerak (PBPB)
Repositori ini berisi Praktikum Tugas Mata Kuliah Pemrograman Berbasis Perangkat Bergerak. Proyek ini dibagi menjadi tiga bagian utama, mencakup dasar-dasar TypeScript/JavaScript dan pengembangan aplikasi mobile hybrid menggunakan kerangka kerja Ionic (Vue/Capacitor) kemudian dilakukan Build Up ke Android Studio dengan
menggunakan Emulator HP Android.

---

## 🛠️ Teknologi dan Kerangka Kerja
Proyek ini dikembangkan menggunakan kombinasi teknologi berikut:

### Alat Utama (Tools)
* **Visual Studio Code (VS Code):** Digunakan sebagai **Code Editor utama** untuk pengembangan, pengeditan, dan *debugging* kode web (Vue/Ionic/TypeScript) di folder `tugas1/`, `tugas2/`, dan `tugas3/`.
* **Android Studio:** Digunakan sebagai **Integrated Development Environment (IDE)** untuk membangun (*build*), mengompilasi, dan menginstal aplikasi Android ke perangkat fisik atau emulator baik untuk proyek `tugas2/` dan `tugas3/`).

* **Framework Utama:**
    * **Vue.js 3:** Digunakan sebagai *framework* antarmuka pengguna (UI).
    * **Ionic Framework 8.x:** Digunakan untuk membangun antarmuka mobile.
    * **Capacitor 7.x:** Digunakan sebagai mesin runtime untuk *deploy* aplikasi ke perangkat native (iOS/Android).
    * **TypeScript:** Digunakan untuk meningkatkan kualitas kode dan *type checking*.
    * **Node.js:** Digunakan sebagai *runtime environment* untuk menjalankan tugas-tugas dasar JavaScript/TypeScript di `tugas1/`.

---

## 📂 Struktur Proyek
Repositori ini terbagi menjadi folder-folder tugas:

### 1. `tugas1/` (Dasar JavaScript/TypeScript)
Berisi file-file dasar yang berfokus pada logika pemrograman:
* **`soal1.ts` / `soal1.js`:** Implementasi untuk mencetak pola segitiga angka, di mana tinggi segitiga ditentukan oleh digit terakhir NIM.
* **`soal2.ts` / `soal2.js`:** Implementasi untuk mencetak deret aritmatika, di mana nilai awal dan *step* ditentukan dari digit NIM.
* **`soal3.ts` / `soal3.js`:** Implementasi untuk mencari bilangan prima dalam rentang tertentu, yang ditentukan dari digit NIM.

### 2. `tugas2/` (Proyek Ionic - Cuaca Jakarta)
Proyek Ionic/Vue yang mengambil data dan menampilkan prakiraan cuaca di Jakarta.
* **Fungsionalitas Utama:** Mengambil data cuaca per jam dari **Open-Meteo API** (latitude -6.2, longitude 106.8) dan menampilkannya sebagai daftar jam dan suhu.
* **Teknik:** Menggunakan `fetch` API, `ref` dan `onMounted` Vue 3 untuk manajemen state dan siklus hidup komponen.

### 3. `tugas3/` (Proyek Ionic - Data Cryptocurrency)
Proyek Ionic/Vue yang mengambil data *real-time* cryptocurrency dan memiliki fitur konversi Rupiah.

* **Fungsionalitas Utama:** Mengambil daftar koin dari **CoinLore API** dan kurs USD/IDR dari **Frankfurter API**.
* **Fitur:** Menampilkan peringkat, nama, simbol, dan harga USD untuk setiap koin. Terdapat modal (pop-up) untuk menampilkan detail koin dan kalkulator konversi USD ke Rupiah (IDR).
* **Teknik:** Menggunakan pustaka **`axios`** untuk panggilan API.

---

## ⚙️ Petunjuk Penggunaan Untuk Tugas 1
Untuk menjalankan proyek **`tugas1`** secara lokal, ikuti langkah-langkah umum di bawah ini:
### Persyaratan
Pastikan **Node JS** dan **Typescript** telah terinstal di sistem.
1. **Navigasi ke Folder**
   ```
   cd TUGAS_PBPB/tugas1
   ```
2. **Jalankan Perintah Typescript dan Javascript** dengan Gunakan perintah `tsc` diikuti nama file `(.ts)` kemudian gunakan perintah `node` diikuti nama file JavaScript `(.js)` untuk melihat output di terminal:
   ```
   tsc soal1.ts
   node soal1.js
   ```
Untuk Soal2 & Soal3, bisa lakukan hal yang sama seperti `soal1` tadi. `tsc` berfungsi untuk Mengambil file kode sumber yang ditulis dalam TypeScript dan mengubahnya menjadi kode JavaScript. Lalu `node` berfungsi untuk menjalankan file JavaScript yang diberikan dan mengeksekusi kode di dalamnya.

---

## ⚙️ Petunjuk Penggunaan Untuk Tugas 2 & Tugas 3 (Proyek Ionic)
Untuk menjalankan proyek **`tugas2`** atau **`tugas3`** secara lokal, ikuti langkah-langkah umum di bawah ini:
### Persyaratan
Pastikan Anda telah menginstal:
* Node.js (disarankan versi LTS)
* Powershell/Terminal/Git
* Android Studio (untuk deployment native Android)

### Instalasi dan Menjalankan

1.  **Kloning Repositori & Navigasi:**
    ```
    git clone <URL_REPOSITORI_ANDA>
    cd TUGAS_PBPB/tugas2  # Ganti dengan 'tugas3' jika diperlukan
    ```

2.  **Instal Dependensi:**
    ```
    npm install
    ```

3.  **Jalankan Aplikasi di Browser (Development Server):**
    ```
    npm run dev
    ```

### Deployment ke Perangkat Android Fisik (Developer Options)

Proses *build* dan *deploy* ke perangkat Android dapat dilakukan langsung melalui terminal setelah menyiapkan perangkat Anda:

1.  **Siapkan Perangkat Android:**
    * Pastikan **Opsi Pengembang (Developer Options)** dan **Debugging USB (USB Debugging)** telah diaktifkan pada ponsel Anda.
    * Sambungkan ponsel ke komputer menggunakan kabel USB.

2.  **Bangun Proyek Web:**
    Langkah ini akan membuat versi web statis dari aplikasi di folder `/dist`.
    ```bash
    npm run build
    ```

3.  **Sinkronisasi ke Proyek Native:**
    Perintah ini akan menyalin aset web terbaru (`/dist`) ke proyek Android Studio dan memastikan plugin Capacitor terdaftar.
    ```bash
    npx cap sync android
    ```

4.  **Buka Proyek di Android Studio:**
    Perintah ini akan membuka proyek native Android di Android Studio.
    ```bash
    npx cap open android
    ```
    *Dari sini, Anda dapat menggunakan fungsi *Run* di Android Studio (dengan perangkat fisik Anda terpilih) untuk menginstal aplikasi.

5.  **Jalankan Langsung ke Perangkat Fisik (Alternatif Cepat):**
    Jika Anda telah melakukan langkah `sync` (Langkah 3), Anda dapat mencoba menjalankan aplikasi langsung ke perangkat yang terhubung (HP Anda) melalui *command line*:
    ```bash
    npx cap run android --target=device
    ```

---
