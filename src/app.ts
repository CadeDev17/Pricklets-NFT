import ProtonWebSDK from '@proton/web-sdk'

let link: any = undefined;
let session: any = undefined;

const appIdentifier = "taskly"
const chainId = "384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0"
const endpoints = ["https://proton.greymass.com"]

const loginButton = document.querySelector('#login-button') as HTMLButtonElement
const avatar = document.querySelector('#avatar') as HTMLDivElement
const avatarName = document.querySelector('#avatar-name') as HTMLSpanElement
const avatarImage = document.querySelector('#avatar-image') as HTMLImageElement
const logoutIcon = document.querySelector('#logout') as HTMLElement
// const fromInput = document.querySelector('#from-input') as HTMLElement
// const toInput = document.querySelector('#to-input') as HTMLElement
// const amountInput = document.querySelector('#amount-input') as HTMLElement
// const transferButton = document.querySelector('#transfer-button') as HTMLElement

const updateStatus = () => {

    if (session && session.auth) {
        avatarName.textContent = session.auth.actor.toString()
        // fromInput.value = session.auth.actor.toString()
        loginButton.style.display = "none"
        avatar.style.display = "block"
        avatarImage.style.display = "block"
        logoutIcon.style.display = "block"
    } else {
        avatarName.textContent = ""
        // fromInput.value = ""
        loginButton.style.display = "block"
        avatar.style.display = "none"
        avatarImage.style.display = "none"
        logoutIcon.style.display = "none"
    }
}
updateStatus()

const login = async (restoreSession: boolean) => {
    const { link: localLink, session: localSession } = await ProtonWebSDK({
        linkOptions: {
        endpoints,
        chainId,
        restoreSession,
        },
        transportOptions: {
        requestAccount: appIdentifier
        },
        selectorOptions: {
        appName: "Taskly",
        appLogo: "https://taskly.protonchain.com/static/media/taskly-logo.ad0bfb0f.svg",
        customStyleOptions: {
            modalBackgroundColor: "#F4F7FA",
            logoBackgroundColor: "white",
            isLogoRound: true,
            optionBackgroundColor: "white",
            optionFontColor: "black",
            primaryFontColor: "black",
            secondaryFontColor: "#6B727F",
            linkColor: "#752EEB"
        }
        }
    })

    link = localLink
    session = localSession

    updateStatus()  
}

const logout = async () => {
    if (link && session) {
        await link.removeSession(appIdentifier, session.auth, chainId);
    }
    session = undefined;
    link = undefined;

    updateStatus()
}

// const transfer = async ({ to, amount }) => {
//     if (!session) {
//         throw new Error('No Session');
//     }

//     return await session.transact({
//         actions: [{
//         /**
//          * The token contract, precision and symbol for tokens can be seen at protonscan.io/tokens
//          */

//         // Token contract
//         account: "eosio.token",

//         // Action name
//         name: "transfer",
        
//         // Action parameters
//         data: {
//             // Sender
//             from: session.auth.actor,

//             // Receiver
//             to: to,

//             // 4 is precision, XPR is symbol
//             quantity: `${(+amount).toFixed(4)} XPR`,

//             // Optional memo
//             memo: ""
//         },
//         authorization: [session.auth]
//         }]
//     }, {
//         broadcast: true
//     })
// }

// Add button listeners
logoutIcon.addEventListener('click', () => logout())
loginButton.addEventListener("click", () => login(true))
// transferButton.addEventListener("click", () => transfer({
// to: toInput.value,
// amount: amountInput.value,
// }))

// Restore
login(true)