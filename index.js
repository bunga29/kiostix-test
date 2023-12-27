const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');  
const flash = require('connect-flash');
const swagger = require('express-jsdoc-swagger');
const db = require("./db_config");
const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const options = {
    info: {
      version: '1.0.0',
      title: 'Tes Kiostix',
      license: {
        name: 'MIT',
      },
    },
    filesPattern: './index.js',
    baseDir: __dirname,
    security: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
  };

swagger(app)(options);


app.get('/number1', (req, res) => {
    res.render('number1');
});
app.get('/number2', (req, res) => {
    res.render('number2');
});
app.get('/number3', (req, res) => {
    res.render('number3');
});

/**
 * A buku type
 * @typedef {object} Buku
 * @property {integer} id.required - id buku
 * @property {string} judul.required - judul buku
 * @property {string} penulis.required - penulis buku
 * @property {string} kategori.required - kategori buku
 */


/**
 * GET /api/buku
 * @summary Menampilkan Data Buku berdasarkan Filter
 * @tags Buku
 * @param {string} judul.query - Judul Buku
 * @param {string} penulis.query - Penulis Buku
 * @param {string} kategori.query - Kategori Buku
 * @return {array<Buku>} 200 - success response - application/json
 */
app.get('/api/buku', (req, res) => {
    let judul = req.query.judul ? req.query.judul : null;
    let penulis = req.query.penulis ? req.query.penulis : null;
    let kategori = req.query.kategori ? req.query.kategori : null;

    const sql = `select 
        b.id as id,
        b.judul as judul,
        k.nama as kategori,
        p.nama as penulis
        from buku b
        left join penulis p 
            on b.id_penulis = p.id 
        left join kategori k 
            on b.id_kategori = k.id
        where
            case 
                when ? is not null then p.nama like CONCAT("%", ? , "%") 
                else (p.nama = p.nama or p.nama is null)
            end
        and 
            case 
                when ? is not null then k.nama like CONCAT("%", ? , "%")
                else (k.nama = k.nama or k.nama is null)
            end
        and
            case 
                when ? is not null then b.judul like CONCAT("%", ? , "%")
                else (b.judul = b.judul or b.judul is null)
            end`;

    db.query(sql, [penulis, penulis,kategori, kategori, judul, judul], (err, rows, field)=>{
        if(err){
           return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: rows });
        
    });
   
});

app.get('/scripting', (req, res) => {
   const sql_buku = `select 
        b.id as id,
        b.judul as judul,
        k.nama as kategori,
        p.nama as penulis
        from buku b
        left join penulis p 
            on b.id_penulis = p.id 
        left join kategori k 
            on b.id_kategori = k.id;`;
    const sql_penulis = `
        select * from penulis;
    `;
    const sql_kategori = `
        select * from kategori;
    `;
    db.query(sql_buku, function(err, result){
        if(err) throw err;
        db.query(sql_penulis, function(err2, result2){
            if(err2) throw err2;
            db.query(sql_kategori, function(err3, result3){
                if(err3) throw err3;

                res.render('scripting', {
                    buku:result,
                    penulis:result2,
                    kategori:result3,
                });
            });
        });
    });
});

// add data buku
app.post('/buku/add', urlencodedParser, function(req, res){
    let judul = req.body.judul;
    let id_kategori = parseInt(req.body.kategori);
    let id_penulis = parseInt(req.body.penulis);

    var form_data = {
        judul,
        id_penulis,
        id_kategori,
        
    };

    db.query('INSERT INTO buku SET ?;', form_data, function(err, result){
        if(err) throw err;

        req.flash('success', 'data buku berhasil ditambahkan');
        res.redirect('/scripting');
    });
});

app.get('/buku/delete/:id', function(req, res){
    let id = req.params.id;
    let sql = 'DELETE FROM buku WHERE id = ?';

    db.query(sql, id, (err, result, field)=>{
        if(err) throw err;
        req.flash('success', 'data buku berhasil dihapus');
        res.redirect('/scripting');
    });
});

// add data kategori
app.post('/kategori/add', urlencodedParser, function(req, res){
    let nama = req.body.nama;

    var form_data = {
        nama,        
    };

    db.query('INSERT INTO kategori SET ?;', form_data, function(err, result){
        if(err) throw err;

        req.flash('success', 'data kategori berhasil ditambahkan');
        res.redirect('/scripting');
    });
});
app.get('/kategori/delete/:id', function(req, res){
    let id = req.params.id;
    let sql = 'DELETE FROM kategori WHERE id = ?';

    db.query(sql, id, (err, result, field)=>{
        if(err) throw err;
        req.flash('success', 'data kategori berhasil dihapus');
        res.redirect('/scripting');
    });
});

// add data penulis
app.post('/penulis/add', urlencodedParser, function(req, res){
    let nama = req.body.nama;

    var form_data = {
        nama,        
    };

    db.query('INSERT INTO penulis SET ?;', form_data, function(err, result){
        if(err) throw err;

        req.flash('success', 'data penulis berhasil ditambahkan');
        res.redirect('/scripting');
    });
});

app.get('/penulis/delete/:id', function(req, res){
    let id = req.params.id;
    let sql = 'DELETE FROM penulis WHERE id = ?';

    db.query(sql, id, (err, result, field)=>{
        if(err) throw err;
        req.flash('success', 'data penulis berhasil dihapus');
        res.redirect('/scripting');
    });
});


app.get('/filter', (req, res) => {
    const sql_penulis = `
        select * from penulis;
    `;
    const sql_kategori = `
        select * from kategori;
    `;

    db.query(sql_penulis, function(err2, result2){
        if(err2) throw err2;
        db.query(sql_kategori, function(err3, result3){
            if(err3) throw err3;

            res.render('filter', {
                penulis:result2,
                kategori:result3,
            });
        });
    });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});