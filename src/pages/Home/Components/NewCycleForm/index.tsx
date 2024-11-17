import { useForm } from "react-hook-form"
import { FormContainer, MinutsAmountInput, TaskInput } from "./style"
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

// Formulario controlled / Formulario uncontrolled

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5,'O tempo mínimo é de 5 minutos.')
        .max(60, 'O tempo máximo é de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
                id="task"
                list="tasksuggestions" 
                placeholder="Dê um nome para o seu projeto" 
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id="tasksuggestions">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
                <option value="Projeto 4"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutsAmountInput 
                type="number" 
                id="minutesAmount" 
                placeholder="00" 
                step={5}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}