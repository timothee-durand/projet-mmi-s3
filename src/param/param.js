const host = "https://pictum.pu-pm.univ-fcomte.fr/api/";

export default {
  login: host + "login",
  nbCaracShortText : 20,
  passwordForgot: host + "email/send/new-password",
  mailVerifiationResend: host + "/email/resend",

  keyTokenLocal: "token",

  messages: {
    sending:"Votre nouvelle entrée est en cours d'envoi",
    stored:"Votre nouvelle entrée est enregistrée !",
    problem:"Un problème à l'enregistrement a eu lieu :",
    getting:"Chargement de l'entrée en cours...",
    success:"L'envoi a reussi !",
  },

  routeGestName: [
    "AccueilAdmin",
    "MaterielAdmin",
    "CreneauxAdmin",
    "MailAdmin",
    "BlacklistAdmin",
    "RoleAdmin",
    "RDVAdmin",
    "CreneauxParamAdmin"
  ],

  routeAdminName:[
    "RoleAdmin"
  ],

  routeUnauthenticatedName:[
    "Login",
    "Accueil",
    "AdminContact"
  ],


  //routes
  materiels: host +  "materiels",
  types: host +  "types",
  malettes: host +  "malettes",
  departements: host +  "departements",
  gestionnaires: host +  "gestionnaires",
  reservations: host +  "reservations",
  blacklists: host +  "blacklists",
  estpretes: host + "estpretes",
  creneaux: host+"creneaux",
  indisponibilites: host + "indisponibilites",
  passwordChange: host +"password/change",
  verifyRes : host + "verify/res",


  allLDAP : host + "ldap/all",
  getLDAP : host + "ldap/verify",

  //mail
  sendMailGest: host + "send-mail-gest",
  sendMailAdmin: host + "send-mail-contact-admin",

}
