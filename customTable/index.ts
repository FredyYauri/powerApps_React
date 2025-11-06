import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { ITableRecord, TableComponent } from "./components/TableComponent";

export class customTable implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  
  private _container: HTMLDivElement;
  private _notifyOutputChanged: () => void;
  private _context: ComponentFramework.Context<IInputs>;
  private _root: Root | null = null;
  
  private _selectedRecordId: string | undefined;
  private _lastActionTimestamp: string | undefined;
  private _lastActionType: string | undefined;
  
    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

  
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._context = context;
    this._container = container;
    this._notifyOutputChanged = notifyOutputChanged;
    
    this._container.style.width = "100%";
    this._container.style.height = "100%";
    this._container.style.overflow = "auto";
    
    this._root = createRoot(this._container);
  }
  
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this._context = context;

    const dataJSON = context.parameters.dataJSON.raw || "[]";
    
    let records: ITableRecord[] = [];
    try {
      const parsed = JSON.parse(dataJSON);
      
      if (Array.isArray(parsed)) {
        records = parsed;
      } else {
        console.error("dataJSON is not an array");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    
    const viewButtonColor = context.parameters.viewButtonColor.raw || "#007bff";
    const editButtonColor = context.parameters.editButtonColor.raw || "#28a745";
    const deleteButtonColor = context.parameters.deleteButtonColor.raw || "#dc3545";
    const showDeleteButton = context.parameters.showDeleteButton.raw !== false;
    
    const element = React.createElement(
      TableComponent,
      {
        records: records,
        viewButtonColor: viewButtonColor,
        editButtonColor: editButtonColor,
        deleteButtonColor: deleteButtonColor,
        showDeleteButton: showDeleteButton,
        onView: this.handleView.bind(this),
        onEdit: this.handleEdit.bind(this),
        onDelete: this.handleDelete.bind(this)
      }
    );
    
    if (this._root) {
      this._root.render(element);
    }
  }
  
  private handleView(recordId: string): void {
    this._lastActionType = "view";
    this._selectedRecordId = recordId;
    this._lastActionTimestamp = new Date().toISOString();
    this._notifyOutputChanged();
    
  }
  
  private handleEdit(recordId: string): void {
  this._lastActionType = "edit";
    
    this._selectedRecordId = recordId;
    this._lastActionTimestamp = new Date().toISOString();
    this._notifyOutputChanged();
  }
  
  private handleDelete(recordId: string): void {
  this._lastActionType = "delete";
    
    this._selectedRecordId = recordId;
    this._lastActionTimestamp = new Date().toISOString();
    this._notifyOutputChanged();
  }
  
  public getOutputs(): IOutputs {
    return {
      selectedRecordId: this._selectedRecordId,
      lastActionTimestamp: this._lastActionTimestamp,
      lastActionType: this._lastActionType
    };
  }
  
  public destroy(): void {
    if (this._root) {
      this._root.unmount();
      this._root = null;
    }
  }
}