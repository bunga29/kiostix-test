const db = require("./db_config");

const sql_create_penulis= `CREATE TABLE penulis
    (
        id int NOT NULL AUTO_INCREMENT,
        nama VARCHAR(255),
        PRIMARY KEY (id)
    )`;
const sql_insert_penulis= `INSERT INTO penulis (nama) VALUES
        ('Bunga Fairuz'),
        ('Muhammad Akbar'),
        ('Fahrezy'),
        ('Agus Wibowo')
    `;

db.query(sql_create_penulis, function (err, result) {
  if (err) throw err;
  console.log("Table penulis berhasil dibuat");
});

db.query(sql_insert_penulis, function (err, result) {
  if (err) throw err;
  console.log("Data penulis berhasil ditambahkan");
});

const sql_create_kategori= `CREATE TABLE kategori
    (
        id int NOT NULL AUTO_INCREMENT,
        nama VARCHAR(255),
        PRIMARY KEY (id)
    )
    `;

const sql_insert_kategori= `
    INSERT INTO kategori (nama) VALUES
        ('Novel'),
        ('Biografi'),
        ('Ensiklopedia'),
        ('Komik')
    `;

db.query(sql_create_kategori, function (err, result) {
  if (err) throw err;
  console.log("Tabel kategori berhasil dibuat");
});

db.query(sql_insert_kategori, function (err, result) {
  if (err) throw err;
  console.log("Data kategori berhasil ditambahkan");
});

const sql_create_buku= `CREATE TABLE buku
    (
        id int NOT NULL AUTO_INCREMENT,
        judul VARCHAR(255),
        id_penulis int,
        id_kategori int,
        PRIMARY KEY (id),
        FOREIGN KEY (id_penulis)
            REFERENCES penulis (id)
            ON DELETE SET NULL,
        FOREIGN KEY (id_kategori)
            REFERENCES kategori (id)
            ON DELETE SET NULL
    )
    `;

const sql_insert_buku= `
    INSERT INTO buku (judul, id_penulis, id_kategori) VALUES
        ('Jalan Pulang', 1, 1),
        ('Bumi', 2, 1),
        ('Si Petarung', 3, 2),
        ('Anak Dermawan', 4, 2),
        ('Fakta Mamalia', 4, 3),
        ('Dunia Bawah Laut', 1, 3),
        ('Super Woman', 3, 4),
        ('Manusia Ikan', 1, 4)
    `;

db.query(sql_create_buku, function (err, result) {
  if (err) throw err;
  console.log("Tabel buku berhasil dibuat");
});

db.query(sql_insert_buku, function (err, result) {
  if (err) throw err;
  console.log("Data buku berhasil ditambahkan");
});

