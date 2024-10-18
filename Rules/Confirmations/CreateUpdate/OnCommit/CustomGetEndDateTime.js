import GetStartDateTime from './GetStartDateTime';
export default function CustomGetEndDateTime(context, durationValue) {
    let startDate = GetStartDateTime(context);
    let duration = durationValue;
    let endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + duration);
    endDate.setSeconds(0);
    return endDate;
}