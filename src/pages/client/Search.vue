<template>
    <div>
        <CategoriesHeader sidebarVisible :categories="getTypesFiltered" :activeCat="this.$route.params.filter"></CategoriesHeader>
        <SidebarClient>
            <!--            Recherche -->
            <form class="form-inline w-100" ref="widthSidebar">
                <div class="input-group w-100">
                    <input class="form-control input-group-append" id="search" placeholder="Recherche" type="search">
                    <button class="btn-dark text-light input-group-prepend btn" type="submit">
                        <svg class="bi bi-search" fill="currentColor" height="1em" viewBox="0 0 16 16" width="1em"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                                  fill-rule="evenodd"/>
                            <path d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                                  fill-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </form>

            <!--    Filtres-->
            <div class="border-bottom border-light d-inline-flex w-100 align-items-center mt-4 justify-content-center mb-4">
                <svg class="bi bi-funnel text-light" fill="currentColor" height="1.5rem" viewBox="0 0 16 16"
                     width="1.5rem"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"
                            fill-rule="evenodd"/>
                </svg>
                <h4 class="ml-1 text-light">Filtres</h4>
            </div>

            <!--    Form-->
            <form class="d-flex flex-column w-100 align-items-center justify-content-center" id="filtres">

                <div class="d-inline-flex w-100 justify-content-between align-items-center my-1">
                    <label class="text-light" for="byDate">Par date</label>
                    <input class="form-check-inline m-0" id="byDate" type="checkbox" v-model="v_disableDatePicker">
                </div>

                <b-form-datepicker v-if="adaptCalendar" id="datepicker" v-model="dateFilter"
                                   :disabled="disableDatePicker"
                                   class="mb-4"></b-form-datepicker>
                <b-calendar v-else v-model="dateFilter" locale="fr" :disabled="disableDatePicker" block
                            class="w-100 mb-4"></b-calendar>

                <div class="d-inline-flex w-100 justify-content-between align-items-center my-1">
                    <label class="text-light" for="byPrem">Matériel pro</label>
                    <input class="form-check-inline m-0" id="byPrem" type="checkbox">
                </div>

            </form>
        </SidebarClient>
        <div class="containerRight ">
            <div class="container-fluid ">
                <b-row gutter-2>
                    <div v-for="materiel in listeMateriel" :key="materiel.id" class="p-4 col-md-6 col-12 mt-3">
                        <div class="c-card shadow p-4"
                             style="height: 270px; border-radius: 20px; background-color: #ffffff; overflow: hidden;">
                            <img src="https://placekitten.com/20/20" alt="premimum" class="d-block ml-auto mb-1">
                            <div class="d-flex flex-row align-items-center mb-2">
                                <!-- <b-carousel
                                        id="carousel-1"
                                        :interval="-1"
                                        controls
                                        indicators
                                        background="#ababab"
                                        img-width="1024"
                                        img-height="480"
                                        style="height: 100%;"
                                        class="w-50 mr-4"
                                >

                                    <b-carousel-slide
                                            :img-src="materiel.photo"></b-carousel-slide>

                                </b-carousel> -->
                                <img :src="materiel.photo" class="w-25 mr-4 img-fluid" alt="Responsive image">
                                <div class="w-50"
                                     style="overflow: hidden; display: block; text-overflow: ellipsis; height: 170px">
                                    <h3 class="border-bottom border-dark t">{{materiel.nom}}</h3>
                                    <p>{{materiel.usage}}</p>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-between align-items-center">
                                <p class="d-block mb-0">Disponibilité</p>
                                <router-link :to="{ name: 'Article', params : { id:'Hello'}}">
                                    <b-button variant="primary">Button</b-button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script>
    import CategoriesHeader from '@/components/CategoriesHeader'
    import SidebarClient from '@/components/SidebarClient'
    import ajaxService from '@/services/ajaxService.js'

    export default {
        name: 'Search',

        components: {
            'CategoriesHeader': CategoriesHeader,
            'SidebarClient': SidebarClient
        },
        data() {
            return {
                showDismissibleAlert: false,
                categoriesArray: ['Kit', 'Prise de vue', 'Son', 'Eclairage', 'Accessoires'],
                listeType: [],
                listeMateriel: [],

                /* sidebar content */
                dateFilter: null,
                v_disableDatePicker: true,
                sidebarInnerWidth: 0,

                /*Filter*/
                currentFilter: "none"
            }
        },
        methods: {
            isMobile() {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            },

            //Getters
            getTypes() {
                ajaxService.getApi("types").then(result => {
                    this.listeType = result;
                    console.log(result);
                    for( let i = 0; i < this.listeType.length; i++ )
                    {
                        this.categoriesArray[i] = this.listeType()[i].nom;
                        console.log(this.categoriesArray[i]);
                    }
                }).catch(error => console.log(error))
            },
            getListeMateriel() {
                ajaxService.getApi("materiels").then(result => {
                    this.listeMateriel = result;
                    console.log(result);
                }).catch(error => console.log(error))
            },


        },
        computed:
        {
            disableDatePicker() {
                return !this.v_disableDatePicker
            },
            adaptCalendar() {
                if (this.isMobile()) {
                    return true
                } else {
                    if (this.sidebarInnerWidth < 250) {
                        console.log(this.sidebarInnerWidth)
                        return true
                    } else {
                        console.log(this.sidebarInnerWidth)
                        console.log('Big One')
                        return false
                    }
                }
            },
            //Filtres
            getTypesFiltered: function()
            {
                if( this.listeType ) {
                    console.log("startfilter | lenght :" + this.listeType.length);
                    let array = [];
                    for (let i = 0; i < this.listeType.length; i++) {
                        array.push(this.listeType[i].nom);
                        console.log(this.listeType[i].nom);
                    }
                    return [...new Set(array)];
                }
                else {
                    return [];
                }
            }
        },
        beforeMount(){

        },
        mounted() {
            this.getTypes();
            this.getListeMateriel();

            this.sidebarInnerWidth = this.$refs.widthSidebar.clientWidth;
            this.currentFilter = this.$route.params.filter;

            /*console.log(this.getTypesFiltered());

            for( let i = 0; i < this.getTypesFiltered.length; i++ )
            {
                this.categoriesArray[i] = this.getTypesFiltered()[i].nom;

                console.log(this.categoriesArray[i]);
            }*/
        }
    }
</script>

<style scoped>

    .containerRight {
        width: calc(100% - var(--sidebar-width));
        margin-left: var(--sidebar-width);
        min-height: calc(100vh - var(--header-height) - var(--navbar-height));
    }

    h3 {
        font-size: 1.2rem;
        font-weight: normal;
    }
</style>
