import { colors } from "@mui/material";

export default function Salepage() {
  return (
    <div>
      <div className="header">
        <div
          className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center text-sm"
          style={colors}
        >
          <div className="flex gap-4">
            <span>Till: 1</span>
            <span>IT fc</span>
            <span>Synchronization</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              BC Connection
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </span>
          </div>
          <div>
            <span>
              IT Retail Inc., Market Retail Market, Var. 1-10, WTD CC. 10-509
            </span>
            <span className="ml-8">1:05 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
