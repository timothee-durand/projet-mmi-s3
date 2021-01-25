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
        getCurrentMalettesId(context) {
            return context.malettesID;
        },
        getCurrentMaterielsFromId: state => id => state.materielsID.find(element => element === id),
        getCurrentMalettesFromId: state => id => state.malettesID.find(element => element === id),

        reservdateDebutIsSet(contexte)
        {
            return contexte.dateDebutPret !== null;
        },

        getReservdateDebut(contexte)
        {
            return contexte.dateDebutPret;
        },

        getReservTimeDebut(contexte)
        {
            return contexte.timeDebutPret;
        },

        getReservdateFin(contexte)
        {
            return contexte.dateFinPret;
        }



    },

    mutations : {
        addMaletteId (state, maletteId) {
            for( let i = 0; i < state.malettesID.length; i++ )
            {
                if( state.malettesID[i] === maletteId )
                {
                    return;
                }
            }
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
        supprMaterielId(state, materielId)
        {
            for( let i = 0; i < state.materielsID.length; i++ )
            {
                if( state.materielsID[i] === materielId )
                {
                    console.log(materielId);
                    console.log(state.materielsID[0]);
                    console.log(state.materielsID.indexOf(materielId));
                    state.materielsID.splice(state.materielsID.indexOf(materielId), 1);
                }
            }
            if( state.materielsID.length === 0)
            {
                state.dateDebutPret = null;
            }
        },
        supprMaletteId(state, maletteId)
        {
            for( let i = 0; i < state.malettesID.length; i++ )
            {
                if( state.malettesID[i] === maletteId )
                {
                    console.log(maletteId);
                    console.log(state.malettesID[0]);
                    console.log(state.malettesID.indexOf(maletteId));
                    state.malettesID.splice(state.malettesID.indexOf(maletteId), 1);
                }
            }
        },

        setReservdateDebutPret(state, date)
        {
            state.dateDebutPret = date;
        },

        setReservTimeDebutPret(state, time)
        {
            state.timeDebutPret = time;
        },

        cleanReserv(state)
        {
            state.dateDebutPret = null;
            state.materielsID = [];
            state.malettesID = [];
            state.dateDebutPret = null;
            state.timeDebutPret = null;
            state.dateFinPret = null;
            state.timeFinPret = null;
        }

    }
}



