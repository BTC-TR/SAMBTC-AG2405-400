import DurationOnValueChange from "../Confirmations/CreateUpdate/DurationOnValueChange";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ConfirmationDurationOnValueChangeRule(clientAPI) {
    let value = clientAPI.getValue(),
        previousPage = clientAPI.evaluateTargetPathForAPI("#Page:ConfirmationsOverviewListView"),
        previousDurationValue = previousPage.getClientData().previousDurationValue,
        changedIndex = getChangedIndex(previousDurationValue, value),
        hour = value.split(':')[0].length === 4 ? "" : value.split(':')[0],
        minute = value.split(':')[1] ? value.split(':')[1] : "",
        regex = /^(?!00:00$)(0\d|1\d|2[0-3]):[0-5]\d$/;

    // if (!regex.test(value) && value.length === 5) {
    //     clientAPI.getPageProxy().getControls()[0].getControl('DurationPkrFreeInput').setValue(previousDurationValue);
    //     return;
    // }
    // Clean up the value, ensuring it contains only digits and one colon
    // value = value.replace(/[^0-9:]/g, '');
    value = value.replace(/[^0-9:]/g, '');

    // If the character changed is a colon, keep the previous value
    if(previousDurationValue.length > value.length) {
        if (previousDurationValue[changedIndex] === ':') {
            value = previousDurationValue;
        }
    } else {
        if (hour.length == 2 && Number(hour) > 23) {
            value = '23' + value.slice(2, 5) 
        }
        if (minute.length == 2 && Number(minute) > 59) {
            value = value.slice(0, 3) + '59'
        }
    }

    // If there are more than two colons, keep only the one between hour and minute
    let colonCount = (value.match(/:/g) || []).length;
    if (colonCount > 1) {
        let parts = value.split(':');
        if (parts.length > 2) {
            // Keep only the colon between hour and minute
            value = parts[0] + ':' + parts[1];
        } else if (parts.length === 2 && parts[1].includes(':')) {
            value = parts[0] + ':' + parts[1].replace(':', '');
        }
    }

    // Handle scenarios where hour or minute exceeds the limit
    if (hour.length > 2) {
        value = value.slice(0, changedIndex) + value.slice(changedIndex + 1);
    }
    if (minute.length > 2) {
        value = value.slice(0, changedIndex) + value.slice(changedIndex + 1);
    }

    // Limit the value length to at most 5 characters (hh:mm)
    if (value.length > 5) {
        value = value.slice(0, 5);
    }

    // Add colon if the value length is appropriate but missing one
    if ((value.length === 2 || value.length === 3) && previousDurationValue.length < 3) {
        if (!value.includes(':')) {
            if (value.length === 3) {
                let lastDigit = value.slice(-1),
                    root = value.slice(0, -1);
                value = root + ':' + lastDigit;
            } else {
                value = value + ':';
            }
        }
    }

    // Handle case where value length is 3 and previous duration length is 4
    if (value.length === 3 && previousDurationValue.length === 4) {
        try {
            if (value.split(':')[1].length === 0) {
                value = value.slice(0, -1);
            }
        } catch (e) {
            value = value.slice(0, -1);
        }
    }

    if (value.length === 5) {
        DurationOnValueChange(clientAPI);
        clientAPI.getPageProxy().getControls()[0].getControl('DurationPkr').setValue(parseDuration(value));
    }
    // Update the value if any modifications were made
    previousPage.getClientData().previousDurationValue = value;
    clientAPI.getPageProxy().getControls()[0].getControl('DurationPkrFreeInput').setValue(value);
}

function getChangedIndex(prevValue, currentValue) {
    // Get the length of the shorter string to avoid index out of range errors
    let minLength = Math.min(prevValue.length, currentValue.length);

    // Iterate through the characters of both strings
    for (let i = 0; i < minLength; i++) {
        if (prevValue[i] !== currentValue[i]) {
            return i; // Return the index where the change happens
        }
    }

    // If no difference was found within the length of the shorter string
    // but the strings have different lengths, return the index of the first change
    if (prevValue.length !== currentValue.length) {
        return minLength; // The change happens at the end of the shorter string
    }

    // If no change is found, return -1 (indicating no change)
    return -1;
}
function parseDuration(duration) {
    if (duration.includes(":")) {
        let parts = duration.split(":");
        let hours = parseInt(parts[0], 10);
        let minutes = parseInt(parts[1], 10);
        return (hours * 60) + minutes;
    } else {
        // If there's no colon, assume the duration is already in minutes
        return parseInt(duration, 10);
    }
}