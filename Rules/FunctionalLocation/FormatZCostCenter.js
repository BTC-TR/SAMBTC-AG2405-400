/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function FormatZCostCenter(clientAPI) {
    return clientAPI.binding.ZCostCenter !== '' ? clientAPI.binding.ZCostCenter : '-';
}