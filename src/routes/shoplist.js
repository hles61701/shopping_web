const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../db_connect2');
const session = require('express-session');
const moment = require('moment-timezone');
const { relativeTimeRounding } = require('moment-timezone');
const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

router.get('/aroundearsony/:page?', async (req, res) => {
    const perPage = 10;
    let page = parseInt(req.params.page) || 1;
    const output = {
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        rows: []
    };
    const sql = `SELECT * FROM shoplist where brand=? AND headphonetype=? ORDER BY id LIMIT ${(page - 1) * perPage}, ${perPage}`;
    const [result] = await db.query(sql, ['sony', 'aroundear']);
    const t_sql = "SELECT COUNT(1) num FROM `shoplist` where brand=? AND headphonetype=? "; // 取得總筆數
    const [t_r] = await db.query(t_sql, ['sony', 'aroundear']);
    output.totalRows = t_r[0].num; // 總筆數
    output.totalPages = Math.ceil(output.totalRows / perPage); // 總頁數

    if (!output.totalRows) {
        res.render('/');
    }
    if (page < 1) {
        res.render("/aroundearsony/1")
    }
    output.rows = result;
    res.render('address-book/aroundear_sony', output);
});

router.get('/aroundearath/:page?', async (req, res) => {
    console.log('aroundear_ath:', req.session);
    const perPage = 10;
    let page = parseInt(req.params.page) || 1;
    const output = {
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        rows: []
    };
    const sql = `SELECT * FROM shoplist where brand=? AND headphonetype=? ORDER BY id LIMIT ${(page - 1) * perPage}, ${perPage}`;
    const [result] = await db.query(sql, ['ath', 'aroundear']);
    const t_sql = "SELECT COUNT(1) num FROM `shoplist` where brand=? AND headphonetype=? "; // 取得總筆數
    const [t_r] = await db.query(t_sql, ['ath', 'aroundear']);
    output.totalRows = t_r[0].num; // 總筆數
    output.totalPages = Math.ceil(output.totalRows / perPage); // 總頁數

    if (!output.totalRows) {
        res.render('/');
    }
    if (page < 1) {
        res.render("/aroundearath/1")
    }
    output.rows = result;
    res.render('address-book/aroundear_ath', output);
});

router.get('/onearsony/:page?', async (req, res) => {
    const perPage = 10;
    let page = parseInt(req.params.page) || 1;
    const output = {
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        rows: []
    };
    const sql = `SELECT * FROM shoplist where brand=? AND headphonetype=? ORDER BY id LIMIT ${(page - 1) * perPage}, ${perPage}`;
    const [result] = await db.query(sql, ['sony', 'onear']);
    const t_sql = "SELECT COUNT(1) num FROM `shoplist` where brand=? AND headphonetype=? "; // 取得總筆數
    const [t_r] = await db.query(t_sql, ['sony', 'onear']);
    output.totalRows = t_r[0].num; // 總筆數
    output.totalPages = Math.ceil(output.totalRows / perPage); // 總頁數

    if (!output.totalRows) {
        res.render('/');
    }
    if (page < 1) {
        res.render("/onearsony/1")
    }
    output.rows = result;
    res.render('address-book/onear_sony', output);
});

router.get('/onearath/:page?', async (req, res) => {
    const perPage = 6;
    let page = parseInt(req.params.page) || 1;
    const output = {
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        rows: []
    };
    const sql = `SELECT * FROM shoplist where brand=? AND headphonetype=? ORDER BY id LIMIT ${(page - 1) * perPage}, ${perPage}`;
    const [result] = await db.query(sql, ['ath', 'onear']);
    const t_sql = "SELECT COUNT(1) num FROM `shoplist` where brand=? AND headphonetype=? "; // 取得總筆數
    const [t_r] = await db.query(t_sql, ['ath', 'onear']);
    output.totalRows = t_r[0].num; // 總筆數
    output.totalPages = Math.ceil(output.totalRows / perPage); // 總頁數

    if (!output.totalRows) {
        res.render('/');
    }
    if (page < 1) {
        res.render("/onearath/1")
    }
    output.rows = result;
    res.render('address-book/onear_ath', output);
});

router.get('/inearsony/:page?', async (req, res) => {
    const perPage = 10;
    let page = parseInt(req.params.page) || 1;
    const output = {
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        rows: []
    };
    const sql = `SELECT * FROM shoplist where brand=? AND headphonetype=? ORDER BY id LIMIT ${(page - 1) * perPage}, ${perPage}`;
    const [result] = await db.query(sql, ['sony', 'inear']);
    const t_sql = "SELECT COUNT(1) num FROM `shoplist` where brand=? AND headphonetype=? "; // 取得總筆數
    const [t_r] = await db.query(t_sql, ['sony', 'inear']);
    output.totalRows = t_r[0].num; // 總筆數
    output.totalPages = Math.ceil(output.totalRows / perPage); // 總頁數

    if (!output.totalRows) {
        res.render('/');
    }
    if (page < 1) {
        res.render("/inearsony/1")
    }
    output.rows = result;
    res.render('address-book/inear_sony', output);
});

router.get('/inearath/:page?', async (req, res) => {
    const perPage = 10;
    let page = parseInt(req.params.page) || 1;
    const output = {
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        rows: []
    };
    const sql = `SELECT * FROM shoplist where brand=? AND headphonetype=? ORDER BY id LIMIT ${(page - 1) * perPage}, ${perPage}`;
    const [result] = await db.query(sql, ['ath', 'inear']);
    const t_sql = "SELECT COUNT(1) num FROM `shoplist` where brand=? AND headphonetype=? "; // 取得總筆數
    const [t_r] = await db.query(t_sql, ['ath', 'inear']);
    output.totalRows = t_r[0].num; // 總筆數
    output.totalPages = Math.ceil(output.totalRows / perPage); // 總頁數

    if (!output.totalRows) {
        res.render('/');
    }
    if (page < 1) {
        res.render("/inearath/1")
    }
    output.rows = result;
    res.render('address-book/inear_ath', output);
});




//INSERT INTO shopping_cart----------------------------------------------------------------------------------------------------------------------


router.post('/add', async (req, res) => {
    // const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    // console.log(b.attr("data-name"));
    
    const output = {
            success: false,
            body: req.body,
            sess: req.session

    }; 
    const a=req.body.product_id ;
    const b=req.body.product_name;
    const c=req.session.adminUser.account;
    const d=req.session.adminUser.name;
    // console.log(req.body);
    // TODO: 檢查欄位的格式
    // if (!email_pattern.test(req.body.email)) {
    //         output.error = 'Email 格式不符';
    //         return res.json(output);

    // }
   
console.log("output:",output);
    const sql = "INSERT INTO `shopping_cart` ( `product_id`, `product_name`, `account`, `member_name`) VALUES (?,?,?,?)";
    console.log(req.session.adminUser.account);
    const [result] = await db.query(sql, [a,b,c,d]);

    if (result.affectedRows === 1 && result.insertId) {
            output.success = true;

    }



    output.result = result;
    res.json(output);

});


//-------------------------------------------------------------------------------------------------------------------------
router.get('/product/:id?', async (req, res) => {
    const sql = `SELECT * FROM shoplist WHERE id=?`;
    console.log("req.params.id:",req.params.id);
    const[result] = await db.query(sql,[req.params.id]);
    
    
    const output = {
        rows:[]
    };

    // res.json(result[0]);
    console.log("result:",result);
    output.rows = result;
    

    // res.json(output);
    res.render('address-book/product',output);



});





module.exports = router;