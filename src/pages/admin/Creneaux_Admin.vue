<template>
    <div>
        <sidebar-admin></sidebar-admin>
        <div class="containerRightAdmin p-4">
            <b-container>
                <b-row>
                    <b-col cols="6">
                        <b-card>
                            <svg xmlns="http://www.w3.org/2000/svg" width="122" height="122" viewBox="0 0 122 122"
                                 class="mx-auto d-block">
                                <path id="Icon_material-schedule" data-name="Icon material-schedule"
                                      d="M63.939,3A61,61,0,1,0,125,64,60.97,60.97,0,0,0,63.939,3ZM64,112.8A48.8,48.8,0,1,1,112.8,64,48.787,48.787,0,0,1,64,112.8Zm3.05-79.3H57.9V70.1L89.925,89.315l4.575-7.5L67.05,65.525Z"
                                      transform="translate(-3 -3)" fill="#81cb51"/>
                            </svg>
                            <h2 class="text-center">Rendez-vous</h2>
                            <p>Prochains rendez-vous :</p>

                            <row-result id="0" reference="Grégoire DURAND" nom="Jeu 12 Sept" :buttons="buttonsRdv"
                                        disable-dispo></row-result>

                            <router-link to="" class="btn rounded-pill bg-success text-light p-2 mx-auto d-block mt-4"
                                         style="max-width: 15rem;">Voir tous mes rendez-vous
                            </router-link>
                        </b-card>
                    </b-col>

                    <b-col cols="6">
                        <b-card>
                            <svg xmlns="http://www.w3.org/2000/svg" width="121.013" height="138.301"
                                 viewBox="0 0 121.013 138.301" class="d-block mx-auto">
                                <path id="Icon_awesome-calendar-alt" data-name="Icon awesome-calendar-alt"
                                      d="M0,125.335A12.969,12.969,0,0,0,12.966,138.3h95.082a12.969,12.969,0,0,0,12.966-12.966V51.863H0ZM86.438,72.392a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241V83.2a3.251,3.251,0,0,1-3.241,3.241h-10.8A3.251,3.251,0,0,1,86.438,83.2Zm0,34.575a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241v10.8a3.251,3.251,0,0,1-3.241,3.241h-10.8a3.251,3.251,0,0,1-3.241-3.241ZM51.863,72.392A3.251,3.251,0,0,1,55.1,69.15h10.8a3.251,3.251,0,0,1,3.241,3.241V83.2a3.251,3.251,0,0,1-3.241,3.241H55.1A3.251,3.251,0,0,1,51.863,83.2Zm0,34.575a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241v10.8a3.251,3.251,0,0,1-3.241,3.241H55.1a3.251,3.251,0,0,1-3.241-3.241ZM17.288,72.392a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241V83.2a3.251,3.251,0,0,1-3.241,3.241h-10.8A3.251,3.251,0,0,1,17.288,83.2Zm0,34.575a3.251,3.251,0,0,1,3.241-3.241h10.8a3.251,3.251,0,0,1,3.241,3.241v10.8a3.251,3.251,0,0,1-3.241,3.241h-10.8a3.251,3.251,0,0,1-3.241-3.241Zm90.76-89.679H95.082V4.322A4.335,4.335,0,0,0,90.76,0H82.116a4.335,4.335,0,0,0-4.322,4.322V17.288H43.219V4.322A4.335,4.335,0,0,0,38.9,0H30.253a4.335,4.335,0,0,0-4.322,4.322V17.288H12.966A12.969,12.969,0,0,0,0,30.253V43.219H121.013V30.253A12.969,12.969,0,0,0,108.047,17.288Z"
                                      fill="#81cb51"/>
                            </svg>
                            <h2 class="text-center">Créneaux</h2>
                            <p>Prochaines indisponibilités :</p>

                            <row-result id="0" reference="Mardi 21 sept. - 14h00" nom="Lundi 20 sept. - 14h00"
                                        :buttons="buttonsCrnx" disable-dispo></row-result>

                            <router-link to="" class="btn rounded-pill bg-success text-light p-2 mx-auto d-block mt-4"
                                         style="max-width: 15rem;">Configurer mes créneaux
                            </router-link>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>


    import RowResult from '@/components/RowResult.vue'
    import SidebarAdmin from '@/components/SidebarAdmin.vue'

    export default {
        name: "Creneaux_Admin",
        components: {RowResult, SidebarAdmin},
        data() {
            return {
                buttonsCrnx: [
                    {
                        icon: "check2",
                        variant: "success",
                        eventName: "validateRDV"
                    },
                ]
            }
        },
        computed: {
            buttonsRdv() {
                return [
                    {
                        icon: "pencil-fill",
                        variant: "success",
                        eventName: "editIndispo"
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>
