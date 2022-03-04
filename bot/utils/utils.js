
module.exports.formatTime = formatTime;

function formatTime(time) {
  try {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor(time / 60000);
    let seconds = ((time % 6000) / 1000).toFixed(0);
    if (hours < 1) return "00:" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    else return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + s;
  } catch (error) {
    console.log(error);
  }
}
