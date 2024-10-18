import {ValueIfExists} from '../Common/Library/Formatter';
export default function EquipmentZCostCenter(context) {
    return ValueIfExists(context.binding.CostCenter);
}