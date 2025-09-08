Tautan menuju aplikasi PWS yang sudah di-deploy : https://elizabeth-meilanny-eleleven.pbp.cs.ui.ac.id/

1. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial)!
    > Pertama, saya membuat folder baru dengan nama ide aplikasi yang saya buat, yaitu EL_Eleven
    > Lalu, saya mengaktifkan virtual environtment, menyiapkan dependencies dan membuat proyek Django, konfigurasi environment variables dan proyek, migrasi, dan run server. Lalu, aplikasi Django sudah jadi.
    > Setelah itu, saya membuat aplikasi dengan nama main pada proyek tersebut dengan menjalankan perintah python manage.py startapp main dan mendaftarkan aplikasi main ke dalam proyek.
    > Lalu, saya buat direktori baru bernama templates di dalam direktori aplikasi main dan buat berkas baru main.html di dalam direktori templates. Isi berkas main.html dengan ketentuan di soal, yaitu nama dan kelas dengan memerhatikan heading karena setiap heading ukurannya beda.
    > Selanjutnya, saya mengubah berkas models.py dalam aplikasi main sesuai ketentuan soal dengan tipe data masing - masing atribut.
    > Setelah itu, migrasi dan Menghubungkan View dengan Template. Pada berkas views.py, fungsinya saya isi dengan nama dan kelas sesuai dengan main.html.
    > Setelah membuat template dan mengonfigurasikannya pada view, lanjut mengonfigurasi Routing URL Aplikasi main dan proyek dengan membuat berkas urls.py dan mengisinya dengan kode - kode yang sesuai.
    > Setelah selesai melakukan step by step berdasarkan tutorial 1 dan tutorial 0, lakukan deployment ke PWS terhadap aplikasi yang sudah dibuat dengan membuat proyek baru terlebih dahulu di homepage PWS, simpan credentials yang diperoleh. Pergi ke vs code dan copy .env.prod, lalu paste ke dalam environs proyek PWS. Pada settings.py di proyek Django yang sudah dibuat tadi, tambahkan URL deployment PWS pada ALLOWED_HOSTS. Jalankan perintah yang terdapat pada informasi project command pada halaman PWS dan isi username dan password dengan menggunakan credentials yang telah disimpan sebelumnya. Lalu, kembali ke PWS dan lihat status deployment apakah building, running, successful. Tekan view project untuk memastikan. 


2. Buatlah bagan yang berisi request client ke web aplikasi berbasis Django beserta responnya dan jelaskan pada bagan tersebut kaitan antara urls.py, views.py, models.py, dan berkas html.


3. Jelaskan peran settings.py dalam proyek Django!
Peran settings.py dalam proyek django adalah sebagai "control center" atau pusat kendali untuk menentukan bagaimana Django dijanalankan, dikelola, dan berinteraksi dengan berbagai komponen proyek. Tanpa settings.py, proyek Django tersebut tidak memiliki arah untuk beroperasi karena pusat kendali tidak ada sehingga sistem tidak dapat dipastikan bisa berjalan dengan sesuai.


4. Bagaimana cara kerja migrasi database di Django?
Sebelum mengetahui cara kerja, saya akan menjelaskan migrasi terlebih dahulu. Migrasi database di Django adalah mekanisme untuk mengelola perubahan struktur basis data dengan mencatat setiap modifikasi pada models.py. Dalam kata lain, Migrasi ini adalah instruksi untuk mengubah struktur tabel basis data sesuai dengan perubahan model yang didefinisikan dalam kode terbaru. Untuk membuat file migrasi yang berisi instruksi perubahan skema basis data, jalankan perintah python manage.py makemigration. Lalu untuk menerapkan perubahan tersebut ke dalam basis data dengan menjalankan perintah SQL yang relevan, gunakan python manage.py migrate. Secara otomatis, Django mencatat migrasi mana yang telah diterapkan di basis data sehingga dapat mengetahui perubahan yang masih perlu diimplementasikan.


5. Menurut Anda, dari semua framework yang ada, mengapa framework Django dijadikan permulaan pembelajaran pengembangan perangkat lunak?
Menurut saya, dari semua framework yang ada, Django merupakan framework yang ideal karena memiliki fitur bawaan yang jumlahnya besar sehingga kita tidak perlu memikirkan untuk mengintegrasi library pihak ketiga. Lalu, Django memiliki struktur yang jelas karena menerapkan Model View Template yang dapat membantu pemula memahami pembagian dalam aplikasi. Selain itu, Django juga menggunakan bahasa pemrograman python yang sintaksisnya ramah untuk pemula. Perihal waktu, Django juga memberikan kemudahan dalam pengembangan cepat dan pembuatan aplikasi kepada pengguna.


6. Apakah ada feedback untuk asisten dosen tutorial 1 yang telah kamu kerjakan sebelumnya?
Menurut saya, tutorial 1 sangat informatif dan deskriptif. Sebagai mahasiswa yang baru belajar menggunakan django, saya dapat memahami tutorial 1 dan mengikuti step by step dengan tepat. Pesan dari saya, semoga untuk tutorial selanjutnya dapat meneruskan ke-informatifan yang ada di tutorial 1 dengan lebih jelas lagi sehingga untuk mahasiswa yang kurang dapat memahami tutorial 1, dapat memahami tutorial 2 nantinya.