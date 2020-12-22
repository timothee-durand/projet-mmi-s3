const host = "https://pictum.pu-pm.univ-fcomte.fr/api/";

export default {
  login: host + "login",
  keyTokenLocal: "token",


  //routes
  materiels: host +  "materiels",
  types: host +  "types",
  malettes: host +  "malettes",
  departements: host +  "departements",
  gestionnaires: host +  "gestionnaires",
  allLDAP : host + "ldap/all",
  getLDAP : host + "ldap/verify",
}
