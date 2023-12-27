## Nomor 1
fungsi `get_max()` untuk mendapatkan nilai Maksimal sedangkan fungsi `get_min()` untuk mendapatkan nilai minimal
```
function get_max(){
    var max = array[0];

    var text = "<br/>";
    for(i=1; i<array.length; i++){
        if(array[i] > max)
            max = array[i];
    }
    text += "nilai Maksimal array tersebut adalah " + max +"</br>";
    document.getElementById("Max").innerHTML = text;
}

function get_min(){

    var min = array[0];
    for(i=1; i<array.length; i++){
        if(array[i] < min)
            min = array[i];
    }

    var text = "<br/> nilai Minimal array tersebut adalah " + min +"</br";

    document.getElementById("Min").innerHTML = text;
}

```
## Nomor 2
Mencetak string sesuai ketentuan
```
function get_string(){
    var str = "";
    for(i = 1; i<100; i++){
        if(i%25==0) str+="KI";
        if(i%40==0) str+="OS";
        if(i%60==0) str+="TIK";
        if(i%99==0) str+="KIOSTIX";
        
    }
    return str;
}
```

## Nomor 3
Mendeteksi apakah sebuah kata merupakan palindrom
```
function is_palindrom(){
    var str = document.getElementById("string").value;
    var result = "<hr/> string \"" + str +"\" => ";

    str = str.toLowerCase();
    var len = str.length;
    for(i = 0; i<len/2; i++){
        if(str[i] !== str[len-1-i]){
            result += "BUKAN PALINDROM </br>";
            document.getElementById("Result").innerHTML = result;
            return;
        }
    }
    result += "PALINDROM </br>";
    document.getElementById("Result").innerHTML = result;
}
```

## Nomor 4
Mendesain Database buku, penulis, dan kategori <br>
![desain db](https://github.com/bunga29/kiostix-test/assets/57172208/6b3a3aa5-af68-46ff-9488-f968f454c1a8)

## Nomor 5
menampilkan data semua buku berdasarkan nama penulis
```
select 
b.judul as judul_buku,
k.nama as kategori,
p.nama as penulis
from buku b
join penulis p 
    on b.id_penulis = p.id 
join kategori k 
    on b.id_kategori = k.id 
where p.nama like '% NAMA PENULIS %';
```

## Nomor 6
menampilkan data buku dan nama penulis berdasarkan kategori
```
select 
b.judul as judul_buku,
k.nama as kategori,
p.nama as penulis
from buku b
join penulis p 
    on b.id_penulis = p.id 
join kategori k 
    on b.id_kategori = k.id 
where k.nama like '% NAMA KATEGORI %';
```



