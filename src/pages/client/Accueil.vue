<template>
    <div>
        <CategoriesHeader></CategoriesHeader>
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

    export default {
        name: 'Accueil',
        components: {
            'CategoriesHeader': CategoriesHeader
        },
        data() {
            return {
            }
        },
        methods: {
        },
        computed:
            {
            },

        mounted() {
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
