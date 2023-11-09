
export type contextType = {
    id: number
    type: 'multipleChoice' | 'text' | 'choice'
    text: string[]
    children?: contextType[]
    key?: number
}
export const context: contextType[] = [
    {
        id: 1,
        type: 'multipleChoice',
        text: ["This is an interactive guide to Mahdi.",
        "Please choose one of the followings.",
    "At any time you may press backspace to go back."],
        children: [
            {
                id: 11,
                type: "choice",
                key: 1,
                text: ["know about mahdi programming skills"],
                children: [
                    {
                        id: 111,
                        type: "text",
                        text: [
                            "-- mahdi programming skills:",
                            "Recently He has been working as fullstack or frontend developer favoring React in frontend,",
                            "while Laravel has been his experience in backend.",
                            "Mahdi's first website development experience was when he was at high school.",
                            "He developed a website for his highschool using simple html and ASP.",
                            "He continued working while he was at university and finally resigned from his Master degrees",
                            "in favor of a full time position in an international realestate website solution provider.",
                        ]
                    }
                ]
            },
            {
                id: 12,
                type: "choice",
                key: 2,
                text: ["list his programing hard skills in order of proficiency"],
                children: [
                    {
                        id: 121,
                        type: "text",
                        text: [
                            "JS/JSX/TSX React&Recoil&Mui/Vue",
                            "He developed a website for his highschool using simple html and ASP.",
                            "He continued working while he was at university and finally resigned from his Master degrees",
                            "in favor of a full time position in an international realestate website solution provider.",
                            "Recently He has been working as fullstack or frontend developer favoring React in front while",
                            "Laravel has been his experience in backend.",
                        ]
                    }
                ]
            },
            {
                id: 13,
                type: "choice",
                key: 3,
                text: ["know what is this and how it is programmed!"],
                children: [
                    {
                        id: 121,
                        type: "text",
                        text: [
                            "This is a Web React application running on your browser.",
                            "It is composed of elements called <b>Components</b>",
                            "He continued working while he was at university and finally resigned from his Master degrees",
                            "in favor of a full time position in an international realestate website solution provider.",
                            "Recently He has been working as fullstack or frontend developer favoring React in front while",
                            "Laravel has been his experience in backend.",
                        ]
                    }
                ]
            }
        ]
    }
]
export const getContextItembyId = (id: number, cntx: contextType[]): boolean | contextType => {
    for (let i = 0; i < cntx.length; i++) {
        if (cntx[i].id == id)
            return cntx[i];

        if (cntx[i].children) {
            const childFound = getContextItembyId(id, cntx[i].children);
            if (childFound)
                return childFound;
        }
    }
    return false;
}
 export const getParentContext = (id: number, cntx: contextType[]): boolean | contextType => {
    for (let i = 0; i < cntx.length; i++) {
        if (cntx[i].children) {
            const childFound = getContextItembyId(id, cntx[i].children);
            if (childFound)
                return cntx[i];
        }
    }
    return false;
}
 