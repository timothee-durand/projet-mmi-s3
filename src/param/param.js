const host = "https://pictum.pu-pm.univ-fcomte.fr/api/";

export default {
  login: host + "login",

  keyTokenLocal: "token",

  messages: {
    sending:"Votre nouvelle entrée est en cours d'envoi",
    stored:"Votre nouvelle entrée est enregistrée !",
    problem:"Un problème à l'enregistrement a eu lieu :",
    getting:"Chargement de l'entrée en cours...",
    success:"L'envoi a reussi !",
  },

  routeAdminName: [
    "AccueilAdmin",
    "MaterielAdmin",
    "CreneauxAdmin",
    "MailAdmin",
    "BlacklistAdmin",
    "RoleAdmin",
    "RDVAdmin",
    "CreneauxParamAdmin"
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
  creneaux:host+"creneaux",


  allLDAP : host + "ldap/all",
  getLDAP : host + "ldap/verify",

  //mail
  sendMailGest: host + "send-mail-gest",
}
