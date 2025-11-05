import * as React from "react";

export interface ITableRecord {
  ID: string | number;
  [key: string]: string | number;
}

interface ITableComponentProps {
  records: ITableRecord[];
  viewButtonColor: string;
  editButtonColor: string;
  deleteButtonColor: string;
  showDeleteButton: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TableComponent: React.FC<ITableComponentProps> = (props) => {
  const {
    records,
    viewButtonColor,
    editButtonColor,
    deleteButtonColor,
    showDeleteButton,
    onView,
    onEdit,
    onDelete
  } = props;
  
  if (!records || records.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: '#6c757d',
        fontSize: '16px'
      }}>
        <p>No records to display</p>
      </div>
    );
  }
  
  const columns = Object.keys(records[0]).filter(key => key !== 'ID');
  
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => {
            const recordId = String(record.ID !== undefined ? record.ID : index);
            
            return (
              <tr key={recordId}>
                {columns.map((column) => (
                  <td key={`${recordId}-${column}`}>
                    {record[column] !== undefined ? String(record[column]) : ''}
                  </td>
                ))}
                
                <td className="actions-cell">
                  <button
                    className="btn btn-view"
                    style={{ backgroundColor: viewButtonColor }}
                    onClick={() => onView(recordId)}
                    title="View details"
                  >
                    👁️ Ver
                  </button>
                  
                  <button
                    className="btn btn-edit"
                    style={{ backgroundColor: editButtonColor }}
                    onClick={() => onEdit(recordId)}
                    title="Edit record"
                  >
                    ✏️ Editar
                  </button>
                  
                  {showDeleteButton && (
                    <button
                      className="btn btn-delete"
                      style={{ backgroundColor: deleteButtonColor }}
                      onClick={() => onDelete(recordId)}
                      title="Delete record"
                    >
                      🗑️ Eliminar
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};