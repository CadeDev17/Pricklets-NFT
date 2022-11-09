"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web_sdk_1 = __importDefault(require("@proton/web-sdk"));
var activeLink;
var activeSession;
var account = 'decryptr';
var tokenContract = 'eosio.token';
var tokenSymbol = 'XPR';
var appIdentifier = "taskly";
var chainId = "384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0";
var endpoints = ["https://api.protonnz.com"];
var images = [
    '/MartialArts!.0bd9e1df.png', '/Cowboy.1b74f804.png', '/SleepingZombie.996fbeca.png',
    '/Vandal.e2c4911b.png', '/Chef.2d208378.png', '/Mythic.688f78b0.png', '/Rare.53410e20.png',
    '/Roman.772f4c56.png'
];
var img = document.querySelector('#img');
var imgCarouselBtn = document.querySelector('#next');
var imgContent = document.querySelector('#image-content');
var welcomeMessage = document.querySelector('#welcome-message');
var loginButton = document.querySelector('#login-button');
var avatar = document.querySelector('#avatar');
var avatarName = document.querySelector('#avatar-name');
var avatarImage = document.querySelector('#avatar-image');
var logoutIcon = document.querySelector('#logout');
// const fromInput = document.querySelector('#from-input') as HTMLElement
// const toInput = document.querySelector('#to-input') as HTMLElement
// const amountInput = document.querySelector('#amount-input') as HTMLElement
// const transferButton = document.querySelector('#transfer-button') as HTMLElement
// if images length is equal to the current count, current count goes back to 0
// on click count will increment one, starting at the first index of images array 0
var count = 0;
imgCarouselBtn.addEventListener('click', function (event) {
    if (count === images.length) {
        count = 0;
    }
    else {
        count++;
        img.src = images[count];
    }
});
var getBalance = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!activeSession)
                    return [2 /*return*/, 0];
                return [4 /*yield*/, activeSession.client.get_currency_balance(params.tokenContract, params.account, params.tokenSymbol)];
            case 1:
                balance = (_a.sent())[0];
                if (balance) {
                    return [2 /*return*/, Number(balance.split(' ')[0])];
                }
                else {
                    return [2 /*return*/, 0];
                }
                return [2 /*return*/];
        }
    });
}); };
var updateStatus = function () { return __awaiter(void 0, void 0, void 0, function () {
    var balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(activeSession && activeSession.auth)) return [3 /*break*/, 2];
                return [4 /*yield*/, getBalance({ account: account, tokenContract: tokenContract, tokenSymbol: tokenSymbol })
                        .then(function (res) {
                        return res;
                    }).catch(function (err) { return console.log(err); })];
            case 1:
                balance = _a.sent();
                avatarName.textContent = "".concat(activeSession.auth.actor.toString(), " (").concat(balance, " ").concat(tokenSymbol, ")");
                avatarName.style.fontSize = "1.5rem";
                welcomeMessage.textContent = "Hey ".concat(activeSession.auth.actor.toString(), ", welcome to PrickTopia!");
                // fromInput.value = activeSession.auth.actor.toString()
                loginButton.style.display = "none";
                avatar.style.display = "block";
                avatarImage.style.display = "block";
                logoutIcon.style.display = "block";
                return [3 /*break*/, 3];
            case 2:
                avatarName.textContent = "";
                welcomeMessage.textContent = 'Hey, welcome to PrickTopia!';
                // fromInput.value = ""
                loginButton.style.display = "block";
                avatar.style.display = "none";
                avatarImage.style.display = "none";
                logoutIcon.style.display = "none";
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
updateStatus();
var login = function (restoreSession) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, link, session;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, web_sdk_1.default)({
                    linkOptions: {
                        endpoints: endpoints,
                        chainId: chainId,
                        restoreSession: restoreSession,
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
                })];
            case 1:
                _a = _b.sent(), link = _a.link, session = _a.session;
                activeLink = link;
                activeSession = session;
                updateStatus();
                return [2 /*return*/];
        }
    });
}); };
var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(activeLink && activeSession)) return [3 /*break*/, 2];
                return [4 /*yield*/, activeLink.removeSession(appIdentifier, activeSession.auth, chainId)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                activeSession = undefined;
                activeLink = undefined;
                updateStatus();
                return [2 /*return*/];
        }
    });
}); };
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
logoutIcon.addEventListener('click', function () { return logout(); });
loginButton.addEventListener("click", function () { return login(false); });
// transferButton.addEventListener("click", () => transfer({
// to: toInput.value,
// amount: amountInput.value,
// }))
// Restore
login(true);
