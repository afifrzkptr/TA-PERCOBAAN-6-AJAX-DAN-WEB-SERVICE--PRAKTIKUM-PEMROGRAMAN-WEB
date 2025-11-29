# TA-PERCOBAAN-6-AJAX-DAN-WEB-SERVICE--PRAKTIKUM-PEMROGRAMAN-WEB
# 🌦️CuacaKita
<img width="1908" height="954" alt="image" src="https://github.com/user-attachments/assets/818d364a-81c5-46b4-9d42-1ea503b690c6" />
<img width="1919" height="953" alt="image" src="https://github.com/user-attachments/assets/fb0b1212-71ed-4b2c-983e-5b5859f114ec" />


[cite_start]**CuacaKita** adalah aplikasi Weather Dashboard modern berbasis web yang dibangun untuk memenuhi Tugas Akhir Praktikum Pemrograman Web **Modul 6: AJAX dan Web Service**. Aplikasi ini memanfaatkan **Fetch API** untuk mengambil data cuaca secara *real-time* dan menyajikannya dalam antarmuka yang responsif.

[cite_start]Aplikasi ini menerapkan konsep komunikasi *client-server* secara *asynchronous* (AJAX) menggunakan JavaScript modern. [cite_start]Data dipertukarkan dalam format **JSON** [cite: 108] melalui OpenWeatherMap API. Tujuannya adalah menampilkan informasi cuaca terkini dan prediksi ke depan tanpa perlu melakukan *reload* halaman.

## ✨ Fitur Utama

[cite_start]Aplikasi ini telah memenuhi seluruh spesifikasi tugas akhir, meliputi:

###1. Current Weather Display
- Menampilkan suhu, kelembapan (*humidity*), dan kecepatan angin (*wind speed*)[cite: 147].
- Ikon kondisi cuaca dinamis.
- Penunjuk lokasi (Kota, Negara) dan *timestamp* pembaruan data.
- **Real-time Updates:** Data diperbarui otomatis setiap 5 menit.

### 2. 5-Day Forecast
- Prediksi cuaca harian untuk 5 hari ke depan.
- Menampilkan ikon cuaca dan deskripsi singkat.
- Menampilkan estimasi suhu dalam format grid yang rapi.

### 3. Pencarian & Lokasi
- **Search Functionality:** Pencarian cuaca berdasarkan nama kota.
- **Auto-complete:** Saran nama kota muncul otomatis saat mengetik.
- **Favorites:** Fitur untuk menyimpan kota favorit menggunakan *Local Storage* browser.

### 4. Fitur Interaktif
- **Unit Toggle:** Kemampuan mengubah satuan suhu antara Celsius dan Fahrenheit.
- **Theme Toggle:** Mode Gelap (*Dark Mode*) dan Terang (*Light Mode*).
- **Manual Refresh:** Tombol untuk memperbarui data seketika.
- **Loading Indicators:** Indikator visual saat data sedang diambil dari API.

## 🛠️ Teknologi yang Digunakan

* **HTML5** - Struktur semantik halaman.
* **CSS3 (Tailwind CSS)** - Framework CSS untuk *styling* responsif dan modern.
* **JavaScript (ES6+)** - Logika aplikasi utama.
    * **Fetch API** - Pengganti modern XMLHttpRequest untuk request HTTP.
    * **Async/Await** - Penanganan proses *asynchronous* yang lebih bersih.
    * **DOM Manipulation** - Memperbarui tampilan secara dinamis.
* **OpenWeatherMap API** - Penyedia layanan data cuaca (REST API).

## 📂 Struktur File

```text
TA-PERCOBAAN-6/
│
├── index.html      # Struktur utama aplikasi dan layout
├── style.css       # Kustomisasi animasi dan tema tambahan
├── script.js       # Logika Fetch API, DOM, dan Event Handling
└── README.md       # Dokumentasi proyek
