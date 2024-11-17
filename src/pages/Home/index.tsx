import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutsAmountInput, 
    Separator, 
    StartCountdownButton, 
    TaskInput
} from "./styles";

// Formulario controlled / Formulario uncontrolled

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5,'O tempo mínimo é de 5 minutos.')
        .max(60, 'O tempo máximo é de 60 minutos'),
})

// interface NewCycleFormData {
//     task: string;
//     minutesAmount: number;
// }

// Pode usar a 'interface' acima ou o 'type' de validação abaixo para informa o tipo de variavel 'task' e 'minutesAmount'. O 'type' adiciona as variaveis de forma automatica. As variaveis estão no 'const newCycleFormValidationSchema = zod.object'.

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data)  
        reset(); // para a 'reset' funcionar corretamente, sempre declare as variaveis e, em  'defaultValues:' = task: '', minutesAmount: 0,
    }

    // foi utilizado o isSubmitDisabled para identificar a função da task facilmente, podendo ser substituido por qualquer outra função.
    const task = watch('task')
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task"
                        list="tasksuggestions" 
                        placeholder="Dê um nome para o seu projeto" 
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
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>
            
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}