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
        const connection = new imap(imapOptions);
        connection.connect();

        await new Promise((resolve, reject) => connection.once('ready', resolve));
        await new Promise((resolve, reject) => connection.once('error', reject));

        try {
            const box = await new Promise((resolve, reject) => {
                connection.openBox('INBOX', true, (err, box) => {
                    if (err) reject(err);
                    else resolve(box);
                });
            });

            const results = await new Promise((resolve, reject) => {
                connection.search([['UNSEEN']], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });

            for (let messageId of results) {
                const messages = await new Promise((resolve, reject) => {
                    connection.fetch(messageId, { bodies: ['HEADER.FIELDS (SUBJECT FROM DATE)', 'TEXT'] }, (err, messages) => {
                        if (err) reject(err);
                        else resolve(messages);
                    });
                });

                for (let message of messages) {
                    const parsed = await new Promise((resolve, reject) => {
                        simpleParser(message.body, (err, parsed) => {
                            if (err) reject(err);
                            else resolve(parsed);
                        });
                    });

                    emails.push({
                        subject: parsed.subject,
                        from: parsed.from,
                        date: parsed.date,
                        text: parsed.text,
                    });
                }
            }
        } catch (error) {
            console.log('Error processing emails:', error);
            res.status(500).json({ error: 'Failed to process emails' });
            return;
        }

        res.status(200).json(emails);
    } catch (error) {
        console.log('Error reading emails:', error);
        res.status(500).json({ error: 'Failed to read emails' });
    } finally {
        connection.end();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
