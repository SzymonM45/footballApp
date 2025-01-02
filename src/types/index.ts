export type PlayerEntity = {
    id: string;
    name: string;
    lastname: string;
    teamId: string;
    teamName?: string;
}

export type TeamsEntity = {
    "id": string;
    "name": string;
    "yearofcreation":string;
    "city": string
}

export type PlayerDto = Omit<PlayerEntity, 'id'>

export type TeamsDto = Omit<TeamsEntity, 'id'>

export type GameEntity = {
    id: string;
    matchdate: string;
    title: string;
    place: string;
    duration: string;
    idTeam1: string;
    idTeam2: string;
    goalsTeam1: number;
    goalsTeam2: number;
};