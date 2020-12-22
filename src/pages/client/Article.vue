<template>
    <div>
        <CategoriesHeader :categories="categoriesArray"></CategoriesHeader>

        <div class="body container-fluid">
            <div class="row">
                <div class="col-6 px-5 leftColumn d-flex flex-column">
                    <b-carousel
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
                        <!-- Text slides with image -->
                        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>

                        <!-- Slides with custom text -->
                        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"></b-carousel-slide>

                        <!-- Slides with image only -->
                        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

                        <!-- Slides with img slot -->
                        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
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
                    </b-carousel>
                    <div class="mt-3 mb-3">
                        <h3>Réserver</h3>
                        <form class="" id="datePicker">
                            <b-form-datepicker v-if="adaptCalendar" id="datepicker" v-model="dateFilter"
                                               :disabled="disableDatePicker"
                                               class="mb-4"></b-form-datepicker>
                            <b-calendar v-else v-model="dateFilter" locale="fr" :disabled="disableDatePicker" block
                                        class="w-100 "></b-calendar>
                        </form>
                    </div>
                    <div class="d-flex align-items-center justify-content-end w-100 flex-row mb-3">
                        <b-button variant="primary" class="w-auto mr-3">Manuel PDF</b-button>
                        <b-button variant="primary" class="w-auto">Video Tutoriel</b-button>
                    </div>
                    <div class="c-card shadow mb-3">
                        <h3>Où se situe ce matériel ?</h3>
                    </div>
                </div>
                <div class="col-6 d-flex flex-column rightColumn px-5">
                    <div class="c-card shadow mb-3">
                        <h3>Name</h3>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, beatae cumque dolor ea
                            esse est fugit hic iure mollitia nihil nisi optio pariatur quo quod ratione repudiandae
                            saepe. Alias aliquam architecto asperiores consectetur cumque deserunt ea ipsa itaque modi,
                            nihil obcaecati officia provident quasi quibusdam ratione similique sit tempore! Error
                            quaerat quidem ratione rem sequi. Aliquam animi autem culpa dicta, dignissimos dolorem
                            doloremque error est expedita, illo incidunt ipsam iste iure iusto magni molestias nesciunt
                            nihil nobis odio officiis perferendis perspiciatis possimus provident quae quaerat quod
                            recusandae rem repellat saepe tempora, tenetur vel veniam voluptates. Ad adipisci architecto
                            at atque consequuntur distinctio hic labore laborum libero maxime minima minus mollitia
                            nostrum placeat possimus provident quae quo reiciendis saepe sequi, unde velit veniam
                            veritatis vero voluptate. Consectetur id minima officiis possimus rem suscipit voluptates! A
                            deleniti doloremque ducimus facere facilis repellendus voluptatem. Dolorum eius eveniet,
                            explicabo fugiat neque nobis perspiciatis sint soluta sunt temporibus. Ab, amet architecto
                            at dignissimos distinctio dolorum eius ex excepturi, molestiae molestias neque nobis quia
                            tempora. Cum eaque nesciunt porro quidem? Consectetur culpa fugiat impedit magnam minima,
                            molestiae molestias quae quam quisquam quo, quod sed tempore voluptas voluptate voluptatem.
                            Atque facere labore porro sed temporibus ut, vitae?
                        </p>
                    </div>
                    <div class="c-card shadow mb-3">
                        <h3>Caractéristiques techniques</h3>
                    </div>
                    <div class="c-card shadow mb-3">
                        <h3>Usage</h3>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import CategoriesHeader from '@/components/CategoriesHeader'

    export default {
        name: "Article",

        components: {
            'CategoriesHeader': CategoriesHeader
        },

        data() {
            return {
                categoriesArray: ['Kit', 'Prise de vue', 'Son', 'Eclairage', 'Accessoires']
            }
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
        font-weight: normal;
    }
</style>