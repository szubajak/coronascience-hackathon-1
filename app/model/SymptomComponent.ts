
interface SymptomComponent {
    id: string;
    code: string;
}

export const SYMPTOM_COMPONENTS: Array<SymptomComponent> = [
    {
        id: 'Eye',
        code: '81745001'
    },
    {
        id: 'Nose',
        code: '45206002'
    },
    {
        id: 'Mouth/Throat',
        code: '312533001'
    },
    {
        id: 'Lung',
        code: '39607008'
    },
    {
        id: 'Skin',
        code: '39937001'
    },
    {
        id: 'Gastrointestinal tract',
        code: '122865005'
    }
];