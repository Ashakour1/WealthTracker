import { createContext, useContext, useState } from "react";

interface FinancialRecord {
  id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}
interface financialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  // updateRecord: (id: string, newRecord: FinancialRecord) => void;
  // deleteRecord: (id: string) => void;
}
export const financialRecordContext = createContext<
  financialRecordContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch("http://localhost:3001/financialRecord/", {
      method: "POST",
      body: JSON.stringify(record),
      headers : {
        "Content-type": "application/json"
      }
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {

    }
  };
  return (
    <financialRecordContext.Provider value={{ records, addRecord }}>
      {children}
    </financialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<financialRecordContextType | undefined>(
    financialRecordContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
