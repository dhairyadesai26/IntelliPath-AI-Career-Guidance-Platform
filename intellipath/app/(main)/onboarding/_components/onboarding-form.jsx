"use client" ;
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card"; 
import { useState } from "react";
const OnboardingForm = ({ industries }) => {
 const {selectedIndustry,setSelectedIndustry}=useState(null);
 const router=useRouter();
    const {register,handleSubmit,formState:{errors},
setValue,watch,
}=useForm({
  resolver:zodResolver(onboardingSchema),
});
return <div className="flex">
    <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
</div>
};
export default OnboardingForm;