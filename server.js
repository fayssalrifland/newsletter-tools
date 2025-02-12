import express from 'express';
import cors from 'cors';

const app = express();

// Allow requests from the frontend origin
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

// Mock endpoint to simulate URL processing
app.post('/process-urls', (req, res) => {
  const { urls } = req.body;

  // Simulate filtering URLs (replace this with Puppeteer logic later)
  const filteredUrls = urls.filter((url, index) => {
    // Mock condition: Keep every 2nd URL for demonstration
    return index % 2 === 0;
  });

  // Simulate a delay to mimic real processing
  setTimeout(() => {
    res.json({ filteredUrls });
  }, 2000);
});

// Start the server
const PORT = 3001; // Use a different port than the frontend
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
