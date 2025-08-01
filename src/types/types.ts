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

export type PlayerInfo = {
    player: {
        username: string;
        Player: {
            alias: string;
            region: string;
            roles: string[];
            rank: string;
            availability: string;
        } | null;
    };
}