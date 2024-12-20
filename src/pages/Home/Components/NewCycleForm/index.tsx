import { FormContainer, MinutsAmountInput, TaskInput } from "./style"
import { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { CyclesContext } from "../../../../contexts/CyclesContext"

// Formulario controlled / Formulario uncontrolled

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

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
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}