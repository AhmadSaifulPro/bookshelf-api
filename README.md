# 📚 Bookshelf API

Bookshelf API adalah proyek RESTful API sederhana yang dikembangkan sebagai bagian dari submission kelas **Belajar Membuat Aplikasi Back-End untuk Pemula** di [Dicoding Indonesia](https://www.dicoding.com/).

API ini di buat menggunakan **Hapi Framework**(Node.js) memungkinkan pengguna untuk menambahkan, menampilkan, memperbarui, dan menghapus data buku secara lokal (tanpa database).


## 🚀 Fitur

- Tambah buku baru
- Ambil seluruh buku
- Ambil detail buku berdasarkan ID
- Ubah data buku
- Hapus buku berdasarkan ID
- Filter buku berdasarkan:
  - Nama (`/books?name=`)
  - Status dibaca (`/books?reading=0/1`)
  - Status selesai dibaca (`/books?finished=0/1`)

## 📦 Teknologi yang Digunakan

- Node.js
- Hapi.js
- Nanoid
- Nodemon
- ESLint (dengan config Dicoding)

## 📁 Struktur Folder
bookshelf-api/
├── src/
│ ├── handler/
│ ├── routes/
│ └── books.js
├── .eslintrc.cjs
├── .eslintignore
├── .gitignore
├── package.json
└── README.md

## 🚀 Cara Menjalankan Proyek

1. Clone repository ini:
   ```bash
   git clone https://github.com/AhmadSaifulPro/bookshelf-api.git
   cd bookshelf-api

2. Install dependency:
   ```bash
   npm install
3. Jalankan server:
   ```bash
   npm run start
   # atau
   nodemon src/server.js
4. Akses server:
   http://localhost:9000

📚 Endpoint Utama
| Method | Path        | Deskripsi                     |
| ------ | ----------- | ----------------------------- |
| GET    | /books      | Menampilkan semua buku        |
| POST   | /books      | Menambahkan buku baru         |
| GET    | /books/{id} | Menampilkan detail buku       |
| PUT    | /books/{id} | Memperbarui detail buku       |
| DELETE | /books/{id} | Menghapus buku berdasarkan id |

🧪 Tools Pendukung
-Postman atau REST Client untuk pengujian endpoint.
-ESLint untuk menjaga kualitas code.



