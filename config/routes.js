
module.exports = function (app, config, passport) {

  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      console.log("Home req",req)
      console.log("is auhenticate res",res)


      res.render('home',
        {
          user: req.user
        });
    } else {
      res.render('home',
        {
          user: null
        });
    }
  });

  app.get('/login',
  
    passport.authenticate(config.passport.strategy,
      
      {
        successRedirect: '/',
        failureRedirect: '/login'
        
      })
      
  );


  app.post(config.passport.saml.path,
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: '/',
        failureFlash: true
      }),
    function (req, res) {
      res.redirect('/');
      console.log("Home",req)
      console.log("Home res",res)


    }
  );

  app.get('/signup', function (req, res) {
    res.render('signup');
    console.log("signup",req)
    console.log("signup",res)
  });

  app.get('/profile', function (req, res) {
    if (req.isAuthenticated()) {
      console.log("request",req)

      res.render('profile',
      
        {
          
          user: req.user
        });
    } else {
      res.redirect('/login');
    }
  });

  app.get('/logout', function (req, res) {
    req.logout();
    // TODO: invalidate session on IP
    res.redirect('/');
  });

};
