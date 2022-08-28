type Numerable = number | `${number}`; //either a number or string that can be converted to a number

interface crOptions {
    locales?: string;
    digits?: Numerable;
    pre?: string;
    post?: string;
}

export function numberToCurrency(n: Numerable, options?: crOptions)
    : string {
    let nn: number;
    //set defaults
    const settings = {
        locales: 'de-DE',
        digits: 2,
        pre: '€ ',
        post: '',
        digitsNN: 0,
        ...options //overwriting defaults with optional options
    };

    if(typeof n === 'string'){
        nn = Number(n);
    }else{
        nn = n;
    }

    if(typeof settings.digits === 'string'){
        settings.digitsNN = Number(settings.digits);
    }else{
        settings.digitsNN = settings.digits;
    }

    return settings.pre + nn.toLocaleString('de-DE', {
        minimumFractionDigits:settings.digitsNN,
        maximumFractionDigits:settings.digitsNN
    })+settings.post;
}
