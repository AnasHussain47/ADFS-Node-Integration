var util = require('util');
var https = require('https');
var app = require('express')();
var cookieParser = require('cookie-parser');
var passport = require('passport');
const bodyParser = require("body-parser");
var fs = require('fs');
var SamlStrategy = require('passport-saml').Strategy;
var path = require("path");

const root = __dirname;
const verifyFunction = function(profile, done) {
    console.log("Verifying", profile);
    return done(null,
        {
            upn: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn'],
            // e.g. if you added a Group claim
            group: profile['http://schemas.xmlsoap.org/claims/Group']
        });
};

var strategy = new SamlStrategy(
    {
        // entryPoint: 'https://evodev.adfsevolligenceinternal.com/adfs/ls',
        // issuer: 'https://localhost:3000',
        // callbackUrl: 'https://localhost:3000/adfs/postResponse',
        // // privateCert: fs.readFileSync(root + '/acme_tools_com.key', 'utf-8'),
        // // cert: fs.readFileSync(root + '/acme_tools_com.cert', 'utf-8'),
        // authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/password',
        // // not sure if this is necessary?
        // acceptedClockSkewMs: -1,
        // identifierFormat: null,
        // signatureAlgorithm: 'sha256'

        entryPoint: 'https://evodev.adfsevolligenceinternal.com/adfs/ls',
        issuer: 'https://localhost:3000/adfs/postResponse',
        callbackUrl: 'https://localhost:3000/adfs/postResponse',
        privateKey: fs.readFileSync("./cert/ADFS-Signin.pem", "utf-8"),
        cert: 'MIIDADCCAeigAwIBAgIQLgAWLeI9KKxPB9QajtxzRDANBgkqhkiG9w0BAQsFADA8MTowOAYDVQQDEzFBREZTIFNpZ25pbmcgLSBFdm9EZXYuYWRmc2V2b2xsaWdlbmNlaW50ZXJuYWwuY29tMB4XDTIyMTIyMzExMjYwNFoXDTIzMTIyMzExMjYwNFowPDE6MDgGA1UEAxMxQURGUyBTaWduaW5nIC0gRXZvRGV2LmFkZnNldm9sbGlnZW5jZWludGVybmFsLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALGlRFn9zBMtaOOsLQ2dlzXs83lGKi6JXhrO8v2UG2ro+nGq0J+EmX/O9ZFI3KRNLL+MSiJdUWoFRMDHNQRnq/+LGz2jH0uSZo+XxX+KchvH6k/S938p8HjTkZv7v0xfQLSMUMEBrsF7MKMcpnD0uj/DA6mit5LwPsoBUZuhEmkwm60PuQqUnH7zhbMfN1gRciZi27Ocd94teJkRqIMKdCibAyc0yCEvTbx7HDyRzHIfACR8n/xiVKGztd4R2yOP59sPw0fth8Yn7KCzA7AFbuEd3Gd91Dv1vM3o2E/Ic4YpbNV8GUap2eeMpqAMKBWRWpw0P/w14eP0oxI/1p7TCnkCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAYHIIfgqWw07JFJzraNIH8bGJTiQoBulWbmf3f+tyNWm8EcjERnr85LjeqQ4ws/krwfI42wYfijsrie0ZkbVlJGJ2rxf3jyLFMEaeXa33rB66iRW9FwFj0h2xo2SIX7rqriAFFdgkPV1cSDC118FtSCfny5xW5ad9yWjNlRyP4BJfq+uA4XHZhMBcYFsJ4P1pdX4srHBICW8yJ2FDMu5VqLSfL6YYkII9C9CcN2uSStNXc3Uhab/Rm3B+5kVAuGvUDyg6DnYENNAOQLKV4R+KtTWJ/9U1teO8eiV439GnLSipB4wC/rogQSbXhdT4cUaZvsD4SGlBirTZR9Cs62VuPg==',
        authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/password',
        acceptedClockSkewMs: -1,
        identifierFormat: null,
        signatureAlgorithm: 'sha256'
    },
    verifyFunction
);

strategy.userProfile = function(accessToken, done) {
    console.log("UserProfile:" + accessToken);
    done(null, accessToken);
};


passport.use('saml', strategy);
passport.serializeUser(function(user, done) {
    console.log("Serializing user");
    done(null, user);
    console.log("user Serializing",user)

});
passport.deserializeUser(function(user, done) {
    console.log("Deserializing user",user);
    done(null, user);
});

function validateAccessToken(accessToken) {
    console.log("AccessToken: "+ accessToken);
    return;
}


// Configure express app
app.use(cookieParser());
app.use(passport.initialize());

app.get('/login',
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true })
);
// app.post('/adfs/postResponse',
//     function(req, res, next) {
//         console.log("Before authenticating: " );
//         next();
//     },
//     passport.authenticate('provider', { failureRedirect: '/', failureFlash: true }),
//     function(req, res) {
//         console.log("User: " + util.inspect(req.user));
//         res.cookie('accessToken', req.user);
//         res.redirect('/');
//     }
// );

// app.post('/adfs/postResponse',
//     (req, res) => {
//         // console.log('Post Response ',res);
//          console.log('Post request ',req);

//         // console.log('res azeem ',res);
//         // console.log("UserANas: " + req.secret);
//         // res.cookie('accessToken', req);

//         passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
//         function(req, res) {
//             // console.log("User: " + util.inspect(req.user));
//             // res.cookie('accessToken', req.user);
//             // res.redirect('/');

//             console.log('anas ',res);
//             console.log('azeem ',req);
//         }
//         res.send("<p>success</p>");
//     }
// );

app.post("/adfs/postResponse",
    bodyParser.urlencoded({ extended: false }),
    passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
    function (req, res) {
      res.redirect("/");
      //res.send("<p>success</p>");
    }
  );

app.get('/', function (req, res) {
    req.user = req.cookies['accessToken'];
    res.send(
        !req.user ? '<a href="/login">Log In</a>' : '<a href="/logout">Log Out</a>' +
        '<pre>' + JSON.stringify(req.user, null, 2) + '</pre>');
});
app.get('/logout', function (req, res) {
    res.clearCookie('accessToken');
    res.redirect('/');
});



const key = fs.readFileSync('./cert/selfsigned.key');
const cert = fs.readFileSync('./cert/selfsigned.crt');
const options = {
  key: key,
  cert: cert
};

let server = https.createServer(options, app);
server.listen(3000, function () {       
    console.log('Express server started on port 3000 HTTPS');  
  });
