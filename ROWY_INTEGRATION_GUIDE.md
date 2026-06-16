# Panduan Integrasi Firebase Firestore dengan Admin Panel Rowy
Selamat! Di sini adalah panduan langkah demi langkah yang dibuat khusus untuk mengintegrasikan database **Firebase Firestore** milik aplikasi POS Anda dengan admin panel **Rowy** (spreadsheet-like UI untuk database NoSQL).

Karena Anda menggunakan **Custom Database ID** (`ai-studio-8ecd1c8e-ad2d-4ce3-9d60-a1e6dcf25d61`) di Google Cloud Project Anda (`alien-operator-1lsxp`), mengikuti instruksi spesifik di bawah ini sangatlah penting agar Rowy dapat mendeteksi koleksi data Anda secara akurat.

---

## 🚀 Langkah 1: Registrasi dan Hubungkan Workspace di Rowy
1. Kunjungi website Resmi Rowy di [https://app.rowy.io/](https://app.rowy.io/) dan buat akun/login.
2. Di halaman Workspace, klik tombol **"Create Project"**.
3. Rowy akan meminta Anda memasukkan kredensial proyek Firebase Anda. Masukkan informasi dasar berikut:
   * **Project ID:** `alien-operator-1lsxp`
   * **Database ID:** `ai-studio-8ecd1c8e-ad2d-4ce3-9d60-a1e6dcf25d61`  *(PENTING: Jangan gunakan `(default)`! Masukkan ID custom ini agar data POS terbaca)*

---

## 🔑 Langkah 2: Membuat Service Account Key di Google Cloud (GCP)
Rowy memerlukan kunci otentikasi admin (service account) agar bisa membaca/menulis data Anda secara aman bypass aturan keamanan publik.

1. Buka tautan Google Cloud Console Service Accounts ini (spesifik untuk proyek Anda):
   👉 [https://console.cloud.google.com/iam-admin/serviceaccounts?project=alien-operator-1lsxp](https://console.cloud.google.com/iam-admin/serviceaccounts?project=alien-operator-1lsxp)
2. Klik tombol **"+ CREATE SERVICE ACCOUNT"** di bagian atas halaman.
3. Beri nama service account Anda, misalnya: `rowy-admin-pos`. Klik **Create and Continue**.
4. Pada kolom pengaturan **Role**, berikan akses penuh berikut:
   * Cari dan pilih: **Cloud Datastore Owner** (atau **Firebase Firestore Admin**)
   * *Opsi Tambahan (jika Anda ingin menggunakan fitur webhook Rowy Run):* Tambahkan juga **Cloud Run Admin**.
5. Klik **Continue**, lalu klik **Done** di bagian paling bawah.
6. Sekarang, cari baris akun baru yang Anda buat (`rowy-admin-pos@alien-operator-1lsxp.iam.gserviceaccount.com`), klik baris tersebut atau tombol titik tiga di sebelah kanan, lalu pilih tab **"Keys"**.
7. Klik **"Add Key"** ➔ **"Create New Key"** ➔ Pilih format **JSON** ➔ Klik **Create**.
8. File JSON rahasia berisi kunci akses akan terunduh otomatis ke komputer Anda. Simpan file ini dengan baik dan jangan dibagi ke sembarang orang.

---

## 🌐 Langkah 3: Upload Kunci JSON Anda ke Rowy
1. Kembali ke tab dashboard **Rowy** Anda.
2. Di bagian pengaturan integrasi proyek di Rowy, Anda akan melihat kolom bertuliskan **"Service Account JSON Key"**.
3. Unggah (upload) file JSON yang baru saja Anda download dari Google Cloud Console pada Langkah 2.
4. Klik **Verify & Connect**. Rowy sekarang terhubung secara live ke database Firebase POS Anda!

---

## 📊 Langkah 4: Membuat Tabel Spreadsheet Dashboard untuk Koleksi Anda
Di dalam workspace Rowy, Anda sekarang dapat menambahkan tabel baru untuk setiap koleksi Firestore yang ada di aplikasi POS. 

Saat membuat tabel baru di Rowy, pilih opsi **"Link existing Firestore collection"**, lalu isi nama koleksi dan struktur kolomnya seperti berikut:

### 1. Tabel Stok Barang (`inventory`)
* **Firestore Collection Path:** `inventory`
* **Skema Kolom yang Perlu Ditambahkan di Rowy:**
  * `code` (Type: Short Text / Single Line Text) - Barcode/Kode barang
  * `name` (Type: Short Text) - Nama produk
  * `category` (Type: Short Text) - Kategori barang
  * `price1` (Type: Number / Integer) - Harga jual Level 1 (Umum)
  * `price2` (Type: Number / Integer) - Harga jual Level 2 (Pelanggan)
  * `stock` (Type: Number) - Jumlah stok fisik saat ini

### 2. Tabel Transaksi Kasir (`transactions`)
* **Firestore Collection Path:** `transactions`
* **Skema Kolom yang Perlu Ditambahkan di Rowy:**
  * `date` (Type: Short Text / Date String) - Tanggal transaksi lokal (DD/MM/YYYY)
  * `isoDate` (Type: Date/Time / timestamp) - Tanggal standar ISO
  * `total` (Type: Number) - Jumlah total belanja (Rp)
  * `method` (Type: Short Text) - Metode pembayaran (Cash / Transfer)
  * `idPelanggan` (Type: Number) - ID Pelanggan (jika ada)
  * `userId` (Type: Short Text) - Kasir yang melayani
  * `items` (Type: JSON / Sub-Table) - Array barang-barang belanjaan

### 3. Tabel Pelanggan (`customers`)
* **Firestore Collection Path:** `customers`
* **Skema Kolom yang Perlu Ditambahkan di Rowy:**
  * `name` (Type: Short Text) - Nama lengkap pelanggan
  * `level` (Type: Number) - Tingkatan level harga (misal: 1 atau 2)

### 4. Tabel Supliyer (`suppliers`)
* **Firestore Collection Path:** `suppliers`
* **Skema Kolom yang Perlu Ditambahkan di Rowy:**
  * `name` (Type: Short Text) - Nama Supplier
  * `contact` (Type: Short Text) - No Telp / Kontak
  * `address` (Type: Long Text / Textarea) - Alamat Supplier

### 5. Tabel Pengeluaran Toko (`expenses`)
* **Firestore Collection Path:** `expenses`
* **Skema Kolom yang Perlu Ditambahkan di Rowy:**
  * `title` (Type: Short Text) - Nama/Deskripsi pengeluaran
  * `amount` (Type: Number) - Nominal pengeluaran (Rp)
  * `date` (Type: Short Text) - Tanggal pengeluaran
  * `type` (Type: Short Text) - Jenis pengeluaran

### 6. Tabel Presensi Karyawan (`attendances`)
* **Firestore Collection Path:** `attendances`
* **Skema Kolom yang Perlu Ditambahkan di Rowy:**
  * `user` (Type: Short Text) - Nama Karyawan
  * `date` (Type: Short Text) - Tanggal kerja
  * `timeIn` (Type: Short Text) - Jam Masuk
  * `timeOut` (Type: Short Text) - Jam Pulang (jika sudah clock out)
  * `status` (Type: Short Text) - Status kehadiran (Hadir, Overtime, dll.)
  * `lateMins` (Type: Number) - Menit keterlambatan

---

## 🛡️ Catatan Tentang Firestore Security Rules
Aturan keamanan yang di-deploy di tab `firestore.rules` aplikasi POS Anda akan tetap melindungi aplikasi Anda secara solid dari eksploitasi oleh pengguna umum atau hacker dari sisi Client-SDK. 

Rowy menggunakan **Admin SDK (Service Account Key)**, sehingga ia memiliki status istimewa yang **melewati (bypass)** aturan `firestore.rules` tersebut secara otomatis. Hal ini memungkinkan Anda sebagai Admin untuk mengedit stok, mengoreksi salah input kasir, atau menyelesaikan bug database secara langsung di Rowy, tanpa perlu khawatir diblokir oleh aturan otorisasi Client. Tetap jaga keamanan file JSON Key Anda dengan aman!
