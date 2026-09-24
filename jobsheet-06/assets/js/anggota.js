function muatDaftarAnggota() {
    muatDataUmum("../data/anggota.json", ".table-responsive table tbody", function(anggota) {
        return "<td>" + anggota.no_anggota + "</td>" +
               "<td>" + anggota.nama + "</td>" +
               "<td>" + anggota.alamat + "</td>" +
               "<td>" + anggota.no_hp + "</td>" +
               "<td>" +
               "<button type=\"button\">Edit</button> " +
               "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
               "</td>";
    }, 5);
}

document.addEventListener("DOMContentLoaded", function() {
    muatDaftarAnggota();
    
    const btnReload = document.getElementById("btn-reload");
    if (btnReload) {
        btnReload.addEventListener("click", muatDaftarAnggota);
    }
});
