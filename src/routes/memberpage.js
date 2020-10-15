const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../db_connect2');
const session = require('express-session');
const moment = require('moment-timezone');
const { relativeTimeRounding } = require('moment-timezone');
const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

router.get('/login', (req, res) => {
    res.render('address-book/login');

});

router.post('/login', async (req, res) => {
    const status = {
        login: false,
        info: 'error',
        acinfo: []
    }
    const sql = "select account from `member_book` where account=? AND password=? ";
    const [membervalid] = await db.query(sql, [req.body.account, req.body.password]);

    if (membervalid.length) {
        req.session.adminUser = membervalid[0];
        status.login = true;
        status.info = '';
    }


    res.json(status);
    // res.render('address-book/login', status);
})

router.get('/memberpage', async (req, res) => {
    const output = {
        rows: []
    }
    const accountname = req.session.adminUser.account
    const sql = "select * from `member_book` where account=?";
    const [membershow] = await db.query(sql, [accountname]);
    membershow.forEach((el) => {
        el.birthday = moment(el.birthday).format('YYYY-MM-DD');
    });
    output.rows = membershow;
    res.render('address-book/member_main', output);
})

router.get('/logout', (req, res) => {
    delete req.session.adminUser;
    res.send(`<script>location.href="/"</script>`);
    // if (req.get('Referer')) {
    //     res.redirect(req.get('Referer'));
    // } else {
    //     res.redirect('/');
    // }
});

router.get('/memberedit', async (req, res) => {
    const output = {
        rows: []
    }
    const accountname = req.session.adminUser.account
    console.log('membrget', accountname);
    const sql = "select * from `member_book` where account=?";
    const [membershow] = await db.query(sql, [accountname]);
    membershow.forEach((el) => {
        el.birthday = moment(el.birthday).format('YYYY-MM-DD');
    });
    output.rows = membershow;
    res.render('address-book/member_edit', output);
})

router.post('/memberedit', async (req, res) => {
    const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const output = {
        success: false,
        body: req.body,
        error: "X"

    };
    // TODO: 檢查欄位的格式
    // if (!email_pattern.test(req.body.email)) {
    //     output.error = 'Email 格式不符';
    // return res.json(output);

    // }
    const updateData = { ...req.body };
    console.log('account',req.session.adminUser.account);
    const sql = "UPDATE `member_book` SET ? WHERE `account`=?";
    const [result] = await db.query(sql, [req.body, req.session.adminUser.account]);
    console.log('edit: ', req.body);

    output.success = true;
    output.result = result;
    res.json(output);
    // res.redirect('/');

});

router.get('/add', (req, res) => {
    res.render('member-book/add');
});

router.post('/add', async (req, res) => {
    // const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const output = {
        success: false,
        body: req.body

    };
    // TODO: 檢查欄位的格式
    if (!email_pattern.test(req.body.email)) {
        output.error = 'Email 格式不符';
        return res.json(output);

    }
    const sql = "INSERT INTO `member_book` SET ?";
    const [result] = await db.query(sql, [req.body]);

    if (result.affectedRows === 1 && result.insertId) {
        output.success = true;

    }
    output.result = result;
    res.json(output);

});

module.exports = router;