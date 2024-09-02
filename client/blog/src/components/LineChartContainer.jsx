import LineChart from "./LineChart";

const LineChartContainer = () => {
  // Example data and options
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
    datasets: [
      {
        label: 'Blogs Posted', // Label for the dataset
        data: [10, 20, 30, 25, 15, 40], // Y-axis data points
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color under the line
        // tension: 0.4, // Line tension for smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Show the legend
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Monthly Blog Posts', // Title of the chart
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
  };

  return <LineChart data={data} options={options} />;
};

export default LineChartContainer;
