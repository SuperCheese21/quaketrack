import moment from 'moment';

function formatTime(time) {
    return moment.utc(time).format("YYYY-MM-DD HH:mm:ss") + " UTC";
}

export default formatTime;
