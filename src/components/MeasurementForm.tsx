// Modal.tsx
import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  measurements: string[];

  onMeasurementSubmit: (measurements: Record<string, number>) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  measurements,
  itemName,
  onMeasurementSubmit,
}) => {
  const [measurementValues, setMeasurementValues] = useState<{
    [key: string]: number;
  }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeasurementValues({
      ...measurementValues,
      [event.target.name]: parseFloat(event.target.value), // Parse input value to float
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onMeasurementSubmit(measurementValues);
    onClose();
    setMeasurementValues({});
  };

  if (!isOpen) {
    return null;
  }
  console.log("Name : ", itemName);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-lg z-10 w-[300px]">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600">
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit} className="">
          {measurements.map((measurement) => (
            <div key={measurement} className="flex justify-between">
              <label
                htmlFor={measurement}
                className="text-sm font-medium text-gray-700 flex items-center"
              >
                {measurement}:
              </label>
              <div className="flex flow-row ml-[10px]">
                <input
                  type="number"
                  id={measurement}
                  name={measurement}
                  value={measurementValues[measurement] || ""}
                  min="0"
                  onChange={handleInputChange}
                  required // Make input required
                  step="any" // Allow float numbers
                  className="mt-1 block w-[100px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          ))}
          <button type="submit" className="mt-2 bg-slate-300 p-1 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
