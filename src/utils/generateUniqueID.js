export function generateUniqueID() {
    return Date.now().toString() + Math.floor(Math.random() * 100);
}