export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64String = e.target.result;
            resolve(base64String);
        } 
        reader.onerror = reject;
        
        reader.readAsDataURL(file);
    })
}