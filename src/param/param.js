const host = "https://pictum.pu-pm.univ-fcomte.fr/api/";

export default {
  login: host + "login",
  keyTokenLocal: "token",

  messages: {
    sending:"Votre nouvelle entrée est en cours d'envoi",
    stored:"Votre nouvelle entrée est enregistrée !",
    problem:"Un problème à l'enregistrement a eu lieu :",
  },


  //routes
  materiels: host +  "materiels",
  types: host +  "types",
  malettes: host +  "malettes",
  departements: host +  "departements",
  gestionnaires: host +  "gestionnaires",
  allLDAP : host + "ldap/all",
  getLDAP : host + "ldap/verify",
}
