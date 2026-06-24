const selfsigned = require('selfsigned');
const fs = require('fs');

async function createCertificates() {
    console.log("Generating offline SSL keys, please wait...");
    const attrs = [{ name: 'commonName', value: 'localhost' }];
    const pems = await selfsigned.generate(attrs, { days: 365 });
    
    fs.writeFileSync('server.key', pems.private);
    fs.writeFileSync('server.crt', pems.cert);
    console.log("✅ Success! server.key and server.crt generated successfully.");
}

createCertificates();
