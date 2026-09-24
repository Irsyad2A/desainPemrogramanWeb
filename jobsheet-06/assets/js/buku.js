function muatDaftarBuku() {
    muatDataUmum("../data/buku.json", ".table-responsive table tbody", function(buku) {
        return "<td>" + buku.judul + "</td>" +
               "<td>" + buku.pengarang + "</td>" +
               "<td>" + buku.tahun + "</td>" +
               "<td>" + (buku.kategori || "-") + "</td>" +
               "<td>" + buku.stok + "</td>" +
               "<td>" +
               "<button type=\"button\">Edit</button> " +
               "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
               "</td>";
    }, 6);
}

document.addEventListener("DOMContentLoaded", function() {
    muatDaftarBuku();
    
    const btnReload = document.getElementById("btn-reload");
    if (btnReload) {
        btnReload.addEventListener("click", muatDaftarBuku);
    }
});
