<template>
    <div>
        <sidebar-admin></sidebar-admin>
        <div class="containerRightAdmin p-4">
            <search-bar :modes="roles" :types-materiel="lieux" lib-mode="Rôle" lib-type="Lieux"></search-bar>
            <row-result nom="Martin Baumner" disable-dispo disable-ref img="../assets/img/person.png" :buttons="buttons"
                        id="0" class="mt-2"></row-result>
        </div>
    </div>
</template>

<script>

    import SearchBar from '@/components/SearchBar.vue'
    import RowResult from '@/components/RowResult.vue'
    import SidebarAdmin from '@/components/SidebarAdmin.vue'

    export default {
        name: "Roles_Admin",
        components: {
            SearchBar,
            RowResult,
            SidebarAdmin
        },
        data() {
            return {
                roles: [{text: 'Administrateur', value: 'ADM'}, {text: 'Gestionnaire', value: 'GEST'}],
                lieux: [{text: 'MMI', value: 'mmi'}, {text: 'BU', value: 'bu'},],
                buttons: [
                    {
                        icon: "pencil-fill",
                        variant: "success",
                        eventName: "editRole"
                    },
                    {
                        icon: "x",
                        variant: "success",
                        eventName: "deleteRole"
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>
