import { z } from "zod"

export const CaseSchema = z.object({
  title:       z.string().min(5).max(120),
  description: z.string().min(20).max(5000),
  category:    z.enum(["criminal","civil","family","property","corporate","other"]),
  priority:    z.enum(["low","medium","high","urgent"]),
  clientId:    z.number().int().positive(),
  hearingDate: z.string().datetime().optional(),
})

export type CaseForm = z.infer<typeof CaseSchema>

// In your React form (using react-hook-form + zodResolver):
// const { register, handleSubmit, formState: { errors } } =
//   useForm<CaseForm>({ resolver: zodResolver(CaseSchema) })
