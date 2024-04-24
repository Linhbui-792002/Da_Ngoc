import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}


export const dateFormatter = (date:string)=>{
    const parsedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC' 
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    return formatter.format(parsedDate);
}