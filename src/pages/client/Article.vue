<template>
    <div>
        <CategoriesHeader :categories="categoriesArray"></CategoriesHeader>

        <div class="body container-fluid">
            <div class="row">
                <div class="col-6 px-5 leftColumn d-flex flex-column">
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
                        <form class="" id="datePicker">
                            <b-form-datepicker v-if="adaptCalendar" id="datepicker" v-model="selectedDate"
                                               :disabled="disableDatePicker"
                                               class="mb-4"></b-form-datepicker>
                            <b-calendar v-else v-model="selectedDate" locale="fr" :disabled="disableDatePicker" block
                                        class="w-100 "></b-calendar>
                        </form>
                    </div>
                    <div class="d-flex align-items-center justify-content-end w-100 flex-row mb-3">
                        <b-button v-on:click="sendToManuel" variant="primary" class="w-auto mr-3">Manuel PDF</b-button>
                        <b-button v-b-modal.modalTuto variant="primary" class="w-auto">Video Tutoriel</b-button>

                        <b-modal id="modalTuto" title="Tutoriels disponibles" ok-only>
                            <p>
                                This <a href="#" v-b-tooltip title="Tooltip in a modal!">Link</a> Voici la liste des tutoriels disponibles pour ce matériel.
                            </p>
                                <div v-for="{tuto, index} in this.tutos" v-on:click="sendTo(index)" :key="index" class="c-card shadow mb-3 text-dark">{{tuto}}</div>
                        </b-modal>

                    </div>
                    <div class="c-card shadow mb-3">
                        <h3>Où se situe ce matériel ?</h3>
                        <p>{{this.selectedMateriel.departement.nom}}</p>
                    </div>
                </div>
                <div class="col-6 d-flex flex-column rightColumn px-5">
                    <div class="c-card shadow mb-3">
                        <h3>{{this.selectedMateriel.nom}}</h3>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, beatae cumque dolor ea
                            esse est fugit hic iure mollitia nihil nisi optio pariatur quo quod ratione repudiandae
                            saepe. Alias aliquam architecto asperiores consectetur cumque deserunt ea ipsa itaque modi,
                            nihil obcaecati officia provident quasi quibusdam ratione similique sit tempore! Error
                            quaerat quidem ratione rem sequi. Aliquam animi autem culpa dicta, dignissimos dolorem

                        </p>
                    </div>
                    <div class="c-card shadow mb-3">
                        <h3>Caractéristiques techniques</h3>
                        <p>{{this.selectedMateriel.caracteristiques}}</p>
                    </div>
                    <div class="c-card shadow mb-3">
                        <h3>Usage</h3>
                        <p>{{this.selectedMateriel.usage}}</p>
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
                tutos: null,
            }
        },

        methods:
        {
            getMateriel() {
                ajaxService.getAllApi("materiels").then(result => {
                    this.materiel = result;
                    this.selectedMateriel = utilsServices.getById(this.materiel, this.$route.params.id );
                    this.tutos = JSON.parse(this.selectedMateriel.tutos);
                    console.log(result);
                    console.log(this.$route.params.filter);
                }).catch(error => console.log(error))
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
                console.log(this.tutos[TutoIndex].name);
                window.open(this.tutos[TutoIndex]);
            },
            sendToManuel()
            {
                console.log(this.selectedMateriel.notice);
                window.open(this.selectedMateriel.notice);
            }
        },

        computed:
            {
                adaptCalendar() {
                    if (this.isMobile()) {
                        return true
                    } else {
                        return false
                    }
                },
                disableDatePicker() {
                    return this.v_disableDatePicker
                },
            },

        mounted() {
            this.getMateriel();
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