import { Dispatch, SetStateAction } from "react";

export type WizardData = {
    region: string;
    roles: string[];
    rank: string;
    alias: string;
};

export type StepProps = {
    data: WizardData;
    setData: Dispatch<SetStateAction<WizardData>>;
    next: () => void;
    prev: () => void;
};