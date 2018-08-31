const { Expo } = require('expo-server-sdk');
const moment = require('moment');

const expo = new Expo();

/**
 * [getMessages description]
 * @param  {[type]} users [description]
 */
function sendPushNotifications(users, data) {
    let messages = [];
    for (const key in users) {
        if (users.hasOwnProperty(key)) {
            const user = users[key];
            if (!Expo.isExpoPushToken(user.expoPushToken)) {
                console.error('Push token ' + user.expoPushToken + ' is not a valid Expo push token');
                continue;
            } else if (user.notifications) {
                messages.push({
                    to: user.expoPushToken,
                    title: 'M' + data.properties.mag + ' - ' + data.properties.flynn_region,
                    body: moment(data.properties.time).format('YYYY-MM-DD HH:mm:ss'),
                    priority: 'high',
                    sound: 'default'
                });
            }
        }
    }
    chunkPushNotifications(messages);
}

/**
 * [chunkPushNotifications description]
 * @param  {[type]} messages [description]
 */
async function chunkPushNotifications(messages) {
    const chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    for (const chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        } catch (err) {
            console.error(err);
        }
    }
    getPushNotificationReceipts(tickets);
}

/**
 * [getPushNotificationReceipts description]
 * @param  {[type]} tickets [description]
 */
async function getPushNotificationReceipts(tickets) {
    let receiptIds = [];
    for (const ticket of tickets) {
        if (ticket.id) {
            receiptIds.push(ticket.id);
        }
    }
    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    for (const chunk of receiptIdChunks) {
        try {
            let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
            for (const key in receipts) {
                const receipt = receipts[key];
                if (receipt.status === 'ok') {
                    continue;
                } else if (receipt.status === 'error') {
                    console.error('There was an error sending a notification: ' + receipt.message);
                    if (receipt.details && receipt.details.error) {
                        console.error('Error code: ' + receipt.details.error);
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = sendPushNotifications;
