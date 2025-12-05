interface Column {
  key: string
  label: string
}

interface DataTableProps {
  columns: Column[]
  data: Record<string, any>[]
}

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400',
  planned: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-slate-500/20 text-slate-400',
  cancelled: 'bg-red-500/20 text-red-400',
}

export default function DataTable({ columns, data }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            {columns.map((column) => (
              <th 
                key={column.key} 
                className="text-left py-3 px-4 text-sm font-medium text-slate-400"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="border-b border-slate-800 hover:bg-slate-800/30 transition-all cursor-pointer"
            >
              {columns.map((column) => (
                <td key={column.key} className="py-4 px-4">
                  {column.key === 'status' ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[row[column.key]] || 'bg-slate-500/20 text-slate-400'}`}>
                      {row[column.key].charAt(0).toUpperCase() + row[column.key].slice(1)}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-300">{row[column.key]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

