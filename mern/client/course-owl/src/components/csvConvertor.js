function csvToArray(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
  
    const result = [];
  
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');
  
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
  
      result.push(obj);
    }
  
    return result;
  }
  
  // Example usage:
  const csvData = `Name,Age,City
  John,25,New York
  Jane,30,San Francisco
  David,35,Los Angeles`;
  
  const jsonArray = csvToArray(csvData);
  console.log(jsonArray);
  