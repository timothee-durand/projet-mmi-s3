<template>
    <div>
        <sidebar-admin></sidebar-admin>
        <div class="blacklist containerRightAdmin p-4">
            <search-bar :modes="[]" :types-materiel="[]"></search-bar>
            <row-result nom="Martin Baumner" disable-dispo disable-ref img="../assets/img/person.png" :buttons="button"
                        id="0" class="mt-2"></row-result>
        </div>
    </div>
</template>

<script>
    import SearchBar from '@/components/SearchBar.vue'
    import RowResult from '@/components/RowResult.vue'
    import SidebarAdmin from '@/components/SidebarAdmin.vue'

    export default {
        name: "Blacklist_Admin",
        components: {RowResult, SearchBar, SidebarAdmin},
        data() {
            return {
                button: [
                    {
                        icon: "x",
                        variant: "success",
                        eventName: "deleteBlacklist"
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>
