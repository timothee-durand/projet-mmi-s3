//module VueX pour stocker la réservation en cours

export default {
    state: {
        materielsID : [],
        malettesID : [],
        dateDebutPret : null,
        timeDebutPret : null,
        dateFinPret : null,
        timeFinPret : null,
    },

    getters: {

        getCurrentMaterielsId(context) {
            return context.materielsID;
        },


        getUser (context) {
            return context.user
        },
        isGest (context) {
            return context.userType === 'GEST'
        },
        isAuthenticated(context){
            //regarde si il y a la propriété id a l'utilisateur stocké (objet initialisé à vide)
            return "id" in context.user;
        },
        isAdmin(context){
            return context.user.admin === 1;
        }
    },

    mutations : {
        addMaletteId (state, maletteId) {
            state.malettesID.push(maletteId);
        },
        addMaterielId (state, materielId) {
            state.materielsID.push(materielId);
        },
        setusertype (state, type) {
            state.userType = type;
        },
        resetUser(state){
            state.user = {};
            state.userType = "";
        }
    }
}



