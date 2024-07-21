import imap from 'imap'

const imapOptions = {
    user: '',
  password: '',
  host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false
    }
};

const connection = new imap(imapOptions);

export default connection;