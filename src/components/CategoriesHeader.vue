<template>
    <div>
        <b-navbar type="secondary" style="margin-top: 70px" fixed="top" variant="secondary" :class="adaptToSidebar">
            <b-navbar-nav class="ml-auto mr-auto" style="min-width: 75%" justified>
                <b-nav-item :class="{ activeNav : isSelected(index), inactiveNav : !isSelected(index)}" v-for="(categorie, index) in verifiedCategories"
                            :key="categorie" href="#" link-classes="text-light">
                    <router-link :to="categoriesPath[index]" class="text-white">{{categorie}}</router-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <div class="spacer"></div>
    </div>
</template>

<script>
    export default {
        name: 'CategoriesHeader',
        data() {
            return {
                nbCategorie: 0,
                categoriesPath: [],
                isCatActive: [],
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
                    if (!this.categories) {
                        return ['Error : No category found']
                    } else {
                        this.updatePath();
                        return this.categories
                    }
                },

            },
        beforeMount() {




        },
        methods:
            {
                categoriesNoSpace(i) {
                    return this.categories[i].split(" ").join("");
                },
                isSelected(index) {
                    if (this.categories[index]) {
                        return this.categories[index].split(" ").join("") === this.activeCat;
                    }
                    return false;
                },
                updatePath(){
                    //setup links
                    for (let i = 0; i < this.categories.length; i++) {
                        let current = this.categories[i];
                        this.categoriesPath[i] = "/search/" + current.split(" ").join("");
                    }
                }
            },
        mounted() {

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
