var fs = require("fs"),
  passport = require("passport"),
  SamlStrategy = require("passport-saml").Strategy;
passport.serializeUser(function (user, done) {
  
  done(null, user);
  console.log("serializeUser",user)

});
passport.deserializeUser(function (user, done) {
  console.log("Deseriealize",user)
  done(null, user);
});

passport.use(
  new SamlStrategy(
    {
      // entryPoint: "https://adfs.najm.sa/adfs/ls",
      entryPoint: "https://evodev.adfsevolligenceinternal.com/adfs/ls",  //change 4
      issuer: "Portal",
      // callbackUrl: "https://najmbiexcellence.najm.sa/adfs/postResponse",
      callbackUrl: "https://localhost:3000/adfs/postResponse",  //change 5
      // privateKey: fs.readFileSync("/path/to/acme_tools_com.key", "utf-8"),
      // cert: fs.readFileSync("/path/to/adfs.acme_tools.com.crt", "utf-8"),
      // other authn contexts are available e.g. windows single sign-on
      authnContext: [
        "http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/password",
      ],
      //identifierFormat: null,
      // this is configured under the Advanced tab in AD FS relying party
      signatureAlgorithm: "sha256",
      racComparison: "exact", // default to exact RequestedAuthnContext Comparison Type
      // From the metadata document
      // audience: "https://adfs.najm.sa/FederationMetadata/2007-06/FederationMetadata.xml",
      audience: "https://evodev.adfsevolligenceinternal.com/FederationMetadata/2007-06/FederationMetadata.xml",  //changes 6

    },
    function (profile, done) {
      return done(null, {
        upn: profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn"],
        // e.g. if you added a Group claim
        group: profile["http://schemas.xmlsoap.org/claims/Group"],
      });
    } 
  )
);

module.exports = passport;