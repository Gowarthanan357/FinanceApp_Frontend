import React from 'react';
const ExportToText = ({ data, startDate, endDate }) => {
  // Function to format data as text
  const formatDataAsText = () => {
    let text = "ID\t\tName\t\tDATE\t\t\tLoanNum\t\tCredit\t\tDebit\t\tBalance\t\tDueNum\n"; // Header
    // Loop through data and append each item as a line in the text
     data.forEach(item => {
      //const itemDate = new Date(item.date); // Assuming each data item has a 'date' property
      if (item.date >= startDate && item.date <= endDate) {
        text += `${item.id}\t\t${item.name}\t\t${item.date}\t\t${item.loannum}\t\t${item.credit}\t\t${item.debit}\t\t${item.balance}\t\t${item.duenum}\n`;
      }
    }); 
    return text;
  };
  // Function to handle export click
  const handleExportClick = () => {
    const text = formatDataAsText();
    // Create a Blob containing the text
    const blob = new Blob([text], { type: 'text/plain' });
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.txt';
    // Trigger the click event to initiate download
    document.body.appendChild(a);
    a.click();
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  return (
    <button className='btn btn-success mt-4' onClick={handleExportClick}>Export to Text</button>
  );
};
export default ExportToText;