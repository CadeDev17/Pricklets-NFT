import ProtonWebSDK, { Link, LinkSession, ProtonWebLink } from '@proton/web-sdk'



let activeLink: ProtonWebLink | Link | void
let activeSession: LinkSession | void

const account = 'decryptr'
const tokenContract = 'eosio.token'
const tokenSymbol = 'XPR'
const appIdentifier = "taskly"
const chainId = "384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0"
const endpoints = ["https://api.protonnz.com"]
const images = ['/MartialArts!.0bd9e1df.png', '/Cowboy.1b74f804.png', '/SleepingZombie.996fbeca.png', '/Vandal.e2c4911b.png']


const img = document.querySelector('#img') as HTMLImageElement
const imgCarouselBtn = document.querySelector('#next') as HTMLButtonElement
const imgContent = document.querySelector('#image-content') as HTMLDivElement
const welcomeMessage = document.querySelector('#welcome-message') as HTMLBaseElement
const loginButton = document.querySelector('#login-button') as HTMLButtonElement
const avatar = document.querySelector('#avatar') as HTMLDivElement
const avatarName = document.querySelector('#avatar-name') as HTMLSpanElement
const avatarImage = document.querySelector('#avatar-image') as HTMLImageElement
const logoutIcon = document.querySelector('#logout') as HTMLElement
// const fromInput = document.querySelector('#from-input') as HTMLElement
// const toInput = document.querySelector('#to-input') as HTMLElement
// const amountInput = document.querySelector('#amount-input') as HTMLElement
// const transferButton = document.querySelector('#transfer-button') as HTMLElement

// if images length is equal to the current count, current count goes back to 0
// on click count will increment one, starting at the first index of images array 0
let count = 1 

imgCarouselBtn.addEventListener('click', event => {
    count++
    if (count === images.length) {
        count = 0
    }
    console.log(img)
    img.src = images[count]
    console.log(img)
})

interface getBalanceParams {
    account: string,
    tokenContract: string,
    tokenSymbol: string
}
const getBalance = async (params: getBalanceParams): Promise<number> => {
    if (!activeSession) return 0
    const [balance] = await activeSession.client.get_currency_balance(params.tokenContract, params.account, params.tokenSymbol)

    if (balance) {
        return Number(balance.split(' ')[0])
    } else {
        return 0
    }
}

    

const updateStatus = async () => {

    if (activeSession && activeSession.auth) {
        
        let balance = await getBalance({account, tokenContract, tokenSymbol})
        .then(res => {
            return res
        }).catch(err => console.log(err))
        avatarName.textContent =  `${activeSession.auth.actor.toString()} (${balance} ${tokenSymbol})`
        avatarName.style.fontSize = "1.5rem"
        welcomeMessage.textContent = `Hey ${activeSession.auth.actor.toString()}, welcome to PrickTopia!`
        // fromInput.value = activeSession.auth.actor.toString()
        loginButton.style.display = "none"
        avatar.style.display = "block"
        avatarImage.style.display = "block"
        logoutIcon.style.display = "block"
    } else {
        avatarName.textContent = ""
        welcomeMessage.textContent = 'Hey, welcome to PrickTopia!'
        // fromInput.value = ""
        loginButton.style.display = "block"
        avatar.style.display = "none"
        avatarImage.style.display = "none"
        logoutIcon.style.display = "none"
    }
}
updateStatus()

const login = async (restoreSession: boolean) => {
    const { link, session } = await ProtonWebSDK({
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

    activeLink = link as ProtonWebLink | Link
    activeSession = session as LinkSession

    updateStatus()  
}

const logout = async () => {
    if (activeLink && activeSession) {
        await activeLink.removeSession(appIdentifier, activeSession.auth, chainId);
    }
    activeSession = undefined;
    activeLink = undefined;

    updateStatus()
}

// const transfer = async ({ to, amount }) => {
//     if (!activeSession) {
//         throw new Error('No Session');
//     }

//     return await activeSession.transact({
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
//             from: activeSession.auth.actor,

//             // Receiver
//             to: to,

//             // 4 is precision, XPR is symbol
//             quantity: `${(+amount).toFixed(4)} XPR`,

//             // Optional memo
//             memo: ""
//         },
//         authorization: [activeSession.auth]
//         }]
//     }, {
//         broadcast: true
//     })
// }

// Add button listeners
logoutIcon.addEventListener('click', () => logout())
loginButton.addEventListener("click", () => login(false))
// transferButton.addEventListener("click", () => transfer({
// to: toInput.value,
// amount: amountInput.value,
// }))

// Restore
login(true)