# VUR (Void User Repository)

**VUR (Void User Repository)** adalah repository berbasis komunitas yang berisi template package untuk **Void Linux**,.

Repository ini bertujuan untuk mempermudah pengguna dan developer dalam:
- Membuat package sendiri
- Mendistribusikan software tambahan

## Struktur Repository

Repository ini dibagi menjadi beberapa kategori utama:

### 📁 core
Template package untuk **system / komponen inti**.  
Digunakan untuk package yang berhubungan langsung dengan sistem atau dependensi utama.

Contoh penggunaan:
- Library inti
- Tool sistem
- Komponen low-level

### 📁 extra
Template package untuk **software tambahan**.  
Digunakan untuk aplikasi user-space yang tidak termasuk sistem inti.

Contoh penggunaan:
- CLI tools
- Aplikasi desktop
- Utility tambahan

### 📁 multilib
Template package untuk **32-bit (multilib)**.  
Digunakan untuk software 32-bit yang dijalankan di sistem 64-bit.

Contoh penggunaan:
- Game 32-bit
- Library legacy
- Software lama yang masih dibutuhkan


## Tujuan VUR

- Menyediakan standar template package untuk Void Linux
- Mempermudah kontribusi komunitas
- Menjadi pusat distribusi package non-resmi
- Mendukung ekosistem Void Linux secara terbuka

## Lisensi

Lisensi mengikuti masing-masing package dan template yang digunakan.

## Catatan

> VUR adalah project berbasis komunitas dan **bukan repository resmi Void Linux**.

Gunakan dengan bijak dan selalu cek isi template sebelum digunakan.

Happy Building 🐧🔥
