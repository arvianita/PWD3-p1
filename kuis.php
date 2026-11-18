<?php
require_once "try.php";

// ===== Segitiga Siku-siku =====
$siku = new SegitigaSikuSiku();
$siku->setAlas(5);
$siku->setTinggi(12);

echo "Tipe Segitiga : " . get_class($siku) . "<br/>";
echo "Alas segitiga adalah : " . $siku->getAlas() . "<br/>";
echo "Tinggi segitiga adalah : " . $siku->getTinggi() . "<br/>";
echo "Sisi miring adalah : " . $siku->sisiMiring() . "<br/>";
echo "Luas segitiga adalah : " . $siku->luas() . "<br/>";
echo "Keliling segitiga adalah : " . $siku->keliling() . "<br/>";

echo "<br/><br/>";

// ===== Segitiga Sama Kaki =====
$kaki = new SegitigaSamaKaki();
$kaki->setSisi(8, 5);

echo "Tipe Segitiga : " . get_class($kaki) . "<br/>";
echo "Alas segitiga adalah : " . $kaki->getAlas() . "<br/>";
echo "Kaki segitiga adalah : " . $kaki->getKaki() . "<br/>";
echo "Tinggi segitiga adalah : " . $kaki->getTinggi() . "<br/>";
echo "Luas segitiga adalah : " . $kaki->luas() . "<br/>";
echo "Keliling segitiga adalah : " . $kaki->keliling() . "<br/>";

echo "<br/><br/>";

// ===== Segitiga Sama Sisi =====
$sisi = new SegitigaSamaSisi();
$sisi->setSisi(10);

echo "Tipe Segitiga : " . get_class($sisi) . "<br/>";
echo "Sisi segitiga adalah : " . $sisi->getSisi() . "<br/>";
echo "Tinggi segitiga adalah : " . round($sisi->getTinggi(), 2) . "<br/>";
echo "Luas segitiga adalah : " . round($sisi->luas(), 2) . "<br/>";
echo "Keliling segitiga adalah : " . $sisi->keliling() . "<br/>";
?>
