const signer = require('node-signpdf').default
const fs = require('fs')
const { plainAddPlaceholder } = require('node-signpdf/dist/helpers');

const pdfSignedPath = `./signed.pdf`;
const pdfBuffer = fs.readFileSync(`./unsigned.pdf`);
const certBuffer = fs.readFileSync(`./vtest-com.pfx`);

let inputBuffer = plainAddPlaceholder({
    pdfBuffer,
    reason: 'Signed Certificate.',
    contactInfo: 'sign@example.com',
    name: 'Example',
    location: 'Israel',
    signatureLength: certBuffer.length,
});

const signedPdf = signer.sign(
  inputBuffer,
  certBuffer,
  { asn1StrictParsing : true },
);

fs.writeFileSync(pdfSignedPath, signedPdf);