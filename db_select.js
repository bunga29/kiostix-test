const db = require("./db_config");

//nomor 5
// const sql = `select * from buku 
// join penulis on buku.id_penulis = penulis.id 
// where penulis.nama like '%bunga%';`

//nomor 6
const sql = `select 
b.judul as judul_buku,
k.nama as kategori,
p.nama as penulis
from buku b
join penulis p 
    on b.id_penulis = p.id 
join kategori k 
    on b.id_kategori = k.id 
where k.nama like '%novel%';`

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});