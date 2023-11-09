
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
                            "You may press <i>backspace</i> to go back to menu."
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
                            "Javascript (expert): ES6&JSX&TSX, React&Recoil, Vue, TDD (Dusk)",
                            "UI (experienced): HTML&CSS3, SCSS, LESS, MUI, Vuetify",
                            "PHP (expert): Laravel, graphQL (Lighthouse), Sail, Telescope, Sanctum, Passport, Scout",
                            "Databases(Intermediate): MySQL, Mongo, AWS aurora and RDS",
                            "devOps (beginner): AWS, Docker, Docker-compose",
                            "Managerial(Intermediate): SCRUM, ClickUp, Trello Atlasian",
                            "Other hard skills: Java, JavaFX",
                            "You may press <i>backspace</i> to go back to menu."
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
                            "It is composed of elements called <b>Components</b>. For instance a <i>Keyboard</i> and a <i>Screen</i>",
                            "are main components of the react app.",
                            "Recoil is used for state management. Simply it is used to transfer data from <i style='color:red'>keyboard</i> to screen.",
                            "The main application does the context management to display context or listen to your commands!",
                            "If you need more the code is publicly available at <a href='https://github.com/mehrizi/keyboard'>Github</a>",
                            "You may press <i>backspace</i> to go back to menu."
                        ]
                    }
                ]
            },
            {
                id: 14,
                type: "choice",
                key: 4,
                text: ["see contacts and a PDF version of the CV."],
                children: [
                    {
                        id: 121,
                        type: "text",
                        text: [
                            "Well Mahdi's email is mahdi.mehrizi[at]gmail.com",
                            "You may reach me on whatsapp on +905366531986 or +989153021950",
                            "Social Media: <a href='https://www.linkedin.com/in/mahdi-mehrizi/'>Llinkedin</> ",
                            "CV in PDF: @toDo ", // @todo
                            "You may press <i>backspace</i> to go back to menu."
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
