module.exports = {
  development: {
    app: {
      name: 'Passport SAML strategy example',
      port: process.env.PORT || 3000
    },
    // passport: {
    //   strategy: 'saml',
    //   saml: {
    //     path: process.env.SAML_PATH || '/login/callback',
    //     entryPoint: process.env.SAML_ENTRY_POINT || 'https://evodev.evodev.com/adfs/oauth2/authorize',
    //     issuer: 'passport-saml',
    //     // cert: process.env.SAML_CERT || null
    //     cert: "MIIC3jCCAcagAwIBAgIQHb/mxgiSD7BM0ryTuM4unDANBgkqhkiG9w0BAQsFADArMSkwJwYDVQQDEyBBREZTIFNpZ25pbmcgLSBFdm9EZXYuRXZvRGV2LmNvbTAeFw0yMjExMjUxNjQzNDhaFw0yMzExMjUxNjQzNDhaMCsxKTAnBgNVBAMTIEFERlMgU2lnbmluZyAtIEV2b0Rldi5Fdm9EZXYuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsGHNtiZK7ksSogZFbAfDlm5LsrVRvQjhIRsMXxG/6k9DQVvl30dxHL7lP5+bQO5ejY/3XkiUeWFCEz4hC24mQEY0HWl7PE9MgQ2M5j3DJ7uqbZSZUy7mQBM93UIt0OrWnA3tDcaG1STUuGNOH4VQEa+Luwxnw4MBtN9Ytt2N2yGgCTL2HzRiL9EpNIW0jFe8pKboxIZ4tEhAhPK2a0otpwSOln8moFV79NJFTkTQV/A7F4g6+vdxFsTcxZXF//JaHFT0q9dxyL27JIBbaEmeD/j4KCb0IT08AJkGZsiQWxc1JcOjLugy/BykaSvRsjI92bQLQVz6tyahbUb/Tp9TSQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBt7z7foqLNvBmSrml2x0i9LgPYfhbHFN+gwUMC8I1+txtbHop+5hdBqCRp4GH/MwFPAUn6H8xXh787ZYUO65lnDJ2sLwVJ7ZgrJcGnfVvYs5WYb8zuZoegpIFLvRb4253hY7BxKOB3KNgU64gWbZwpRfy1m0uhcYzQiPb41ENcvaMAxNJtA6t7lah0G2k5NAE7PHETegqrZ4Yt+dg6Y9/GUsM2Vjb4eKruh5V4ZrR/66zLuF+iqVxXyB2wAnhQTfLGnFm1FMry7sjJzz2/o890Dmjtj7nPfvt7gHjqzfv89UvnFIYy5FIe8X6hjlVOK86VKMN1txVLYESRtf6M6fSR"
    //   }
    // }

    passport: {
      strategy: 'saml',
      saml: {
        // entryPoint: 'https://adfs.najm.sa/adfs/ls',
        entryPoint: 'https://evodev.adfsevolligenceinternal.com/adfs/ls',      //change 2              
        // path: 'http://localhost:3000/login/callback',       
        //path: 'http://test1.com.au',       
        // path:'https://najmbiexcellence.najm.sa:3000/profile',
        path:'https://evodev.adfsevolligenceinternal.com:3000/profile', //change 3
        issuer: 'passport-saml',        
        cert: "MIIC2jCCAcKgAwIBAgIQchF70+m2DYZEqhOlkjGmTDANBgkqhkiG9w0BAQsFADApMScwJQYDVQQDEx5BREZTIEVuY3J5cHRpb24gLSBBREZTLm5ham0uc2EwHhcNMjIwMzEyMTYzNDQwWhcNMjMwMzEyMTYzNDQwWjApMScwJQYDVQQDEx5BREZTIEVuY3J5cHRpb24gLSBBREZTLm5ham0uc2EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCxHDSmj2FF35M60kp6oCXMS3nfVvdJlGvKLEXbV8Pk9SFgnokR8a5rsthOmJdifuJUq7mHkejSfhQrgteuzipoYN+2yo8BvfHOdBOcJvSu+O4cZkEVJR5sykN9s2nO5BqqR02piAtbAKHZs6Vo2/9HYlgB52+qSmjRLh1veb1s6QHk1Or5Gg4XIRzvMeNHeIB2PfxwgxbqIgn7es4gmvBR6QCTJBHE4MC2EVuxPsMW7WdY8n1yhnaUfAnoDMyY8/N75e7EXQ88qtQGXXUsLu0nMHD6FuGTq951PYOPUSHLXurexa/Zr999ocsy7qX6mOgmFpkMwBkQ01JzlL+PktF5AgMBAAEwDQYJKoZIhvcNAQELBQADggEBAIR6tuM9/XFG74fdPuiH9yKHiTqH/roAnlIR1mBL6vX5OW64KhoDAOesDePvGxM+Nety/cSuFrYtZUEMkFIxDxY6F8hCKsTaMq6r1MldnZhwkennWpEZjdPAc4cCyHA2W6X6LbaN8fPgw2HnCepWJXMLMHsmKA60CvqUN6yfBjDohJKvMOf9OLBGo/N7LBsgpwztz1nbXVOB/zGvcjkkIlir6yGmRfOTVeYxqwnZPjBOm5plZCjqusmloyes/PQ3BwVhdFdI7BjczDRQ/CTitKui9iul5gAyNKBIDy05Z0iaXzqxFpPnxxlw8Onb4bE5cPYDug3tOqmB71PbsFlRAC0="
      }
    }

  }
};
