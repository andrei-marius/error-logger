'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    PG_USER,
    PG_PASSWORD,
    PG_HOST,
    PG_PORT,
    PG_DATABASE,
    EMAIL_SENDER,
    PASSWORD_SENDER,
    EMAIL_RECEIVER,
    SLACK_WEBHOOK_URL,
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    postgresConfig: {
        user: PG_USER,
        password: PG_PASSWORD,
        host: PG_HOST,
        port: PG_PORT,
        database: PG_DATABASE,
    },
    emailSender: EMAIL_SENDER,
    passwordSender: PASSWORD_SENDER,
    emailReceiver: EMAIL_RECEIVER,
    slackWebhookUrl: SLACK_WEBHOOK_URL,
};