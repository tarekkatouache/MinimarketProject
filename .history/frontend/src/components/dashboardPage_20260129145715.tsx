// import { useState } from "react";
// import "./dashboardPage.css";

// interface TransactionItem {
//   id: string;
//   name: string;
//   weight: string;
//   price: string;
//   quantity: number;
//   total: number;
// }

// export default function Dashboard() {
//   const [transactions, setTransactions] = useState<TransactionItem[]>([
//     {
//       id: "1",
//       name: "Carne Asada",
//       weight: "1.56 lb @ $1.99/lb",
//       price: "3.10",
//       quantity: 1,
//       total: 3.1,
//     },
//     {
//       id: "2",
//       name: "Carne Asada",
//       weight: "1.56 lb @ $1.99/lb",
//       price: "3.10",
//       quantity: 1,
//       total: 3.1,
//     },
//     {
//       id: "3",
//       name: "Carne Asada",
//       weight: "1.56 lb @ $1.99/lb",
//       price: "3.10",
//       quantity: 1,
//       total: 3.1,
//     },
//     {
//       id: "4",
//       name: "Carne Asada",
//       weight: "1.56 lb @ $1.99/lb",
//       price: "3.10",
//       quantity: 1,
//       total: 3.1,
//     },
//   ]);
//   const [selectedId, setSelectedId] = useState<string>("4");
//   const [input, setInput] = useState<string>("");
//   const [weight, setWeight] = useState<string>("0.00");
//   const [savings, setSavings] = useState<string>("0.00");

//   const total = transactions.reduce((sum, item) => sum + item.total, 0);
//   const itemCount = transactions.length;

//   const handleNumberClick = (num: string) => {
//     setInput((prev) => prev + num);
//   };

//   const handleClear = () => {
//     setInput("");
//   };

//   const handleBack = () => {
//     setInput((prev) => prev.slice(0, -1));
//   };

//   const handleEnter = () => {
//     console.log("Enter pressed with input:", input);
//     setInput("");
//   };

//   const handleCancelTransaction = () => {
//     setTransactions([]);
//     setInput("");
//     setWeight("0.00");
//     setSavings("0.00");
//   };

//   const topButtons = [
//     { label: "Sign Off", color: "emerald" },
//     { label: "Customers", color: "emerald" },
//     { label: "Total", color: "emerald" },
//   ];

//   const middleButtons = [
//     { label: "Switch User", color: "emerald" },
//     { label: "Manager\nFunctions", color: "emerald" },
//     { label: "Misc ▶", color: "emerald" },
//   ];

//   const bottomButtons = [
//     { label: "Void", color: "emerald" },
//     { label: "Product Lookup", color: "emerald" },
//     { label: "Discounts", color: "emerald" },
//   ];

//   const numbers = [
//     ["7", "8", "9"],
//     ["4", "5", "6"],
//     ["1", "2", "3"],
//     [".", "0", "00"],
//   ];

//   const sideButtons = [
//     { label: "Suspend/Resume", color: "emerald" },
//     { label: "Non Scan", color: "emerald" },
//     { label: "Quantity", color: "emerald" },
//     {
//       label: "Cancel Transaction",
//       color: "emerald",
//       onClick: handleCancelTransaction,
//     },
//     { label: "Refunds & Voids ▶", color: "emerald" },
//     { label: "No Sale", color: "emerald" },
//   ];

//   const renderButton = (label: string, color: string, onClick?: () => void) => (
//     <button
//       key={label}
//       onClick={onClick}
//       className={`bg-${color}-600 hover:bg-${color}-700 text-white p-4 rounded border border-gray-400 font-semibold text-sm whitespace-pre-line h-16 flex items-center justify-center transition-colors`}
//       style={{ backgroundColor: "#059669" }}
//       onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#047857")}
//       onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#059669")}
//     >
//       {label}
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center text-sm">
//           <div className="flex gap-4">
//             <span>Till: 1</span>
//             <span>IT fc</span>
//             <span>Synchronization</span>
//             <span className="flex items-center gap-1">
//               <span className="w-2 h-2 bg-red-500 rounded-full"></span>
//               BC Connection
//             </span>
//             <span className="flex items-center gap-1">
//               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//             </span>
//           </div>
//           <div>
//             <span>
//               IT Retail Inc., Market Retail Market, Var. 1-10, WTD CC. 10-509
//             </span>
//             <span className="ml-8">1:05 PM</span>
//           </div>
//         </div>

//         <div className="flex">
//           {/* Left Side - Transaction Area */}
//           <div className="flex-1 border-r border-gray-300">
//             {/* Store Header */}
//             <div className="text-center py-6 border-b border-gray-300">
//               <h1 className="text-2xl font-bold">CurtMart</h1>
//               <p className="text-sm">Fine Puddings Since 93'</p>
//             </div>

//             {/* Transaction List */}
//             <div className="p-4 min-h-[400px]">
//               {transactions.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => setSelectedId(item.id)}
//                   className={`w-full text-left mb-3 p-2 rounded transition-colors ${
//                     selectedId === item.id
//                       ? "bg-green-200 border-2 border-green-400"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div className="font-semibold">{item.name}</div>
//                       <div className="text-sm text-gray-600">{item.weight}</div>
//                     </div>
//                     <div className="font-semibold">{item.price}</div>
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {/* Total Display */}
//             <div className="border-t-2 border-gray-400 p-4">
//               {/* Labels Row */}
//               <div className="grid grid-cols-3 gap-4 mb-2">
//                 <div>
//                   <div className="font-bold">Weight</div>
//                   <div className="text-xs text-gray-600">
//                     10 x 0.01 lb = ... 1000{" "}
//                     <span className="text-blue-600">HD</span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="font-bold">Savings</div>
//                 </div>
//                 <div>
//                   <div className="font-bold">Total</div>
//                 </div>
//               </div>

//               {/* Values Row */}
//               <div className="grid grid-cols-3 gap-4 mb-4">
//                 <div className="text-3xl font-bold">{weight} lb</div>
//                 <div className="text-3xl font-bold">${savings}</div>
//                 <div className="text-3xl font-bold">${total.toFixed(2)}</div>
//               </div>

//               {/* Footer Info */}
//               <div className="flex justify-between text-sm text-gray-600">
//                 <div>Item Count: {itemCount}</div>
//                 <div className="flex gap-8">
//                   <div>Wt. Total: 0.00</div>
//                   <div>FS Total: 0.00</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Control Panel */}
//           <div className="w-[480px] bg-gray-200">
//             {/* Top Function Buttons */}
//             <div className="p-3 space-y-2">
//               <div className="grid grid-cols-3 gap-2">
//                 {topButtons.map((btn) => renderButton(btn.label, btn.color))}
//               </div>
//               <div className="grid grid-cols-3 gap-2">
//                 {middleButtons.map((btn) => renderButton(btn.label, btn.color))}
//               </div>
//               <div className="grid grid-cols-3 gap-2">
//                 {bottomButtons.map((btn) => renderButton(btn.label, btn.color))}
//               </div>
//             </div>

//             {/* NumPad and Additional Controls */}
//             <div className="p-3">
//               <div className="flex gap-2">
//                 {/* Number Pad */}
//                 <div className="flex-1 space-y-2">
//                   {/* Number rows */}
//                   {numbers.map((row, rowIndex) => (
//                     <div key={rowIndex} className="grid grid-cols-3 gap-2">
//                       {row.map((num) => (
//                         <button
//                           key={num}
//                           onClick={() => handleNumberClick(num)}
//                           className="bg-gray-300 hover:bg-gray-400 text-black p-4 rounded border border-gray-400 font-bold text-xl h-16 transition-colors"
//                         >
//                           {num}
//                         </button>
//                       ))}
//                     </div>
//                   ))}

//                   {/* Control buttons row */}
//                   <div className="grid grid-cols-3 gap-2">
//                     <button className="bg-gray-400 hover:bg-gray-500 text-black p-4 rounded border border-gray-400 font-bold text-lg h-16 flex items-center justify-center transition-colors">
//                       ▲
//                     </button>
//                     <button
//                       onClick={handleEnter}
//                       className="bg-gray-400 hover:bg-gray-500 text-black p-4 rounded border border-gray-400 font-bold text-lg h-16 transition-colors"
//                     >
//                       Enter
//                     </button>
//                     <button
//                       onClick={handleClear}
//                       className="bg-gray-400 hover:bg-gray-500 text-black p-4 rounded border border-gray-400 font-bold text-lg h-16 transition-colors"
//                     >
//                       Clear
//                     </button>
//                   </div>

//                   {/* Bottom control row */}
//                   <div className="grid grid-cols-3 gap-2">
//                     <button className="bg-gray-400 hover:bg-gray-500 text-black p-4 rounded border border-gray-400 font-bold text-lg h-16 flex items-center justify-center transition-colors">
//                       ▼
//                     </button>
//                     <button
//                       onClick={handleBack}
//                       className="bg-gray-400 hover:bg-gray-500 text-black p-4 rounded border border-gray-400 font-bold text-lg h-16 transition-colors"
//                     >
//                       Back
//                     </button>
//                     <button className="bg-gray-400 hover:bg-gray-500 text-black p-4 rounded border border-gray-400 font-bold text-lg h-16 transition-colors">
//                       Clear
//                     </button>
//                   </div>
//                 </div>

//                 {/* Side Function Buttons */}
//                 <div className="w-32 space-y-2">
//                   {sideButtons.map((btn) => (
//                     <button
//                       key={btn.label}
//                       onClick={btn.onClick}
//                       className="w-full text-white p-2 rounded border border-gray-400 font-semibold text-xs h-16 flex items-center justify-center transition-colors whitespace-pre-line text-center"
//                       style={{ backgroundColor: "#059669" }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.backgroundColor = "#047857")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.backgroundColor = "#059669")
//                       }
//                     >
//                       {btn.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
