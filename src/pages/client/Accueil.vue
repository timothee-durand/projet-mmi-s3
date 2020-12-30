<template>
    <div>
        <CategoriesHeader :categories="getTypesFiltered" ></CategoriesHeader>
        <div class="" style="background-color: #dcdcdc;">
            <div class="container-fluid">
                <b-row>
                    <p>ACCUEIL</p>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script>
    import CategoriesHeader from '@/components/CategoriesHeader'
    import ajaxService from '@/services/ajaxService.js'

    export default {
        name: 'Accueil',
        components: {
            'CategoriesHeader': CategoriesHeader
        },
        data() {
            return {
                showDismissibleAlert: false,
                categoriesArray: ['Kit', 'Prise de vue', 'Son', 'Eclairage', 'Accessoires'],
                listeType: [],
            }
        },
        methods: {
            //Getters
            getTypes() {
                ajaxService.getApi("types").then(result => {
                    this.listeType = result;
                    console.log(result);
                    for (let i = 0; i < this.listeType.length; i++) {
                        this.categoriesArray[i] = this.listeType()[i].nom;
                        console.log(this.categoriesArray[i]);
                    }
                }).catch(error => console.log(error))
            },
        },
        computed:
            {
                //Filtres
                getTypesFiltered: function () {
                    if (this.listeType) {
                        console.log("startfilter | lenght :" + this.listeType.length);
                        let array = [];
                        for (let i = 0; i < this.listeType.length; i++) {
                            array.push(this.listeType[i].nom);
                            console.log(this.listeType[i].nom);
                        }
                        return [...new Set(array)];
                    } else {
                        return [];
                    }
                }
            },

        mounted() {
            this.getTypes();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .containerRight {
        width: calc(100% - var(--sidebar-width));
        margin-left: var(--sidebar-width);
    }

    h3 {
        font-size: 1.2rem;
        font-weight: normal;
    }
</style>
