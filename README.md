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
