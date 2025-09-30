1. Jika terdapat beberapa CSS selector untuk suatu elemen HTML, jelaskan urutan prioritas pengambilan CSS selector tersebut!
> Universal Selector (*): "semua elemen" => paling rendah prioritasnya.
> Type Selector (seperti p, div): Semua elemen dengan tag HTML tertentu.
> Class Selector (.nama-kelas): Lebih spesifik daripada tag. Elemen dengan kelas tertentu.
> Attribute Selector: Memilih elemen berdasarkan atributnya. 
> Pseudo-class: Kondisi khusus dari suatu elemen.
> ID Selector: Satu elemen spesifik dengan ID unik. 
> Inline Styles (<div style="color: grey;">): CSS yang ditulis langsung di dalam tag HTML. Prioritas kedua karena langsung nempel ke elemennya.
> !important: Prioritas utama, tetapi sebaiknya jangan sering dipakai karena bisa bikin kode jadi susah di-maintain.

2. Mengapa responsive design menjadi konsep yang penting dalam pengembangan aplikasi web? Berikan contoh aplikasi yang sudah dan belum menerapkan responsive design, serta jelaskan mengapa!
> Responsive design penting karena pengaksesan web setiap orang berbeda-beda: HP, tablet, laptop, bahkan TV. Dengan responsive design, website kita bisa menyesuaikan tampilannya secara otomatis agar tetap enak dilihat dan gampang dipakai di layar apa pun. 

Contoh Aplikasi Responsive: Google, Facebook, Instagram, Tokopedia. Ketika dibuka di HP atau PC, tampilannya menyesuaikan, menunya mungkin jadi ikon di HP, tapi tetap fungsional.
Contoh Aplikasi Belum Responsive: website lama atau situs pemerintahan tertentu yang kurang update yang ketika dibuka di HP, dia akan menampilkan versi desktop secara utuh tapi dikecilkan, jadi harus di-zoom manual dan scroll ke samping untuk baca semua kontennya. 

3. Jelaskan perbedaan antara margin, border, dan padding, serta cara untuk mengimplementasikan ketiga hal tersebut!
> Margin : Margin dalam CSS mengacu pada ruang di sekitar elemen HTML.
    Implementasi = padding: 10px; (memberi padding 10px di semua sisi) atau padding-top: 5px; (padding atas saja).

> Border : Garis visual yang ada di sekitar batas elemen.
    Implementasi = border: 2px solid black; (garis 2px, solid, warna hitam).

> Padding : Padding dalam CSS adalah ruang di antara batas elemen HTML dan kontennya.
    Implementasi = margin: 20px; (memberi margin 20px di semua sisi) atau margin-bottom: 15px; (margin bawah saja).

4. Jelaskan konsep flex box dan grid layout beserta kegunaannya!
> Flexbox (Flexible Box Layout): Tata letak satu dimensi; baris (row) atau kolom (column). Cocok untuk alokasi item-item dalam satu baris atau satu kolom, memberi jarak, atau mengubah urutan dengan mudah. Contohnya, bikin navigasi bar horizontal atau mengatur item dalam kartu produk yang ukurannya bisa beda-beda.

> Grid Layout (CSS Grid Layout): Tata letak dua dimensi, mengatur elemen dalam baris dan kolom sekaligus, seperti tabel tapi jauh lebih fleksibel dan powerful. Cocok untuk membuat layout halaman secara keseluruhan, membagi area halaman, atau menempatkan elemen di posisi yang sangat spesifik dalam kotak-kotak layout. 

Grid => layout besar
Flexbox => detail di dalam layout 

5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial)!
> Pertama, saya menambahkan field user di model Product dan membuat view edit_product & delete_product dengan pengecekan kepemilikan (product.user == request.user). Lalu membuat tombol Edit/Delete di card terdisplay hanya untuk owner.
> Saya memakai Tailwind CSS untuk form login, register, tambah/edit product, dan detail product.
> Lalu, untuk daftar produk saya menggunakan grid responsive (1–3 kolom). Dengan kondisi, Jika tidak ada product: tampilkan gambar “No product” + pesan + tombol Add Product. Jika ada product: tampilkan setiap product dengan card + tombol Edit/Delete untuk owner.
> Selanjutnya, membuat navbar responsive, conditional rendering, dan testing untuk cek tombol muncul sesuai user, responsive design, placeholder product jika kosong.