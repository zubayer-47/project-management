export default function debounce(fn, delay = 300) {
    let timerId;
    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args)
        }, delay);
    }
}