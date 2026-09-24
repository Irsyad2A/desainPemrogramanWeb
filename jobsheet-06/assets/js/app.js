function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");

    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        console.log(e.target);

        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");

        if (yakin && row) {
            row.remove();
            if (typeof updateCounter === "function") updateCounter();
        }
    });
}

async function muatDataUmum(url, tbodySelector, renderRowCallback, colspanSize) {
    const tbody = document.querySelector(tbodySelector);
    const loading = document.getElementById("loading-indicator");
    if (!tbody || !loading) return;

    loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        
        const dataArray = await res.json();
        dataArray.forEach(function (item) {
            const tr = document.createElement("tr");
            tr.innerHTML = renderRowCallback(item);
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML = "<tr><td colspan=\"" + colspanSize + "\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        loading.style.display = "none";
        if (typeof updateCounter === "function") updateCounter();
    }
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector("table");

    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach(function (row) {
            const kolomPertama = row.querySelector("td");
            if (kolomPertama) {
                const teks = kolomPertama.textContent.toLowerCase();
                row.style.display = teks.includes(keyword) ? "" : "none";
            }
        });
        if (typeof updateCounter === "function") updateCounter();
    });

    if (typeof updateCounter === "function") updateCounter();
}

function updateCounter() {
    const counterText = document.getElementById("row-counter");
    if (!counterText) return;
    
    const barisTerlihat = document.querySelectorAll("tbody tr:not([style*='display: none'])").length;
    counterText.textContent = "Menampilkan " + barisTerlihat + " data";
}

function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

     form.addEventListener("submit", function (e) {
        let valid = true;

        const fieldWajib = ['judul', 'nama', 'pengarang'];
        
        fieldWajib.forEach(function (namaField) {
            const field = form.querySelector("[name='" + namaField + "']");
            if (field) {
                if (field.value.trim() === "") {
                    tampilkanError(field, "Field ini wajib diisi.");
                    valid = false;
                } else {
                    hapusError(field);
                }
            }
        });

        const tahun = form.querySelector("[name='tahun']");
        if (tahun) {
            const nilai = parseInt(tahun.value, 10);
            if (isNaN(nilai) || nilai < 1900 || nilai > 2026) {
                tampilkanError(tahun, "Tahun harus di antara 1900-2026.");
                valid = false;
            } else {
                hapusError(tahun);
            }
        }

        const stok = form.querySelector("[name='stok']");
        if (stok) {
            const nilai = parseInt(stok.value, 10);
            if (isNaN(nilai) || nilai < 0) {
                tampilkanError(stok, "Stok tidak boleh negatif.");
                valid = false;
            } else {
                hapusError(stok);
            }
        }

        const isbn = form.querySelector("[name='isbn']");
        if (isbn && isbn.value.trim() !== "") {
            const validISBN = /^[0-9-]+$/.test(isbn.value);
            if (!validISBN) {
                tampilkanError(isbn, "ISBN hanya boleh mengandung angka dan tanda hubung.");
                valid = false;
            } else {
                hapusError(isbn);
            }
        }

        if (!valid) {
            e.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});