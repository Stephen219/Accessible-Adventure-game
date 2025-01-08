


'use client';

import React, { useEffect, useState } from 'react';
import StatisticsDashboard from '@/components/Statistics';
import useAuth from '@/utils/useAuth';
import { fetchGameStatistics } from '@/utils/Statistics';
import AuthGuard from '@/utils/AuthGuard';

const Page = () => {
  const { user } = useAuth();
  const [gameStats, setGameStats] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

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
          setLoading(false); 
        }
      }
    };

    if (user) {
      fetchData(); 
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

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
};

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Page />
    </AuthGuard>
  );
}
