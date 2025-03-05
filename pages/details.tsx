import React, {useState,useRef} from 'react'
import { useEffect } from 'react';
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button';
export default function details() {
    
    // const params = useParams();
    // const {id} = params;
    const [details,setdetails] = useState();
    useEffect(() => {
        try {
          const storedRequest = localStorage.getItem("apiResponse");
      
          if (storedRequest) {
            const requestBody = storedRequest; // Ensure valid JSON format
            console.log(storedRequest);
            fetch("/api/detail-show", {
              method: "POST", 
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(requestBody) // Convert back to JSON string
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log("Response Data:", data);
              setdetails(data);

            })
            .catch(error => {
              console.error("Fetch error:", error);
            });
          }
        } catch (e) {
          console.error("Error accessing localStorage:", e);
        }
      }, []);

      

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 p-10">
        {/* Header Section */}
        <div className="text-center mb-10 bg-white/70 backdrop-blur-md py-10 px-6 rounded-xl shadow-lg">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Detailed Financial Advisory
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
            Witness your investment allocation options in detail and dive into further analysis opportunities.
          </p>
          <p className="text-sm text-slate-500 italic max-w-2xl mx-auto">
            Disclaimer: This tool is for informational purposes only and does not constitute financial advice. Always consult with a qualified financial advisor before making investment decisions.
          </p>
        </div>
      
        {/* Grid Layout with Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      {Object.entries(details || {}).map(([category, items]) => (
        <div key={category} className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{category}</h2>
          <p className="text-slate-700 mb-4">Investment insights for {category}.</p>
          <ul className="text-left text-slate-800 space-y-2">
              {Array.isArray(items) ? (
                items.map((item, index) => (
                  <li key={index} className="flex justify-between font-semibold py-2">
                    <span>{item.name}</span>
                    <span className="text-blue-600">{item.weight}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No data available</li>
              )}
            </ul>
          <button className="w-full bg-blue-600 hover:bg-blue-800 text-white py-4 text-lg mt-8 rounded-lg">
            Advanced Analysis
          </button>
        </div>
      ))}
    </div>


      </div>
      
    
  )
}
