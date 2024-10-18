export default function ConfirmationDurationFormatRule(clientAPI) {
    let value = clientAPI.getValue(),
        previousPage = clientAPI.evaluateTargetPathForAPI("#Page:-Previous"),
        previousDurationValue = previousPage.getClientData().previousDurationValue,
        // regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]?$/,
        regex = /^((0\d|1\d|2[0-3]):[0-5]\d|24:00)$/;
    value = value.replace(/[^0-9:]/g, '');

    // // Limit input to a maximum length of 5
    // if (value.length > 5) {
    //     value = value.slice(0, 5);
    // }

    // if ((value.length === 2 || value.length === 3) && previousDurationValue.length < 3) {
    //     if(!value.includes(':')) {
    //         if (value.length === 3) {
    //             let lastDigit = value.slice(-1),
    //                 root = value.slice(0, -1);
    //             value = root + ':' + lastDigit;
    //         } else {
    //             value = value + ':';
    //         }
            
    //     }
    // }
    // // if (value.length === 3 && previousDurationValue.length === 4) {
    // //     if(value.includes(':')) {
    // //         value = value.slice(0, -1);
    // //     }
    // // }

    // // Update the value if any modifications were made
    // previousPage.getClientData().previousDurationValue = value;
    // return value;
    return value;
}