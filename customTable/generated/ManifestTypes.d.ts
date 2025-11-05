/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    dataJSON: ComponentFramework.PropertyTypes.StringProperty;
    viewButtonColor: ComponentFramework.PropertyTypes.StringProperty;
    editButtonColor: ComponentFramework.PropertyTypes.StringProperty;
    deleteButtonColor: ComponentFramework.PropertyTypes.StringProperty;
    showDeleteButton: ComponentFramework.PropertyTypes.TwoOptionsProperty;
}
export interface IOutputs {
    selectedViewRecordId?: string;
    selectedEditRecordId?: string;
    selectedDeleteRecordId?: string;
    lastActionTimestamp?: string;
}
