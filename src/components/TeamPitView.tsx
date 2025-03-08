'use client'

import { useRef } from "react";

type Props = {
    teams: PitViewTeam[]
}

export type PitViewTeam = {
    teamNumber: number
    highlightColor: string
}

export default function TeamPitView({teams}: Props){
    const pitViewRef = useRef(null)

    const teamPositions = {
        3981:[40,240],
        6899:[80,240],
        14807:[240,240],
        14896:[120,240],
        15059:[320,240],
        15060:[0,210],
        15239:[320,20],
        15352:[320,180],
        16075:[0,150],
        16076:[0,180],
        16187:[200,240],
        17852:[280,150],
        17853:[0,240],
        17865:[320,150],
        17878:[320,50],
        17883:[40,210],
        17884:[280,20],
        17980:[280,210],
        22638:[40,180],
        22647:[40,120],
        22701:[320,210],
        22705:[240,210],
        22707:[200,210],
        22726:[280,180],
        22755:[280,240],
        24994:[80,210],
        25292:[40,150], 
        25406:[280,50],
    } as {[index:number]: [number, number]}

    const teamNumbers = teams.map(team => team.teamNumber)

    return (
        <svg ref={pitViewRef} className="w-[360px] h-[300px]">
            {Object.entries(teamPositions).map(([id, [x,y]])=>{
                const teamNumber = Number.parseInt(id);
                return (
                <g key={id}>
                    <rect className="w-[30px] h-[10px] stroke-black"
                    x={x}
                    y={y}
                    fill={teamNumbers.includes(teamNumber) ? teams.find(t => t.teamNumber == teamNumber)!.highlightColor : "white"}>
                    </rect>
                    <text className="text-xs"
                    x={x}
                    y={y-3}
                    textAnchor="mid">
                        {id}
                    </text>
                </g>)
            })}
        </svg>
    )
}