import libCommon from './Library/CommonLibrary';
import IsAndroid from './IsAndroid';
export default function CustomUpdateRequiredFailed(pageProxy, missingRequiredControls) {
        //first remove all previous validation - this is only temporary, once we get onValueChange() function for
    //Note control, we can remove the following - TODO
    let formCellContainer = pageProxy.getControl('FormCellContainer');
    let allControls = formCellContainer.getControls();
    // remove ZeroCountSwitch, call clearValidationOnValueChange on this control causes app to crash
    for (const item of allControls.filter((v) => v.getName() !== 'ZeroCountSwitch')) {
        item.clearValidationOnValueChange();
    }
    formCellContainer.redraw();

    //get the missing fields
    let missingRequiredFields = missingRequiredControls;
    let message = pageProxy.localizeText('field_is_required');

    //set the inline error
    let promises = [];
    for (let control of missingRequiredFields) {
        promises.push(libCommon.executeInlineControlError(pageProxy, control, message));
    }

    return Promise.all(promises).finally(() => {
        if (IsAndroid(pageProxy)) {
            formCellContainer.redraw();
        }
    });
}