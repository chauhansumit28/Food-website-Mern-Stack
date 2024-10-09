export const aesDecryptedText = (value, key) => {
    let Securitykey = process.env.SECRETKEY;
    let bytes = CryptoJS.AES.decrypt(
      value,
      CryptoJS.enc.Utf8.parse(Securitykey),
      {
        iv: CryptoJS.enc.Utf8.parse(key),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
  
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };
  