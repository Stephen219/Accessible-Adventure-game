'use client';
import React, { useEffect, useState } from 'react';

import StatisticsDashboard from '@/components/Statistics';
import useAuth from '@/utils/useAuth';
import { fetchGameStatistics } from '@/utils/Statistics'
export default function Page() {
  const { user } = useAuth();
  const [gameStats, setGameStats] = useState(null); // State for game statistics
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        console.log('Fetching data for user:', user.uid);
        try {
          const stats = await fetchGameStatistics(user.uid);
          setGameStats(stats);
          console.log('Fetched game statistics:', stats);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false); // Hide loading state after data is fetched
        }
      }
    };

    if (user) {
      fetchData(); // Fetch data once user is available
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if any error occurs during fetching
  }
  console.log(gameStats.highScore)
  return (
        <StatisticsDashboard
            highScore={gameStats?.highScore ?? 0} 
            totalGamesPlayed={gameStats?.totalGamesPlayed ?? 0}
            totalTimePlayed={gameStats?.totalTimePlayed ?? 0}
            coins={gameStats?.coins ?? 0}
            averageTimePerGame={gameStats?.averageTimePerGame ?? 0}
            shortestGame={gameStats?.shortestGame ?? 0}
            longestGame={gameStats?.longestGame ?? 0}
        />
    );
 
}
