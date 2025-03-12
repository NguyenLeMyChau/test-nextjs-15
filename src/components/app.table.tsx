import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

interface TableColumn {
    header: string; // header của cột
    accessor: string; // key của object
}

interface TableProps<T extends object> {
    data: T[];
    columns: TableColumn[];
    onEdit?: (item: T) => void; // Hàm xử lý cập nhật
    onDelete?: (item: T) => void; // Hàm xử lý xóa
}

function TableExample<T extends object>({ data, columns, onEdit, onDelete }: TableProps<T>) {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessor}>{column.header}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column.accessor}>
                                    {String((row as Record<string, unknown>)[column.accessor] ?? "")}
                                </td>
                            ))}
                            <td>
                                {/* <Button variant="primary" size="sm" className="me-2">View</Button> */}
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => onEdit?.(row)} // Gọi hàm khi nhấn Edit
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => onDelete?.(row)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}


export default TableExample;