import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { createClient } from '@supabase/supabase-js';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Supabase configuration
const supabaseUrl = 'https://quvdxjxszquqqcvesntn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dmR4anhzenF1cXFjdmVzbnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNTk3MTQsImV4cCI6MjA1NTYzNTcxNH0.MB_f2XGYYNwV0CSIjz4W7_KoyNNTkeFMfJZee-N2vKw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  // State variables
  const [personnelData, setPersonnelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    const fetchPersonnelData = async () => {
      // Fetch data from Supabase
      const { data, error } = await supabase
        .from('personnel') // Table name
        .select('*'); // Select all columns

      if (error) {
        console.error('Error fetching personnel data:', error);
      } else {
        console.log('Data fetched from Supabase:', data);
        setPersonnelData(data || []); // Ensure data is an array
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchPersonnelData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filtered data based on search query
  const filteredData = personnelData.filter(item =>
    item?.nom?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render the component
  return (
    <div className="app">
      <Header />
      <main>
        <h1>Données du personnel</h1>
        {/* Search input */}
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {loading ? (
          <p>Chargement des données...</p>
        ) : (
          <ul className="data-list">
            {filteredData.map((item, index) => (
              <li key={index} className="data-item">
                <div className="photo-container">
                  {item?.photo ? <img src={item.photo} alt="Photo du personnel" className="photo-bubble" /> : 'N/A'}
                </div>
                <strong>Nom:</strong> {item?.nom || 'N/A'}<br />
                <strong>Prénom:</strong> {item?.prenom || 'N/A'}<br />
                <strong>Grade:</strong> {item?.grade || 'N/A'}<br />
                <strong>Email:</strong> {item?.email || 'N/A'}<br />
                <strong>Caserne:</strong> {item?.caserne || 'N/A'}
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
