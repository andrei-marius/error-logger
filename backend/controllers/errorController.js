'use strict';

const nodemailer = require('nodemailer');
const config = require('../config');
const pool = require('../db');

const sendMsgOnSlack = async (client, msg, stack) => {
    await fetch(config.slackWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Error on ${client}`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": msg
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": stack
                    }
                },
            ]
        })
    })
}

const sendEmail = async (client, msg, stack) => {
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: config.emailSender,
            pass: config.passwordSender,
        },
    })
    
    const options = {
        from: config.email,
        to: config.emailReceiver,
        subject: `Error on ${client}`,
        text: msg + '\n' + stack,
    }

    await mailTransporter.sendMail(options);
}

const addError = async (req, res) => {
    try {
        const data = req.body;
        const { message, stack, timestamp, client } = req.body.errorInfo;

        const newError = await pool.query(
            `INSERT INTO error
            (message, stack, timestamp, client)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
            [message, stack, timestamp, client]
        );

        if (data.method === 'slack') {
            await sendMsgOnSlack(client, message, stack);
        }

        if (data.method === 'email') {
            await sendEmail(client, message, stack);
        }

        if (data.method === 'slack_email') {
            await sendMsgOnSlack(client, message, stack);
            await sendEmail(client, message, stack);
        }

        res.json(newError.rows[0]);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getErrors = async (req, res) => {
    try {
        const allErrors = await pool.query(
            'SELECT * FROM error'
        );
        if (allErrors.rows.length === 0) {
            res.json('No record');
        } else {
            res.json(allErrors.rows);
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const deleteError = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteError = await pool.query(
            'DELETE FROM error WHERE id = $1',
            [id]
        );
        res.json(`Error ${id} deleted`);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const deleteErrors = async (req, res, next) => {
    try {
        const deleteErrors = await pool.query(
            'DELETE FROM error'
        );
        res.json('Errors deleted');
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {
    addError,
    getErrors,
    deleteError,
    deleteErrors,
}