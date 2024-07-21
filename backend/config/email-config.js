import imap from 'imap'

const imapOptions = {
  user: process.env.USER,
  password: process.env.APP_PASS,
  host: process.env.IMAP_POP3_HOST,
  port: process.env.IMAP_POP3_PORT,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false
  }
};

const connection = new imap(imapOptions);

export default connection;