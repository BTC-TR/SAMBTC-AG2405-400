/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function FormatZPlannerGroup(clientAPI) {
    return clientAPI.binding.ZPlannerGroup !== '' ? clientAPI.binding.ZPlannerGroup : '-';
}