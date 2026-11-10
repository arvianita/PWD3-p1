// =====================================================
// 1. OBJECT DAN ARRAY
// =====================================================

// Array of object (dibuat dengan cara literal { })
const produk = [
  { id: 1, nama: "Buku Tulis A5",     harga: 8000,  stok: 10 },
  { id: 2, nama: "Pulpen Gel Hitam",  harga: 5000,  stok: 15 },
  { id: 3, nama: "Pensil 2B",         harga: 3000,  stok: 20 },
  { id: 4, nama: "Penghapus Putih",   harga: 2000,  stok: 2 },
  { id: 5, nama: "Stabilo Kuning",    harga: 12000, stok: 1 }
];

// Satu produk dibuat dengan new Object()
const penggaris = new Object();
penggaris.id = 6;
penggaris.nama = "Penggaris 30 cm";
penggaris.harga = 4500;
penggaris.stok = 8;
produk.push(penggaris);

// Array keranjang terpisah
const keranjang = [];
let nomorUrut = 0; // id unik tiap item di keranjang

// =====================================================
// 2. DOM SELECTION
// =====================================================
const daftarProduk     = document.getElementById("daftar-produk");
const daftarKeranjang  = document.getElementById("daftar-keranjang");
const pesanKosong      = document.getElementById("keranjang-kosong");
const ringkasan        = document.querySelector("#ringkasan");

// =====================================================
// Fungsi bantu
// =====================================================
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function escapeHtml(teks) {
  return teks
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function cariProduk(id) {
  for (let i = 0; i < produk.length; i++) {
    if (produk[i].id === id) return produk[i];
  }
  return null;
}

// =====================================================
// 3. DOM MANIPULATION - menampilkan produk
// =====================================================
function tampilkanProduk() {
  daftarProduk.innerHTML = "";

  for (let i = 0; i < produk.length; i++) {
    const p = produk[i];

    const kartu = document.createElement("article");
    kartu.className = "kartu";
    kartu.setAttribute("data-stok", p.stok);

    const judul = document.createElement("h3");
    judul.appendChild(document.createTextNode(p.nama));

    const harga = document.createElement("p");
    harga.className = "harga";
    harga.appendChild(document.createTextNode(formatRupiah(p.harga)));

    const stok = document.createElement("p");
    stok.className = "stok";
    stok.appendChild(document.createTextNode("Stok: " + p.stok));

    const tombol = document.createElement("button");
    tombol.className = "btn btn-utama";
    tombol.appendChild(document.createTextNode("Tambah ke Keranjang"));
    tombol.addEventListener("click", function () {
      tambahKeKeranjang(p.id);
    });

    kartu.appendChild(judul);
    kartu.appendChild(harga);
    kartu.appendChild(stok);
    kartu.appendChild(tombol);
    daftarProduk.appendChild(kartu);
  }

  tandaiStokHabis();
}

// Menandai produk yang stoknya habis (style CamelCase)
function tandaiStokHabis() {
  const semuaKartu = document.getElementsByClassName("kartu");
  const semuaStok  = document.querySelectorAll(".kartu .stok");

  for (let i = 0; i < semuaKartu.length; i++) {
    if (semuaKartu[i].getAttribute("data-stok") === "0") {
      semuaKartu[i].style.backgroundColor = "#fde8e6";
      semuaStok[i].style.fontSize = "1.05rem";
      semuaStok[i].style.color = "#b3261e";
      semuaStok[i].textContent = "Stok habis";
    }
  }
}

// =====================================================
// Keranjang
// =====================================================
function buatItemKeranjang(item) {
  const li = document.createElement("li");

  const info = document.createElement("span");
  info.className = "info";
  info.appendChild(document.createTextNode(item.nama));
  const kecil = document.createElement("small");
  kecil.appendChild(document.createTextNode(formatRupiah(item.harga)));
  info.appendChild(kecil);

  const tombolHapus = document.createElement("button");
  tombolHapus.className = "btn btn-hapus";
  tombolHapus.appendChild(document.createTextNode("Hapus"));
  tombolHapus.addEventListener("click", function () {
    hapusItem(item.uid, li);
  });

  li.appendChild(info);
  li.appendChild(tombolHapus);
  return li;
}

function tambahKeKeranjang(id) {
  const p = cariProduk(id);

  // 4. Pop-up: alert jika stok habis
  if (p.stok === 0) {
    alert("Maaf, stok " + p.nama + " sudah habis!");
    return;
  }

  p.stok--; // stok berkurang setiap kali ditambahkan

  nomorUrut++;
  const item = { uid: nomorUrut, id: p.id, nama: p.nama, harga: p.harga };
  keranjang.push(item); // push() menambah item

  daftarKeranjang.appendChild(buatItemKeranjang(item));
  ringkasan.innerHTML = "";
  tampilkanProduk();
  perbaruiTotal();
}

function hapusItem(uid, elemenLi) {
  // 4. Pop-up: confirm sebelum menghapus
  if (!confirm("Hapus item ini dari keranjang?")) return;

  for (let i = 0; i < keranjang.length; i++) {
    if (keranjang[i].uid === uid) {
      cariProduk(keranjang[i].id).stok++; // kembalikan stok
      keranjang.splice(i, 1);
      break;
    }
  }

  daftarKeranjang.removeChild(elemenLi); // removeChild()
  tampilkanProduk();
  perbaruiTotal();
}

function batalkanTerakhir() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  const terakhir = keranjang.pop(); // pop() membatalkan item terakhir
  cariProduk(terakhir.id).stok++;
  daftarKeranjang.removeChild(daftarKeranjang.lastElementChild);

  tampilkanProduk();
  perbaruiTotal();
}

function kosongkanKeranjang() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }
  // 4. Pop-up: confirm sebelum mengosongkan
  if (!confirm("Kosongkan seluruh keranjang?")) return;

  for (let i = 0; i < keranjang.length; i++) {
    cariProduk(keranjang[i].id).stok++;
  }
  keranjang.length = 0;
  daftarKeranjang.innerHTML = "";
  ringkasan.innerHTML = "";

  tampilkanProduk();
  perbaruiTotal();
}

// 5. Total harga dihitung dengan perulangan for
function hitungTotal() {
  let total = 0;
  for (let i = 0; i < keranjang.length; i++) {
    total += keranjang[i].harga;
  }
  return total;
}

// innerHTML untuk jumlah item dan total harga
function perbaruiTotal() {
  document.getElementById("jumlah-item").innerHTML = keranjang.length;
  document.getElementById("total-harga").innerHTML = formatRupiah(hitungTotal());
  pesanKosong.style.display = keranjang.length === 0 ? "block" : "none";
}

// =====================================================
// Checkout
// =====================================================
function checkout() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong, tambahkan produk dulu.");
    return;
  }

  // 4. Pop-up: prompt untuk nama pembeli
  const namaPembeli = prompt("Masukkan nama pembeli:");
  if (namaPembeli === null || namaPembeli.trim() === "") {
    alert("Checkout dibatalkan karena nama pembeli belum diisi.");
    return;
  }

  const namaItem = [];
  for (const item of keranjang) {
    namaItem.push(item.nama);
  }

  ringkasan.innerHTML =
    "<h3>Ringkasan Pesanan</h3>" +
    "<p>Nama: <strong>" + escapeHtml(namaPembeli.trim()) + "</strong></p>" +
    "<p>Item: " + namaItem.join(", ") + "</p>" +
    "<p>Total: <strong>" + formatRupiah(hitungTotal()) + "</strong></p>";

  // Kosongkan keranjang setelah checkout (stok tetap berkurang)
  keranjang.length = 0;
  daftarKeranjang.innerHTML = "";
  perbaruiTotal();
}

// =====================================================
// Event listener & inisialisasi
// =====================================================
document.getElementById("btn-batal-terakhir").addEventListener("click", batalkanTerakhir);
document.getElementById("btn-kosongkan").addEventListener("click", kosongkanKeranjang);
document.getElementById("btn-checkout").addEventListener("click", checkout);

tampilkanProduk();
perbaruiTotal();