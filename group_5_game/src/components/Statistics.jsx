import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, GamepadIcon, Clock, Coins, Timer, Hourglass } from 'lucide-react'


/**
 * StatisticsDashboard Component
 * Displays various statistics related to a user's gameplay.
 * Includes sections for overall stats, time analysis, and achievement progress.
 *
 * Props:
 * highScore - The user's highest score.
 * totalGamesPlayed - The total number of games played by the user.
 * totalTimePlayed - The total amount of time the user has spent playing (in seconds).
 * coins - The total number of coins earned by the user.
 * averageTimePerGame - The average time spent per game (in seconds).
 * shortestGame - The duration of the shortest game (in seconds).
 * longestGame - The duration of the longest game (in seconds).
 */

const StatisticsDashboard = ({ 
  highScore = 0, 
  totalGamesPlayed = 0, 
  totalTimePlayed = 0, 
  coins = 0,
  averageTimePerGame = 0,
  shortestGame = 0,
  longestGame = 0
}) => {
  // Helper function to format time in minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <div className="min-h-screen w-full p-6 bg-black">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Stats Card */}
        <Card className="w-full bg-black/90 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Game Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-4 rounded-lg bg-purple-500/10 p-4">
              <Trophy className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-purple-200">High Score</p>
                <p className="text-2xl font-bold text-white">{highScore}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-lg bg-purple-500/10 p-4">
              <GamepadIcon className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-purple-200">Games Played</p>
                <p className="text-2xl font-bold text-white">{totalGamesPlayed}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-lg bg-purple-500/10 p-4">
              <Clock className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-purple-200">Time Played</p>
                <p className="text-2xl font-bold text-white">
                  {Math.floor(totalTimePlayed / 60)} mins
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-lg bg-purple-500/10 p-4">
              <Coins className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-purple-200">Coins Earned</p>
                <p className="text-2xl font-bold text-white">{coins}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Analysis Card */}
        <Card className="w-full bg-black/90 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Time Analysis</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center space-x-4 rounded-lg bg-purple-500/10 p-4">
              <Timer className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-purple-200">Average Time per Game</p>
                <p className="text-2xl font-bold text-white">{formatTime(averageTimePerGame)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-lg bg-purple-500/10 p-4">
              <Hourglass className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-purple-200">Shortest Game</p>
                <p className="text-2xl font-bold text-white">{formatTime(shortestGame)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-lg bg-purple-500/10 p-4">
              <Clock className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-purple-200">Longest Game</p>
                <p className="text-2xl font-bold text-white">{formatTime(longestGame)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Progress Card */}
        <Card className="w-full bg-black/90 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Achievement Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-purple-500/10 p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-purple-200">
                  <span>Games Milestone</span>
                  <span>{totalGamesPlayed}/100</span>
                </div>
                <div className="h-2 w-full bg-purple-950 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${Math.min((totalGamesPlayed / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsDashboard;

