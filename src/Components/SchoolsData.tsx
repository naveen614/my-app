import { error } from "console";
import React, { useEffect, useState } from "react";


//creating interface the data we want to show

interface SchoolData {
  school_name: string;
  dbn: string;
  overview_paragraph: string;
}



export const SchoolsData = () => {

  //state taking here for schoolData
  const [data, setData] = useState<SchoolData[]>([]);

  //Using fetch library getting JSON data
  useEffect(() => {
    fetch('https://data.cityofnewyork.us/resource/s3k6-pzi2.json')
      .then((res) => res.json())
      .then((data: SchoolData[]) => {
        console.log(data);
        setData(data)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  const [expandedindex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {

    setExpandedIndex(expandedindex === index ? null : index);
  };

  //Rending data of schoolName and dbn number 
  return (
    <div>
      {data.map((item, index) =>
        <div key={index}>
          {/* //adding toggle click action to show school description */}
          <h1 onClick={() => toggleExpanded(index)}>
            "School Name: " {item.school_name} -- "DBN number: "{item.dbn}</h1>

          {expandedindex === index &&
            <p>{item.overview_paragraph}</p>
          }

        </div>)}
    </div>
  );
}

export default SchoolsData;







