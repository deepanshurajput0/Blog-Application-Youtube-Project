import { useEffect } from "react";
import LineChart from "./LineChart";
import { useDispatch, useSelector } from "react-redux";
import { getBlogStatsFail, getBlogStatsStart, getBlogStatsSuccess } from "../redux/blogSlice/blogSlice";
import toast from "react-hot-toast";

const LineChartContainer = () => {
  const { stats } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const getAllBlogStats = async () => {
    try {
      dispatch(getBlogStatsStart());
      const res = await fetch("/api/v1/stats", {
        method: "GET",
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(getBlogStatsFail(data.message));
        toast.error(data.message);
      } else {
        dispatch(getBlogStatsSuccess(data));
      }
    } catch (error) {
      dispatch(getBlogStatsFail(error.message));
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllBlogStats();
  }, []);

  // Prepare labels and data from the stats
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Map stats data to chart format
  const labels = monthNames; // Labels for all months
  const blogCounts = new Array(12).fill(0); // Initialize an array for 12 months with 0 counts

  stats.forEach((stat) => {
    if (stat.year === 2024) {
      blogCounts[stat.month - 1] = stat.totalBlogs; // Set the count for the specific month
    }
  });

  // Chart data and options
  const data = {
    labels: labels, // X-axis labels
    datasets: [
      {
        label: 'Blogs Posted', // Label for the dataset
        data: blogCounts, // Y-axis data points
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
