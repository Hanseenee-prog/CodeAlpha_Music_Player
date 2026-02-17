// Converts seconds to time for display
const formatTime = (seconds) => {
    const totalSeconds = Math.floor(seconds);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const padded = (n) => String(n).padStart(2, "0");

    if (hours > 0) return `${padded(hours)}:${padded(minutes)}:${padded(secs)}`;
    return `${padded(minutes)}:${padded(secs)}`;
}

// Convert time to secs for the music player to use
const convertTimeToSec = (time) => {
    if (typeof time === "number") return time;
    if (!time.includes(":")) return Number(time);

    return time
        .split(":")
        .map(Number) // converts the strings to numbers
        .reduce((acc, val) => acc * 60 + val, 0) // Combines the values of the loop into one result
};

export const timeHandler = (time) => {
    let seconds = convertTimeToSec(time);

    return {
        seconds,
        formatted: formatTime(seconds)
    }
}