import express from 'express';
import { simpleParser } from 'mailparser';
import bodyParser from 'body-parser'; // Add this line to import body-parser
import dotenv from 'dotenv';

import connection from './config/email-config.js'; // Import the IMAP configuration
import transporter from './config/nodemail-config.js';

dotenv.config();

const app = express();
// Use body-parser middleware
app.use(bodyParser.json()); // Support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies
const port = process.env.APP_PORT || 3000; // Choose your desired port

// Send Email Endpoint
app.post('/send-email', (req, res) => {
    const { from, to, subject, text } = req.body;

    const mailOptions = {
        from,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

// Read Email Endpoint
app.get('/read-emails', async (req, res) => {
    const emails = [];
    try {
        connection.once('ready', function () {
            connection.openBox('INBOX', true, function (err, box) {
                if (err) throw err;
                connection.search(['UNSEEN', ['SINCE', 'July 20, 2024']], function (err, results) {
                    if (err) throw err;
                    var f = connection.fetch(results, { bodies: '' });
                    f.on('message', function (msg, seqno) {
                        console.log('Message #%d', seqno);
                        var prefix = '(#' + seqno + ') ';
                        msg.on('body', async function (stream, info) {
                            console.log(prefix + 'Body');
                            const parsed = await simpleParser(stream)
                            // console.log(parsed)
                            fs.writeFileSync(`msg-${seqno}-body.txt`, JSON.stringify(parsed), 'utf8')
                            // write to file
                            // stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
                        });
                        msg.once('attributes', function (attrs) {
                            console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                        });
                        msg.once('end', function () {
                            console.log(prefix + 'Finished');
                        });
                    });
                    f.once('error', function (err) {
                        console.log('Fetch error: ' + err);
                    });
                    f.once('end', function () {
                        console.log('Done fetching all messages!');
                        connection.end();
                    });
                });
            });
        });
        connection.end();

        res.status(200).json(emails);

        connection.once('error', function (err) {
            console.log(err);
        });

        connection.once('end', function () {
            console.log('Connection ended');
        });

        connection.connect();

    } catch (error) {
        console.log('Error reading emails:', error);
        res.status(500).json({ error: 'Failed to read emails' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
