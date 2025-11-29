# TA-PERCOBAAN-6-AJAX-DAN-WEB-SERVICE--PRAKTIKUM-PEMROGRAMAN-WEB
# 🌦️CuacaKita
<img width="1908" height="954" alt="image" src="https://github.com/user-attachments/assets/818d364a-81c5-46b4-9d42-1ea503b690c6" />
<img width="1919" height="953" alt="image" src="https://github.com/user-attachments/assets/fb0b1212-71ed-4b2c-983e-5b5859f114ec" />


[cite_start]**CuacaKita** adalah aplikasi Weather Dashboard modern berbasis web yang dibangun untuk memenuhi Tugas Akhir Praktikum Pemrograman Web **Modul 6: AJAX dan Web Service**. Aplikasi ini memanfaatkan **Fetch API** untuk mengambil data cuaca secara *real-time* dan menyajikannya dalam antarmuka yang responsif.

[cite_start]Aplikasi ini menerapkan konsep komunikasi *client-server* secara *asynchronous* (AJAX) menggunakan JavaScript modern. [cite_start]Data dipertukarkan dalam format **JSON** [cite: 108] melalui OpenWeatherMap API. Tujuannya adalah menampilkan informasi cuaca terkini dan prediksi ke depan tanpa perlu melakukan *reload* halaman.

## ✨ Fitur Utama

[cite_start]Aplikasi ini telah memenuhi seluruh spesifikasi tugas akhir, meliputi:

### [cite_start]1. Current Weather Display
- [cite_start]Menampilkan suhu, kelembapan (*humidity*), dan kecepatan angin (*wind speed*)[cite: 147].
- [cite_start]Ikon kondisi cuaca dinamis.
- [cite_start]Penunjuk lokasi (Kota, Negara) dan *timestamp* pembaruan data.
- [cite_start]**Real-time Updates:** Data diperbarui otomatis setiap 5 menit.

### [cite_start]2. 5-Day Forecast
- [cite_start]Prediksi cuaca harian untuk 5 hari ke depan.
- [cite_start]Menampilkan ikon cuaca dan deskripsi singkat.
- Menampilkan estimasi suhu dalam format grid yang rapi.

### [cite_start]3. Pencarian & Lokasi
- [cite_start]**Search Functionality:** Pencarian cuaca berdasarkan nama kota.
- [cite_start]**Auto-complete:** Saran nama kota muncul otomatis saat mengetik.
- [cite_start]**Favorites:** Fitur untuk menyimpan kota favorit menggunakan *Local Storage* browser.

### [cite_start]4. Fitur Interaktif
- [cite_start]**Unit Toggle:** Kemampuan mengubah satuan suhu antara Celsius dan Fahrenheit.
- [cite_start]**Theme Toggle:** Mode Gelap (*Dark Mode*) dan Terang (*Light Mode*).
- [cite_start]**Manual Refresh:** Tombol untuk memperbarui data seketika.
- [cite_start]**Loading Indicators:** Indikator visual saat data sedang diambil dari API.

## 🛠️ Teknologi yang Digunakan

* **HTML5** - Struktur semantik halaman.
* **CSS3 (Tailwind CSS)** - Framework CSS untuk *styling* responsif dan modern.
* **JavaScript (ES6+)** - Logika aplikasi utama.
    * [cite_start]**Fetch API** - Pengganti modern XMLHttpRequest untuk request HTTP.
    * **Async/Await** - Penanganan proses *asynchronous* yang lebih bersih.
    * **DOM Manipulation** - Memperbarui tampilan secara dinamis.
* [cite_start]**OpenWeatherMap API** - Penyedia layanan data cuaca (REST API).

## 📂 Struktur File

```text
TA-PERCOBAAN-6/
│
├── index.html      # Struktur utama aplikasi dan layout
├── style.css       # Kustomisasi animasi dan tema tambahan
├── script.js       # Logika Fetch API, DOM, dan Event Handling
└── README.md       # Dokumentasi proyek
