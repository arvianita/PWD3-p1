<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Hasil Latihan</title>
</head>
<body>
<?php
$soal = isset($_POST['soal']) ? $_POST['soal'] : '1';

if ($soal == '1') {
    // ===== SOAL 1: pengulangan 1-10, tampilkan hanya yang genap =====
    echo "<h3>Soal 1: Bilangan Genap dari 1 sampai 10</h3>";
    for ($i = 1; $i <= 10; $i++) {
        if ($i % 2 == 0) {
            echo $i . "<br>";
        }
    }
} else {
    // ===== SOAL 2: tabel perkalian 10 x 10 =====
    echo "<h3>Soal 2: Tabel Perkalian</h3>";
    echo "<table border='1' cellpadding='3'>";

    // Baris header
    echo "<tr>";
    echo "<td>bilangan</td>";
    for ($j = 1; $j <= 10; $j++) {
        echo "<td bgcolor='lime'>$j</td>";
    }
    echo "</tr>";

    // Baris isi
    for ($i = 1; $i <= 10; $i++) {
        echo "<tr>";
        echo "<td bgcolor='lime'>$i</td>";          // kolom pertama hijau
        for ($j = 1; $j <= 10; $j++) {
            $hasil = $i * $j;
            // ganjil = kuning, genap = biru muda (cyan)
            $warna = ($hasil % 2 == 1) ? "yellow" : "cyan";
            echo "<td bgcolor='$warna'>$hasil</td>";
        }
        echo "</tr>";
    }

    echo "</table>";
}
?>
<br>
<a href="index.html">&laquo; Kembali</a>
</body>
</html>
