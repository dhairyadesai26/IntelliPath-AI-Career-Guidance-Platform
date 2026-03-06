import { parse, z } from "zod";
export const  onboardingSchema=z.object({
industry: z.string().min(1, "Industry is required"),
subIndustry: z.string().min(1, "Specialization is required"),
 bio:z.string().max(500).optional(),
 experience:z
 .string()
 .transform((val)=>parseInt(val,10))
 .pipe(
    z
    .number()
    .min(0,"Experience must be at least 0 years")
    .max(50,"Experience cannot exceed 50 years")

 ),
 skills:z.string().transform((val)=>
   val
  ? val.split(",")
  .map((skill)=>skill.trim())
  .filter(Boolean)
  :undefined

),
});