import { Friendship } from "@/generated/prisma";
import { Dispatch, SetStateAction } from "react";

export type WizardData = {
    region: string;
    roles: string[];
    rank: string;
    alias: string;
    description: string;
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
            userId: string;
            description: string;
            region: string;
            roles: string[];
            rank: string;
            availability: string;
        } | null;
        friendsSent: Friendship[];
        friendsReceived: Friendship[];
    };
}