import { Play, HandPalm } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { 
    HomeContainer, 
    StartCountdownButton, 
    StopCountdownButton, 
} from "./styles";

import { useContext } from "react";
import { NewCycleForm } from "./Components/NewCycleForm";
import { Countdown } from "./Components/Coundown";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(5, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5,'O tempo mínimo é de 5 minutos.')
        .max(60, 'O tempo máximo é de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)
    
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })

    const { handleSubmit, watch, reset } = newCycleForm; // verificar se tem = depois da const

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }
           
    const task = watch('task')
    const isSubmitDisabled = !task;

    /**
     * Prop Drilling -> Qunado a gente tem MUITAS propriedade APENAS para comunicação entre componentes
     * Context API -> Permite compartilhamos informações entre VÁRIOS componentes ao mesmo tempo
     */

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />  {/* importado de outra pasta */}
                </FormProvider>
                <Countdown /> {/*  importado de outra pasta */}
               

                { activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>

                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}

            </form>
        </HomeContainer>
    )
}