import "./css/index.css"
import IMask from "imask" // import IMask

const ccBgColor01 = document.querySelector(".cc-bg svg >g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg >g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type){
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "gray"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

// MASK THE SECURITY CODE
const ccSecurityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
  placeholderChar: "•"
}

const securityCodeMasked = IMask(ccSecurityCode,securityCodePattern)

// MASK THE EXPIRATION DATE
const ccExpirationDate = document.querySelector("#expiration-date")
const  expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM:{
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY:{
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}

const expirationDateMasked = IMask(ccExpirationDate,expirationDatePattern)

// CARD NUMBER MASK
const ccNumber = document.querySelector("#card-number")
const ccNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|2[3-7]\d{0,2}\d{0,12})/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],

  


  dispatch: function (appended, dynamicMasked) {// CRIAR UMA FUNCAO dispatch que funciona semelherante a recursao ou seja ela chama ela mesma
    const number = (dynamicMasked.value + appended).replace(/\D/g, "") //Pega cada caractere e adiciona na dynamicMasked e caso nao for um digito substitui por nada
    const foundMask = dynamicMasked.compiledMasks.find(function (item) { //Procura uma mascara valida no array de mask ccNumberPattern e caso encontre atraves do match retorna
      return number.match(item.regex)
    })

    console.log(foundMask)
    return foundMask
  },
}

const ccNumberMasked = IMask(ccNumber,ccNumberPattern)