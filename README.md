1. Apa perbedaan antara synchronous request dan asynchronous request?
> Synchronous Request: Ketika menunggu respon dari server, dia akan "freeze" atau nggak bisa diinteraksi sampai datanya datang.

Asynchronous Request: Website yang p> ake ini jadi lebih responsif, user bisa tetap klik-klik atau scroll tanpa nunggu data dari server.


2. Bagaimana AJAX bekerja di Django (alur request–response)?
> User beraksi (Tekan tombol submit, dll) => JavaScript bergerak (bikin "permintaan" ke server tanpa refresh) => Request ke Django view (Permintaan dikirim ke URL tertentu di Django. Django view akan memproses permintaan itu) => Django merespon (File Django menyimpan data yang relevan saja) => JavaScript update (Javascript mengedit bagian tertentu html) => user senang


3. Apa keuntungan menggunakan AJAX dibandingkan render biasa di Django?
> Keuntungannya, yaitu refresh halaman jadi terasa lebih modern dan responsif.
Lebih Cepat & Hemat Data, dan jadi lebih cepat dan hemat bandwidth. Bisa bikin fitur-fitur keren kayak live search, atau form yang validasinya langsung muncul.


4. Bagaimana cara memastikan keamanan saat menggunakan AJAX untuk fitur Login dan Register di Django?
> Untuk keamanan login AJAX di Django, pastikan HTTPS selalu aktif agar data terenkripsi, sertakan CSRF token Django dalam setiap request AJAX yang mengubah data (POST/PUT/DELETE), lakukan validasi ketat di server untuk semua input pengguna, manfaatkan session management bawaan Django, terapkan rate limiting untuk mencegah brute-force attack, dan gunakan pesan error generik seperti "Username atau password salah" tanpa detail spesifik yang bisa dimanfaatkan penyerang.


5. Bagaimana AJAX mempengaruhi pengalaman pengguna (User Experience) pada website?
> AJAX membuat website lebih responsif dengan efek instan tanpa loading halaman yang lama, memungkinkan fitur interaktif seperti autocomplete, chat real-time, dan filter dinamis yang meningkatkan engagement user, menghemat waktu karena tidak perlu me-render ulang seluruh halaman, serta memberikan pengalaman modern dan nyaman yang membuat pengguna betah berlama-lama di website.
