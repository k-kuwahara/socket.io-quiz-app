'use strict';

var express = require('express'),
    app = express(),
    router = express.Router();

router.get('/', require_user_login, function (req, res) {
   res.redirect('/login');
});

router.get('/admin/*', require_admin_login, function (req, res, next) {});

function require_user_login(req, res, next) {
   if (req.session.user_login) {
      next();
   } else {
      res.redirect('/login');
   }
}

function require_admin_login(req, res, next) {
   if (req.session.admin_login) {
      next();
   } else {
      res.redirect('/admin/login');
   }
}

module.exports = router;