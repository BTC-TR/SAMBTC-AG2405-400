/**
* Adjust the Start Time value based on the Duration 
* @param {IClientAPI} formCellControlProxy
*/
import ODataDate from '../../Common/Date/ODataDate';
import libCom from '../../Common/Library/CommonLibrary';
import getPostingOverride from '../ConfirmationsGetPostingDateOverride';
import CustomGetEndDateTime from './OnCommit/CustomGetEndDateTime';

export default function DurationOnValueChange(formCellControlProxy) {
    let duration = undefined;
    try {
        duration = formCellControlProxy.getValue().includes(':') ? parseDuration(formCellControlProxy.getValue()) : formCellControlProxy.getValue();
    } catch(e) {
        duration = formCellControlProxy.getValue();
    }
    let pageProxy = formCellControlProxy.getPageProxy();
    let binding = pageProxy.binding;

    let now = new Date();
    let endDateTime = CustomGetEndDateTime(pageProxy, duration);
    
    if (endDateTime > now) { //Only adjust the start date and time if the new duration causes the end date and time to be in the future

        let startDateTime = new ODataDate(binding.PostingDate); //This is done so that the Posting Date is preserved when the confirmation is being added for a different date than today
        startDateTime.date().setHours(now.getHours());
        startDateTime.date().setMinutes(now.getMinutes());

        startDateTime.date().setMinutes(now.getMinutes() - duration);

        let startDateControl = libCom.getControlProxy(pageProxy, 'StartDatePicker');
        startDateControl.setValue(startDateTime.date());

        if (getPostingOverride(formCellControlProxy)) {
            let postingDateControl = libCom.getControlProxy(pageProxy, 'PostingDatePicker');
            postingDateControl.setValue(startDateTime.date());
        }

        let startTimeControl = libCom.getControlProxy(pageProxy, 'StartTimePicker');
        startTimeControl.setValue(startDateTime.date());
    }
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