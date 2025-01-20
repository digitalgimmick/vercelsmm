import { 
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Show</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(parseInt(value))}
          className={totalItems === 0 ? 'opacity-50' : ''}
        >
          <SelectTrigger className="h-9 w-[80px] border-gray-200 bg-white/50 hover:bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="10" className="hover:bg-gray-50">10</SelectItem>
            <SelectItem value="20" className="hover:bg-gray-50">20</SelectItem>
            <SelectItem value="50" className="hover:bg-gray-50">50</SelectItem>
            <SelectItem value="100" className="hover:bg-gray-50">100</SelectItem>
          </SelectContent>
        </Select>
        <span>entries</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-500">
          Showing {startItem} to {endItem} of {totalItems} entries
        </div>

        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 border-gray-200 bg-white/50 hover:bg-white"
            onClick={() => onPageChange(1)}
            disabled={!hasPrevPage || totalItems === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 border-gray-200 bg-white/50 hover:bg-white"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage || totalItems === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 border-gray-200 bg-white/50 hover:bg-white"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage || totalItems === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 border-gray-200 bg-white/50 hover:bg-white"
            onClick={() => onPageChange(totalPages)}
            disabled={!hasNextPage || totalItems === 0}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
