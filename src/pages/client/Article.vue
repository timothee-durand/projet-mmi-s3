<template>
    <div>
        <CategoriesHeader :categories="categoriesArray"></CategoriesHeader>

        <div class="body container-fluid">
            <div class="row">
                <div class="col-md-6 col-12 px-5 leftColumn d-flex flex-column">
                    <!--<b-carousel
                            id="carousel-1"
                            :interval="4000"
                            controls
                            indicators
                            background="#ababab"
                            img-width="1024"
                            img-height="480"
                            style="width: 100%;"
                            class=""
                    >

                        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>


                        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"></b-carousel-slide>


                        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>


                        <b-carousel-slide>
                            <template #img>
                                <img
                                        class="d-block img-fluid w-100"
                                        width="1024"
                                        height="480"
                                        src="https://picsum.photos/1024/480/?image=55"
                                        alt="image slot"
                                >
                            </template>
                        </b-carousel-slide>
                    </b-carousel>-->
                    <img :src="this.selectedMateriel.photo" class="w-100 mr-4 img-fluid" alt="Responsive image">
                    <div class="mt-3 mb-3">
                        <h3>Réserver</h3>
                        <form v-if="!existInStore && !reservdateDebutIsSet" class="" id="datePicker">
                            <b-form-datepicker v-if="adaptCalendar" id="datepicker" v-model="selectedDate"
                                               :disabled="disableDatePicker"
                                               class="mb-4"></b-form-datepicker>
                            <b-calendar v-else v-model="selectedDate" today-variant="primary" selected-variant="primary" nav-button-variant="secondary" :date-disabled-fn="dateDisabled" locale="fr" :disabled="disableDatePicker" block
                                        class="w-100 "></b-calendar>
                        </form>
                        <div v-else-if="reservdateDebutIsSet && isDisponibleAtReservDate && !existInStore" class="w-100 p-5 d-flex flex-column justify-content-center align-items-center c-card shadow">
                            <p>Voulez-vous ajouter cet objet à votre réservation du {{this.$store.getters.getReservdateDebut.split("-").reverse().join('/')}} ?</p>
                            <b-button v-on:click="addToReservation()" size="md" variant="primary" class="rounded-pill">ajouter</b-button>
                        </div>
                        <div v-else-if="reservdateDebutIsSet && !isDisponibleAtReservDate" class="w-100 p-5 d-flex flex-column justify-content-center align-items-center c-card shadow">
                            <p class="text-danger">Cet objet n'est pas disponible pour le {{this.$store.getters.getReservdateDebut.split("-").reverse().join('/')}}.</p>
                        </div>
                        <div v-else class="w-100 p-5 d-flex justify-content-center align-items-center c-card shadow">Cet objet a été ajouté à votre réservation.</div>

                        <!-- Modale de confirmation de réservation -->
                        <b-modal ref="modalReserv" id="modalReserv" centered :title="titreReservModal">
                            <p>
                                Ce matériel sera ajouté à votre réservation.
                            </p>
                            <p>
                                <span class="font-weight-bold">La date d'emprunt sélectionnée sera la même pour tous les objets que vous ajouterez par la suite à votre réservation.</span>
                            </p>

                            <template #modal-footer="{ cancel }">
                                <!-- Emulate built in modal footer ok and cancel button actions -->

                                <b-button size="sm" variant="secondary" @click="cancel()">
                                    Annuler
                                </b-button>
                                <b-button size="sm" variant="primary" @click="addToReservation()">
                                    OK
                                </b-button>
                            </template>
                        </b-modal>

                    </div>
                    <div class="d-flex align-items-center justify-content-end w-100 flex-row mb-3">
                        <b-button v-if="this.selectedMateriel.notice != null" v-on:click="sendToManuel" variant="primary" class="w-auto mr-3">Manuel PDF</b-button>
                        <b-button v-if="tutoButtonCond" v-b-modal.modalTuto variant="primary" class="w-auto">Video Tutoriel</b-button>

                        <b-modal id="modalTuto" scrollable centered title="Tutoriels disponibles" ok-only>
                            <p>
                                Voici la liste des tutoriels disponibles pour ce matériel.
                            </p>
                                <div style="cursor: pointer;" v-for="(tuto, index) in getTutos" v-on:click="sendTo(index)" :key="index" class="c-card shadow mb-3 text-dark">{{tuto}}</div>
                        </b-modal>

                    </div>
                    <div class="c-card shadow mb-3">
                        <h3>Où se situe ce matériel ?</h3>
                        <p v-if="!isMalette">{{this.selectedMateriel.departement.nom}}</p>
                        <p v-else>B.U.</p>
                    </div>
                </div>
                <div class="col-md-6 col-12 d-flex flex-column rightColumn px-5">
                    <div class="c-card shadow mb-3">
                        <h3>{{this.selectedMateriel.nom}}</h3>
                    </div>
                    <div v-if="!isMalette" class="c-card shadow mb-3">
                        <h3>Caractéristiques techniques</h3>
                        <div v-html="this.selectedMateriel.usage"></div>
                    </div>
                    <div v-if="!isMalette" class="c-card shadow mb-3">
                        <h3>Usage</h3>
                        <div v-html="this.selectedMateriel.usage"></div>
                    </div>
                    <div v-if="isMalette" class="c-card shadow mb-3">
                        <h3>Contenu :</h3>
                        <div v-for="element in contenuMalette" :key="element.id">
                            <div class="w-100 d-flex justify-content-between"><p>{{element.nom}}</p>
                                <router-link :to="{ name: 'Article', params : { id:pathMaterial(element.id)}}">
                                    <b-button variant="primary" class="rounded-pill">Voir plus</b-button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import CategoriesHeader from '@/components/CategoriesHeader'
    import ajaxService from '@/services/ajaxService.js'
    import utilsServices from '@/services/utilsServices.js'


    export default {
        name: "Article",

        components: {
            'CategoriesHeader': CategoriesHeader
        },

        data() {
            return {
                categoriesArray: ['Kit', 'Prise de vue', 'Son', 'Eclairage', 'Accessoires'],
                materiel : [],
                selectedMateriel : null,
                selectedDate: null,
                v_disableDatePicker: false,
                tutos: [],
                currentId: 0,
                currentType: "",
                contenuMalette: null,

            }
        },

        methods:
        {
            getArticle() {
                if( this.currentType === "Mat" ) {
                    ajaxService.getAllApi("materiels").then(result => {
                        this.materiel = result;
                        this.selectedMateriel = utilsServices.getById(this.materiel, this.currentId);
                        this.tutos = JSON.parse(this.selectedMateriel.tutos);
                        console.log(result);
                    }).catch(error => console.log(error))
                }
                else if( this.currentType === "Mal")
                {
                    ajaxService.getAllApi("malettes").then(result => {
                        this.materiel = result;
                        console.log(result);
                        this.selectedMateriel = utilsServices.getById(this.materiel, this.currentId);
                        console.log(this.selectedMateriel);
                        if( this.isMalette )
                        {
                            this.fetchMaletteContent();
                        }
                    }).catch(error => console.log(error))
                }
            },
            isMobile() {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            },
            sendTo(TutoIndex)
            {
                console.log(this.tutos[TutoIndex]);
                window.open(this.tutos[TutoIndex]);
            },
            sendToManuel()
            {
                console.log(this.selectedMateriel.notice);
                window.open(this.selectedMateriel.notice);
            },

            //Calendrier

            dateDisabled(ymd, date) {

                let datesToAllow = [];

                if( !this.isMalette ) {
                    if (this.selectedMateriel.jour_dispo) {

                        let nbJours = this.selectedMateriel.jour_dispo.length;

                        for (let y = 0; y < nbJours; y++) {

                            let dateToTest = new Date(this.selectedMateriel.jour_dispo[y].date);
                            console.log(this.selectedMateriel.jour_dispo[y].disponible);
                            if (this.selectedMateriel.jour_dispo[y].disponible === true) {

                               datesToAllow.push(dateToTest);
                            }
                        }
                    }
                }


                for( let i = 0; i < datesToAllow.length; i++) {
                    let date1 = new Date(datesToAllow[i].getFullYear(),datesToAllow[i].getMonth() , datesToAllow[i].getDate());
                    let date2 = new Date(date.getFullYear(), date.getMonth() , date.getDate());

                    if(date1.getTime() === date2.getTime()){
                        return false;
                    }
                }

                return true;
            },

            //Reservation

            addToReservation()
            {
                if( !this.isMalette )
                {
                    console.log("Materiel ajouté à la reservation");
                    this.$store.commit("addMaterielId", this.selectedMateriel.id);
                    if(!this.reservdateDebutIsSet)
                    {
                        this.$store.commit("setReservdateDebutPret", this.selectedDate);
                    }
                }
                else
                {
                    console.log("Malette ajouté à la reservation");
                    this.$store.commit("addMaletteId", this.selectedMateriel.id);
                    if(!this.reservdateDebutIsSet)
                    {
                        this.$store.commit("setReservdateDebutPret", this.selectedDate);
                    }
                }

                this.$refs['modalReserv'].hide();
            },

            //PATH
            pathMaterial( id )
            {
                return id+"_Mat"
            },

            //Permet de decrypter l'id dans l'url
            breakOptions()
            {
                if( this.$route.params.id ) {
                    let response = this.$route.params.id.split("_");
                    this.currentId = parseInt(response[0], 10);
                    this.currentType = response[1];
                }
            },

            //Malette

            fetchMaletteContent()
            {
                ajaxService.getAllApi("malettes").then(result => {
                    this.materiel = result;
                    console.log("result");
                    console.log(result);
                    this.contenuMalette = [];
                    for( let i = 0; i < this.selectedMateriel.materiels.length; i++ )
                    {
                        this.contenuMalette.push(this.selectedMateriel.materiels[i]);
                    }

                }).catch(error => console.log(error))
            },

        },

        computed:
            {
                adaptCalendar() {
                    return !!this.isMobile();
                },
                disableDatePicker() {
                    return this.v_disableDatePicker
                },
                titreReservModal()
                {
                    if( this.selectedDate ) {
                        return "Louer cet objet pour le " + this.selectedDate.split("-").reverse().join('/') + ' ?';
                    }
                    return "Louer cet objet ?";
                },
                isMalette()
                {
                    console.log(this.currentType);
                    if(this.currentType === "Mal")
                        console.log("Malette = true");
                    if(this.currentType !== "Mal")
                        console.log("Malette = false");

                    return this.currentType === "Mal"
                },
                getTutos()
                {
                    if(this.selectedMateriel && !this.isMalette )
                    {
                        return this.tutos;
                    }
                    return null;
                },
                existInStore()
                {
                    if(!this.isMalette)
                    {
                        if( this.$store.getters.getCurrentMaterielsFromId(this.currentId) )
                        {
                            console.log("existInStore true");
                            return true;
                        }
                    }
                    else
                    {
                        if( this.$store.getters.getCurrentMalettesFromId(this.currentId) )
                        {
                            console.log("existInStore true");
                            return true;
                        }
                    }

                    console.log("existInStore false");
                    return false;
                },
                tutoButtonCond()
                {
                    if(this.getTutos !== null){
                        if( this.getTutos[0] !== "" )
                        {
                            return false;
                        }
                        if( this.getTutos !== [] )
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
                    return true;
                },

                reservdateDebutIsSet()
                {
                    return this.$store.getters.reservdateDebutIsSet;
                },

                isDisponibleAtReservDate()
                {
                    if(this.reservdateDebutIsSet)
                    {
                        if (this.selectedMateriel.jour_dispo) {

                            let dateReserv = new Date(this.$store.getters.getReservdateDebut);
                            let nbJours = this.selectedMateriel.jour_dispo.length;

                            for (let y = 0; y < nbJours; y++) {

                                let dateToTest = new Date(this.selectedMateriel.jour_dispo[y].date);
                                console.log(dateToTest);
                                console.log(dateReserv);
                                if (dateToTest.getTime() === dateReserv.getTime()) {
                                    if(this.selectedMateriel.jour_dispo[y].disponible)
                                    {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                    return true;
                }

            },

        watch:
            {
                selectedDate: function()
                {
                    if(this.selectedDate !== "1800-1-1") {
                        this.$refs['modalReserv'].show();
                    }
                },

                '$route.params.id' : function () {
                    this.breakOptions();
                    this.getArticle();
                }
            },

        mounted() {
            this.breakOptions();
            this.getArticle();
        }
    }
</script>

<style scoped>
    .body {
        padding: 0 8%;
        margin-top: 80px;
    }

    .c-card {
        padding: 30px;
    }

    h3 {
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>