import { PlayerEntity } from "./types"

type SinglePlayerProps =  {
    player: PlayerEntity
}

export const SinglePlayer = ({player}: SinglePlayerProps) => {
    return(
        <>
        <li>
            <h2><strong>{player.name}{player.lastname}</strong></h2>
        </li>
        </>
    )
}