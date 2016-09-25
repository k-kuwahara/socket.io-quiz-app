var express = require('express'),
    app     = express(),
    router  = express.Router()

// デフォルト
router.get('/', require_user_login, (req, res) => {
   res.redirect('/login')
})

// 管理画面
router.get('/admin/*', require_admin_login, (req, res, next) => {

})

// 管理者ログインチェック
function require_user_login(req, res, next) {
   if (req.session.user_login) {
      // ログインチェックがTRUEの場合、任意のURLにルーティングされる
      next()
   } else {
      // FALSEの場合、/loginにリダイレクトされる
      res.redirect('/login');
   }
}

// 管理者ログインチェック
function require_admin_login(req, res, next) {
   if (req.session.admin_login) {
      // ログインチェックがTRUEの場合、任意のURLにルーティングされる
      next()
   } else {
      // FALSEの場合、/loginにリダイレクトされる
      res.redirect('/admin/login');
   }
}

module.exports = router