import libLocal from '../Common/Library/LocalizationLibrary';
import libCom from '../Common/Library/CommonLibrary';
import CustomUpdateRequiredFailed from '../Common/CustomUpdateRequiredFailed';

export default function ConfirmationFormValidation(clientAPI) {
    const dict = {};
    const requiredFieldsProxys = [];
    libCom.getFieldValue(clientAPI, 'WorkOrderLstPkr', '', dict, true);
    libCom.getFieldValue(clientAPI, 'OperationPkr', '', dict, true);
    libCom.getFieldValue(clientAPI, 'DurationPkrFreeInput', '', dict, true);

    let validations = [];

    validations.push(validateWorkOrderLstPkrIsFilled(clientAPI, dict, requiredFieldsProxys));
    validations.push(validateOperationPkrIsFilled(clientAPI, dict, requiredFieldsProxys));
    validations.push(validateDurationPkrFreeInput(clientAPI, dict, requiredFieldsProxys));


    return Promise.all(validations).then(() => {
        return true;
    }).catch(() => {
        CustomUpdateRequiredFailed(clientAPI, requiredFieldsProxys);
        return false;
    });
}

function validateWorkOrderLstPkrIsFilled(clientAPI, dict, requiredFieldsProxys) {
    if (dict.WorkOrderLstPkr !== "") {
        return Promise.resolve(true);
    } else {
        requiredFieldsProxys.push(clientAPI.getControl('FormCellContainer').getControl('WorkOrderLstPkr'));
        return Promise.reject(false);
    }
}
function validateOperationPkrIsFilled(clientAPI, dict, requiredFieldsProxys) {
    if (dict.OperationPkr !== "") {
        return Promise.resolve(true);
    } else {
        requiredFieldsProxys.push(clientAPI.getControl('FormCellContainer').getControl('OperationPkr'));
        return Promise.reject(false);
    }
}
function validateDurationPkrFreeInput(clientAPI, dict, requiredFieldsProxys) {
    let regex = /^(?!00:00$)(0\d|1\d|2[0-3]):[0-5]\d$/;
    if (regex.test(dict.DurationPkrFreeInput)) {
        return Promise.resolve(true);
    } else {
        requiredFieldsProxys.push(clientAPI.getControl('FormCellContainer').getControl('DurationPkrFreeInput'));
        return Promise.reject(false);
    }
}