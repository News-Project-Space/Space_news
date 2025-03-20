import React, { useState, useRef, useEffect } from "react";

function InterestsSelector({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleInterest = (interestValue) => {
    const updatedInterests = value.includes(interestValue)
      ? value.filter((item) => item !== interestValue)
      : [...value, interestValue];
    onChange(updatedInterests);
  };

  const removeInterest = (interestValue) => {
    onChange(value.filter((item) => item !== interestValue));
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="border border-gray-300 rounded-md p-2 min-h-12 flex flex-wrap gap-2 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {value.length > 0 ? (
          value.map((interest) => {
            const option = options.find((opt) => opt.value === interest);
            return (
              <div
                key={interest}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {option?.label || interest}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeInterest(interest);
                  }}
                  className="ml-1 text-blue-700 hover:text-blue-900"
                >
                  ×
                </button>
              </div>
            );
          })
        ) : (
          <div className="text-gray-400">Select your interests...</div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search interests..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                    value.includes(option.value) ? "bg-blue-50" : ""
                  }`}
                  onClick={() => toggleInterest(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option.value)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {option.label}
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500">
                No matching interests found
              </div>
            )}
          </div>

          <div className="p-2 border-t border-gray-200 flex justify-between">
            <button
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <div>
              <button
                className="px-3 py-1 text-gray-600 hover:text-gray-800 mr-2"
                onClick={() => onChange([])}
              >
                Clear All
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterestsSelector;
