<template>
    <div>
        <b-navbar type="secondary" style="margin-top: 70px; z-index: 1;" fixed="top" variant="secondary" :class="adaptToSidebar">
            <b-navbar-nav class="ml-auto mr-auto" style="min-width: 75%" justified>
                <b-nav-item :class="{ activeNav : isSelected(index), inactiveNav : !isSelected(index)}" v-for="(categorie, index) in listeType"
                            :key="categorie" href="#" link-classes="text-light">
                    <router-link :to="categoriesPath[index]" class="text-white">{{categorie}}</router-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <div class="spacer"></div>
    </div>
</template>

<script>
    import ajaxService from '@/services/ajaxService.js'

    export default {
        name: 'CategoriesHeader',
        data() {
            return {
                categoriesPath: [],

                //Categories
                listeType: [],
            }
        },
        props:
            {
                sidebarVisible: {
                    type: Boolean,
                    default: false
                },
                categories: {
                    type: Array,
                    default: () => ['Error : No category found']
                },
                activeCat: {
                    type: String,
                    default: "notSelected"
                },
            },
        computed:
            {
                adaptToSidebar() {
                    if (this.sidebarVisible) {
                        return 'adaptSidebar ml-auto'
                    } else {
                        return 'classic ml-auto'
                    }
                },
                verifiedCategories() {
                    if (!this.listeType) {
                        return ['Error : No category found']
                    } else {
                        this.updatePath();
                        return this.listeType
                    }
                },

            },
        beforeMount() {


        },
        methods:
            {
                categoriesNoSpace(i) {
                    return this.listeType[i].split(" ").join("");
                },
                isSelected(index) {
                    if( this.listeType ) {
                        if (this.listeType[index]) {
                            return this.listeType[index].split(" ").join("") === this.activeCat;
                        }
                    }
                    return false;
                },
                updatePath(){
                    //setup links
                    if(this.listeType) {
                        for (let i = 0; i < this.listeType.length; i++) {
                            let current = this.listeType[i];
                            this.categoriesPath[i] = "/search/" + current.split(" ").join("");
                        }
                    }
                },

                getTypes() {
                    ajaxService.getAllApi("types").then(result => {
                        for( let i = 0; i < result.length; i++ )
                        {
                            this.listeType.push(result[i].nom);
                        }
                        this.listeType = this.getTypesFiltered();

                        //Mettre à jour les liens des routes
                        this.updatePath();

                        console.log(result);
                    }).catch(error => console.log(error))
                },
                //Filtres
                getTypesFiltered: function () {
                    if (this.listeType) {
                        console.log("startfilter | lenght :" + this.listeType.length);
                        //Retirer les doublons
                        let array = [];
                        for (let i = 0; i < this.listeType.length; i++) {
                            array.push(this.listeType[i]);
                            console.log(this.listeType[i]);
                        }
                        let result = [...new Set(array)];
                        result.push("Malettes");
                        result.push("Tous");
                        return result;
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

<style scoped lang="scss">

    @import "../styles/custom-bootstrap.scss";

    .adaptSidebar {
        width: calc(100vw - var(--sidebar-width));
    }

    .classic {
        width: 100%;
    }

    .navbar {
        height: var(--navbar-height);
        border-bottom: solid 4px $secondary;
        border-top: solid 6px $secondary;
    }

    .navbar-nav {
        height: calc(var(--navbar-height) - 2px);
    }

    .spacer {
        margin-top: var(--navbar-height);
    }

    .activeNav {
        border-bottom: solid 4px $primary;
    }

    .inactiveNav {
        border-bottom: solid 4px var(--secondary);
    }

</style>
