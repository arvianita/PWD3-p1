<?php
// ===== Class Turunan =====
class Segitiga {
    private $alas, $tinggi;
    function setAlas($a){
        $this->alas = $a;
    }
    function setTinggi($t){
        $this->tinggi = $t;
    }
    function getAlas(){
        return $this->alas;
    }
    function getTinggi(){
        return $this->tinggi;
    }
    function luas(){
        return ($this->alas * $this->tinggi)/2;
    }
}

// ===== Turunan 1: Segitiga Siku-siku =====
class SegitigaSikuSiku extends Segitiga {

    function sisiMiring(){
        return sqrt(pow($this->getAlas(), 2) + pow($this->getTinggi(), 2));
    }
    function keliling(){
        return $this->getAlas() + $this->getTinggi() + $this->sisiMiring();
    }
}

// ===== Turunan 2: Segitiga Sama Kaki =====
class SegitigaSamaKaki extends Segitiga {
    private $kaki;
    // alas dan kaki diinput, tinggi dihitung otomatis
    function setSisi($alas, $kaki){
        $this->kaki = $kaki;
        $this->setAlas($alas);
        $this->setTinggi(sqrt(pow($kaki, 2) - pow($alas / 2, 2)));
    }
    function getKaki(){
        return $this->kaki;
    }
    function keliling(){
        return $this->getAlas() + (2 * $this->kaki);
    }
}

// ===== Turunan 3: Segitiga Sama Sisi =====
class SegitigaSamaSisi extends Segitiga {
    private $sisi;
    // alas = sisi, tinggi dihitung otomatis
    function setSisi($s){
        $this->sisi = $s;
        $this->setAlas($s);
        $this->setTinggi(($s * sqrt(3)) / 2);
    }
    function getSisi(){
        return $this->sisi;
    }
    function keliling(){
        return 3 * $this->sisi;
    }
}
