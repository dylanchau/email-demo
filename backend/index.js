import express from 'express';
import { simpleParser, MailParser } from 'mailparser';
import bodyParser from 'body-parser';
import { inspect } from 'util';
import moment from 'moment';
import { buildAttMessageFunction, findAttachmentParts } from './utils/index.js'
import fs from 'fs';
import dotenv from 'dotenv';

import connection from './config/email-config.js';
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
                connection.search(['UNSEEN', ['SINCE', '2024-08-01']], function (err, results) {
                    if (err) throw err;
                    var f = connection.fetch(results, { bodies: '' });
                    f.on('message', function (msg, seqno) {
                        console.log('Message #%d', seqno);
                        var prefix = '(#' + seqno + ') ';
                        msg.on('body', async function (stream, info) {
                            console.log(prefix + 'Body');
                            const parsed = await simpleParser(stream)
                            // console.log(parsed)
                            fs.writeFileSync(`msg-${seqno}-body.json`, JSON.stringify(parsed), 'utf8')
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

app.get('/read-sent-mails', async (req, res) => {
    console.log('afer open mail box');
    const result = []
    try {
        connection.once('ready', () => {
            connection.openBox('[Gmail]/Sent Mail', true, (err, box) => {
                if (err) {
                    console.error('Error opening Sent box:', err);
                    res.status(500).send('Error opening Sent box');
                    return;
                }


                // Search for unread messages sent today
                const searchCriteria = ['ALL', ['SINCE', '2024-08-01']];
                connection.search(searchCriteria, (err, results) => {
                    if (err) {
                        console.error('Error searching for messages:', err);
                        res.status(500).send('Error searching for messages');
                        return;
                    }

                    // Fetch messages and parse their content
                    const fetchedMessages = [];
                    const f = connection.fetch(results, { bodies: '' });

                    f.on('message', (msg, seqno) => {
                        console.log('Message #%d', seqno);
                        const prefix = `(#'${seqno}') `;

                        msg.on('body', async (stream, info) => {
                            console.log(prefix + 'Body');
                            const parsed = await simpleParser(stream);
                            // console.log(parsed)
                            fs.writeFileSync(`msg-${seqno}-body.json`, JSON.stringify(parsed), 'utf8');
                            fetchedMessages.push(parsed); // Add parsed message to the array
                        });

                        msg.once('attributes', (attrs) => {
                            console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                        });

                        msg.once('end', () => {
                            console.log(prefix + 'Finished');
                        });
                    });

                    f.once('error', (err) => {
                        console.error('Fetch error: ' + err);
                        res.status(500).send('Error fetching messages');
                    });

                    f.once('end', () => {
                        console.log('Done fetching all messages!');
                        connection.end();

                        // Send the parsed messages as the response
                        // res.json(fetchedMessages);
                    });
                });
            });
        });

        connection.end()

        res.status(200).json({})
        connection.once('error', function (err) {
            console.log(err);
        });

        connection.once('end', function () {
            console.log('Connection ended');
        });

        connection.connect();
    } catch (err) {
        console.log('Error reading emails:', err);
        res.status(500).json({ error: 'Failed to read emails' });
    }
})

app.get('/get-boxes', async (req, res) => {
    await listMailboxes()
})

async function listMailboxes() {
    try {

        await connection.connect();

        // Get the list of mailboxes
        const mailboxHierarchy = await connection.getBoxes();
        console.log(mailboxHierarchy);

        // Parse the hierarchy string to extract individual mailboxes
        const mailboxes = mailboxHierarchy.split(/\s+/).filter(mailbox => mailbox !== ''); // Split by whitespace and remove empty entries

        // Print the mailboxes
        console.log('Available mailboxes:');
        for (const mailbox of mailboxes) {
            console.log(`- ${mailbox}`);
        }

        await connection.end();
    } catch (error) {
        console.error('Error listing mailboxes:', error);
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
