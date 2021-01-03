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
        getCurrentMaterielsFromId: state => id => state.materielsID.find(element => element === id)

            /*{
                return id => contexte.materielsID.find(id)
                /*(contexte)
            } => (id) => {
            return contexte.materielsID.find(id);
        },*/

    },

    mutations : {
        addMaletteId (state, maletteId) {
            state.malettesID.push(maletteId);
        },
        addMaterielId (state, materielId) {
            for( let i = 0; i < state.materielsID.length; i++ )
            {
                if( state.materielsID[i] === materielId )
                {
                    return;
                }
            }
            state.materielsID.push(materielId);
        },

    }
}



