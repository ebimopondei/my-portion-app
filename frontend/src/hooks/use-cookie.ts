export default function useCookie(){

    const getCookie = (key:string) =>
        document
        .cookie
        .split("; ")
        .reduce((total, currentCookie) => {
            const item = currentCookie.split("=");
            const storedKey = item[0];
            const storedValue = item[1];
            return key === storedKey ? decodeURIComponent(storedValue) : total;
        }, "");

    const setCookie = (key:string, value:string|number, numberOfDays:number=2) => {
        const now = new Date();

        now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);

        document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
    };

    function resetItem(key:string) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    };

    return {
        getCookie,
        setCookie,
        resetItem,
    }
}