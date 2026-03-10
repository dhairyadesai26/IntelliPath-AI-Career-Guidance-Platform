"use client"
import { LineChart, TrendingUp,TrendingDown, BriefcaseIcon } from 'lucide-react';
import React from 'react'
import { format, formatDistanceToNow } from 'date-fns';   
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain } from 'lucide-react';
import { ResponsiveContainer,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Bar } from "recharts";
const DashboardView = ({insights}) => {
 
  const salaryData =
  insights?.salaryRanges?.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    median: range.median / 1000,
    max: range.max / 1000,
  })) || [];
  const getDemandLevelColor=(level)=>{
    switch(level.toLowerCase()){
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default: 
      return "bg-gray-500";
    }
  };
  const getDemandLevelValue = (level) => {
  switch(level.toLowerCase()){
    case "high":
      return 90;
    case "medium":
      return 60;
    case "low":
      return 30;
    default:
      return 0;
  }
};
  const getMarketOutlookInfo=(outlook)=>{
    switch(outlook.toLowerCase()){
      case "positive":
        return {icon:TrendingUp,color:"text-green-500"};
      case "neutral":
        return {icon:LineChart
          ,color:"text-yellow-500"};

          case "negative":
            return{icon:TrendingDown,color:"text-red-500"};
            default:
              return { icon:LineChart,color:"text-gray-500"};
        }
      };
      const OutLookIcon=getMarketOutlookInfo(insights.marketOutlook).icon;
      const OutLookColor=getMarketOutlookInfo(insights.marketOutlook).color;
      const lastUpdatedDate=format(new Date(insights.lastUpdated), "dd/MM/yyyy");
      const nextUpdateDistance=formatDistanceToNow(
        new Date(insights.nextUpdate),
         {addSuffix:true}
       );
  return (
    <div  className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
       </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
   <Card>
  <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-2">
    <CardTitle >Market Outlook</CardTitle>
    <OutLookIcon className={`${OutLookColor} w-5 h-5 mt-1`} />
  </CardHeader>

  <CardContent>
    <div className={`text-2xl font-bold `}>
      {insights.marketOutlook}
    </div>

    <p className="text-xs text-muted-foreground mt-1">
      Next update {nextUpdateDistance}
    </p>
  </CardContent>
</Card>
 <Card>
  <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-2">
    <CardTitle >Industry Growth </CardTitle>
    <TrendingUp className="h-4 w-4 text-muted-foreground"/>
  </CardHeader>

  <CardContent>
    <div className={`text-2xl font-bold `}>
      {insights.growthRate.toFixed(1)}%
    </div>
 <Progress value={insights.growthRate} className="mt-2"/>
    <p className="text-xs text-muted-foreground mt-1">
      Next update {nextUpdateDistance}
    </p>
  </CardContent>
</Card>
 <Card>
  <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-2">
    <CardTitle >Demand Level</CardTitle>
    <BriefcaseIcon className="h-4 w-4  text-muted-foreground"/>
  </CardHeader>

  <CardContent>
    <div className={`text-2xl font-bold `}>
      {insights.demandLevel}
    </div>
<Progress value={getDemandLevelValue(insights.demandLevel)} className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
  

    
  </CardContent>
</Card>
 <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
       <Card>
          <CardHeader >
            <CardTitle >Salary Ranges by Role</CardTitle>
          <CardDescription>
            Displaying minimum,median,and maximum salaries (in thousands)
          </CardDescription>
          </CardHeader>
         <CardContent className="w-full flex justify-center">
  <BarChart
    style={{
      width: "100%",
      maxWidth: "900px",
      maxHeight: "450px",
      aspectRatio: 1.6,
    }}
    responsive
    data={salaryData}
    margin={{
      top: 20,
      right: 20,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />

   <XAxis
  dataKey="name"
  interval={0}
  angle={-20}
  textAnchor="end"
  tick={{ fontSize: 12 }}
/>
    <YAxis domain={[0, "dataMax + 20"]} />

    <Tooltip
      formatter={(value) => `$${value}K`}
      contentStyle={{
        borderRadius: "8px",
        border: "1px solid #ddd",
      }}
    />

    <Bar
      dataKey="min"
      fill="#94a3b8"
      name="Min Salary (K)"
      radius={[6, 6, 0, 0]}
    />

    <Bar
      dataKey="median"
      fill="#64748b"
      name="Median Salary (K)"
      radius={[6, 6, 0, 0]}
    />

    <Bar
      dataKey="max"
      fill="#475569"
      name="Max Salary (K)"
      radius={[6, 6, 0, 0]}
    />
  </BarChart>
</CardContent>
   
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <Card>
          <CardHeader >
            <CardTitle >Key Industry Trends</CardTitle>
          <CardDescription>
         Current Trends shaping the industry
          </CardDescription>
          </CardHeader>
         <CardContent>
          <ul className="space-y-4">
            {insights.keyTrends.map((trend,index)=>(
              <li key={index} className="flex items-start space-x-2">
                 <div className="mt-2 h-2 w-2 rounded-full bg-primary"/>
                <span>{trend}</span>
              </li>
            ))}
          </ul>

  </CardContent>
   
        </Card>
            <Card>
          <CardHeader >
            <CardTitle >Recommended Skills</CardTitle>
          <CardDescription>
        Skills to consider developing
          </CardDescription>
          </CardHeader>
         <CardContent>
          <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>

  </CardContent>
   
        </Card>
        </div>


        </div>
   
  )
}

export default DashboardView
