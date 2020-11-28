<template>
  <div>
    <CategoriesHeader sidebarVisible :categories="categoriesArray" ></CategoriesHeader>
    <SidebarClient></SidebarClient>
    <b-alert show>Default Alert</b-alert>

    <b-alert variant="success" show>Success Alert</b-alert>

    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      Dismissible Alert!
    </b-alert>

    <b-button @click="showDismissibleAlert=true" class="m-1" variant="info">
      Show dismissible alert ({{ showDismissibleAlert ? 'visible' : 'hidden' }})
    </b-button>

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae commodi corporis cum distinctio
    dolor doloribus dolorum eius esse et fuga id itaque iure iusto minima modi molestiae mollitia necessitatibus neque
    officiis omnis pariatur porro quam quas qui quia quis, quos recusandae reprehenderit sapiente sed sint sunt totam
    voluptas voluptatem voluptates. Animi delectus dolorum earum eum exercitationem in libero minima, minus nam nemo
    neque non nulla obcaecati officia optio pariatur possimus quas quisquam recusandae rem, repudiandae sint ut vero? Ab
    accusantium amet consectetur corporis culpa, deleniti deserunt dicta dolor doloremque ea excepturi fugiat, fugit
    minima molestias nulla obcaecati officia perspiciatis porro quae quidem quo reiciendis suscipit tempora temporibus
    unde veniam voluptatem! Corporis, delectus eaque excepturi iste itaque laboriosam maxime molestiae nisi nulla odio
    quas quasi quibusdam quos rem repellendus similique voluptas. Animi aspernatur esse eveniet excepturi facere magni
    nihil nostrum odio officia quaerat quam, quo recusandae soluta tempora unde ut veniam vitae. Aliquid consectetur
    cupiditate dignissimos incidunt, laboriosam magnam modi nam non, saepe sapiente sint suscipit. Asperiores aspernatur
    dignissimos esse fugiat ipsum itaque laboriosam laborum minus, nesciunt nihil nobis quo, tempore, ullam? Architecto
    assumenda blanditiis corporis dicta doloribus eaque eveniet harum, laboriosam maxime natus nulla, praesentium sunt.
    Accusamus accusantium ad aliquam amet animi at, blanditiis cum ea eaque et expedita, fuga fugiat fugit ipsa, labore
    laborum minima odit pariatur porro provident quaerat reprehenderit vel? Ad atque consectetur corporis cum dolor
    dolores earum esse et incidunt itaque laborum libero maiores, minima molestiae neque optio quae quaerat quam
    quibusdam ratione reprehenderit rerum, similique! Accusantium, esse est ex id ipsum neque praesentium ratione
    recusandae? Ab animi autem, cum eius explicabo fuga harum id illum ipsa iste laudantium maiores natus nemo,
    perferendis quis quod quos sunt voluptas? Beatae nisi, perspiciatis? Aliquid asperiores, atque aut delectus deserunt
    eaque eius eos ex explicabo facilis hic iste iusto laboriosam magni maxime perferendis, praesentium quae quos rem
    sequi sint, vitae voluptates? A animi aperiam autem deleniti doloribus ea eius eligendi enim esse eum ex explicabo
    impedit in laborum maiores molestiae neque odio quia quibusdam quidem quis quo, reiciendis repellendus repudiandae,
    rerum similique, ullam unde vel velit veniam. Assumenda atque autem commodi corporis, cupiditate delectus distinctio
    dolor esse eveniet expedita facilis fugiat harum iste itaque maxime modi necessitatibus porro provident quae rem
    saepe ut voluptates! A asperiores consequatur dolorum, eius eum odit pariatur quos repellat velit vitae? Accusantium
    consequuntur cupiditate deserunt error, facere id illum iure labore laborum magnam officiis optio quos sapiente sit
    ut voluptas voluptatum! Ab, cum iste. Accusamus asperiores doloribus ipsa libero temporibus! Alias consectetur cum
    delectus, eligendi porro quo temporibus. Aliquam commodi dicta doloribus eveniet ex exercitationem, fuga fugit ipsum
    laboriosam laudantium molestiae nesciunt provident quam quas ratione repellat sit suscipit tempora tenetur
    voluptate! A adipisci, at consequatur cumque ducimus molestiae natus quia quidem sed, sunt temporibus veritatis
    vero, voluptate! Aliquid aut commodi consequuntur culpa cupiditate delectus deserunt dolore dolores eos fugit, hic,
    illo, impedit ipsam iste magni minima nobis odio omnis pariatur perspiciatis porro quasi quia quis repellat
    reprehenderit tempore vel? Accusamus accusantium aliquid amet, animi consequatur corporis dolores ea ex excepturi
    exercitationem illo impedit laudantium magni odit officiis placeat porro possimus praesentium quaerat quisquam quos
    ratione repellat reprehenderit sequi veritatis voluptate voluptatum. Accusantium, animi assumenda cumque dolor
    dolorem, dolores facere fugiat harum ipsam ipsum laboriosam laborum nam nihil obcaecati optio pariatur, perferendis
    placeat quae ratione rerum sapiente similique veniam vero. Beatae blanditiis deleniti dolor facere illum minima
    officia quasi quia repellendus veritatis. Accusantium aliquid beatae blanditiis consequatur distinctio dolor
    doloremque doloribus, enim eos in incidunt iste magnam necessitatibus nesciunt, numquam officia officiis omnis porro
    possimus ratione reprehenderit tempora temporibus totam velit veritatis. Alias culpa doloribus ipsam laborum magnam,
    mollitia neque odit, officia officiis qui repellendus, soluta sunt! Debitis dolores obcaecati repellendus tempore
    veritatis? Accusantium corporis enim eos exercitationem iusto, pariatur quidem. Consectetur est, odit! Accusantium
    amet animi eaque earum, et hic maiores natus optio repellendus soluta? Aliquid blanditiis ea eaque enim, excepturi
    magnam obcaecati omnis quasi quis voluptatibus! Ad aliquam assumenda aut blanditiis cum dolore, dolorem eaque error
    eum illum incidunt ipsum iste labore laudantium molestias mollitia nobis perferendis quas rem sint tenetur ut,
    voluptas? Assumenda dolor fugit iste, modi molestiae nisi nostrum odio possimus provident saepe sit, ut velit
    voluptas. Ab aperiam architecto doloribus eligendi fuga, fugit ipsum, iste mollitia, pariatur placeat quod saepe
    tempora vel vero vitae. Amet beatae blanditiis debitis deserunt distinctio eum, ipsum, libero magnam maxime modi
    molestiae nisi nobis, nulla optio quaerat quibusdam saepe soluta tempora voluptatem voluptatum? Eaque esse ex illo
    maiores sapiente? Asperiores eum minus mollitia officia possimus quibusdam quod? Accusamus aliquam aut consectetur
    distinctio dolorum, eum expedita hic iusto, laboriosam molestiae nesciunt nostrum praesentium quae quos
    reprehenderit sapiente ullam, velit? Commodi culpa dignissimos ea, esse eveniet incidunt nemo obcaecati quae
    temporibus voluptates. Ad adipisci consequuntur non? Consequuntur culpa cumque hic illo illum omnis similique soluta
    tenetur unde velit! Ad aperiam consequuntur cumque illum perspiciatis qui voluptatem voluptates voluptatibus. Atque
    beatae commodi dolorem doloremque doloribus enim eos eum excepturi exercitationem inventore iure iusto laboriosam
    molestias nam neque nesciunt nisi nobis, non officia officiis, perferendis quia quo quod ratione tempore velit
    veniam vero! Ab nemo neque officia porro sunt! Accusamus consequatur itaque laborum, nam perspiciatis sint vel
    voluptatibus? A adipisci aut blanditiis corporis debitis delectus, minima molestiae neque odit quis sit tempore vel
    vero vitae, voluptates? Dicta dolor ducimus esse facere in neque odio veritatis voluptas! Adipisci aut beatae cum
    debitis dicta dolore, dolorum ducimus eveniet expedita fugiat iste magnam nemo neque nulla numquam omnis, possimus
    quisquam rerum saepe sint? Architecto asperiores aut beatae consequuntur dolores fugiat fugit, impedit iure,
    mollitia nam neque nesciunt nihil non perspiciatis porro, quasi quo quod veritatis. Ad alias aliquam amet architecto
    aut blanditiis commodi consequuntur culpa cum cumque, debitis dolore dolorum ea earum error et eum ex facere facilis
    id iste itaque maiores minima mollitia necessitatibus non nulla perferendis placeat quam quasi, qui repellat
    repellendus repudiandae soluta tempore tenetur totam! Accusamus consequatur illo magni nam ratione! Accusamus
    accusantium adipisci dignissimos doloremque eius error esse ex in praesentium provident, recusandae voluptatum?
  </div>
</template>

<script>
import CategoriesHeader from '@/components/client/CategoriesHeader'
import SidebarClient from '@/components/client/SidebarClient'

export default {
  name: 'Accueil',
  components: {
    'CategoriesHeader': CategoriesHeader,
    'SidebarClient': SidebarClient
  },
  data () {
    return {
      showDismissibleAlert: false,
      categoriesArray: ['Kit', 'Prise de vue', 'Son', 'Eclairage', 'Accessoires']
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
