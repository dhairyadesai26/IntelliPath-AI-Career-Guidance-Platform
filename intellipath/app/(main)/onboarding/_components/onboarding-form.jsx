"use client" ;
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card"; 
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const OnboardingForm = ({ industries }) => {
 const [selectedIndustry,setSelectedIndustry]=useState(null);
 const router=useRouter();
    const {register,handleSubmit,formState:{errors},
setValue,watch,
}=useForm({
  resolver:zodResolver(onboardingSchema),
});
const onSubmit=async(values)=>{};
const watchIndustry=watch("industry");

return <div className="flex items-center justify-center bg-background">
    <Card className="w-full max-w-lg mt-10 mx-2">
  <CardHeader>
    <CardTitle className="gradient-title text-4xl">Complete Your Profile</CardTitle>
    <CardDescription>Select your industry to get personalized career insights and recommendations</CardDescription>
  </CardHeader>
  <CardContent>
    
      <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
        <Select 
        onValueChange={(value)=>{
          setValue("industry",value);
          setSelectedIndustry(
        industries.find((ind)=>ind.id===value)
          );
          setValue("subIndustry","");
        }}  >
  <SelectTrigger id="industry">
    <SelectValue placeholder="Select an industry" />
  </SelectTrigger>
  <SelectContent>
    {industries.map((ind)=>{
     return (
      <SelectItem key={ind.id} value={ind.id}>{ind.name}</SelectItem>
     );
    })}
     <SelectItem value="light">Light</SelectItem>
      
  </SelectContent>
</Select>
{errors.industry && (<p className="text-red-500 text-sm">{errors.industry.message}</p>)}
</div>
{watchIndustry && <div className="space-y-2">
          <Label htmlFor="subIndustry">Specialization</Label>
        <Select 
        onValueChange={(value)=>{
          setValue("subIndustry",value);
          setSelectedIndustry(
        industries.find((ind)=>ind.id==value)
          );
          setValue("subIndustry","")
        }}  >
  <SelectTrigger id="subIndustry">
    <SelectValue placeholder="Select an industry" />
  </SelectTrigger>
  <SelectContent>
    {selectedIndustry?.subIndustries.map((ind)=>{
     return (
      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
     );
    })}
     <SelectItem value="light">Light</SelectItem>
      
  </SelectContent>
</Select>
{errors.subIndustry && (<p className="text-red-500 text-sm">{errors.subIndustry.message}</p>)}
</div>}
<div className="space-y-2">
          <Label htmlFor="experience">Years of Experience</Label>    
          <Input   
          id="experience"
          type="number"
          min="0"
          max="50"
          placeholder="Enter  years of experience"
          {...register("experience")} />
{errors.experience && (<p className="text-red-500 text-sm">{errors.experience.message}</p>)}
</div>
<div className="space-y-2">
         < Label htmlFor="skills">skills</Label>    
          <Input   
          id="skills"    
          placeholder="e.g., JavaScript, Python, Project Management"
          {...register("skills")} />
          <p className="text-sm text-muted-foreground">Seperate multiple skills with commas</p>
{errors.skills && (<p className="text-red-500 text-sm">{errors.skills.message}</p>)}
</div>
      </form>
    
  </CardContent>
 
</Card>
</div> 
};

export default OnboardingForm 