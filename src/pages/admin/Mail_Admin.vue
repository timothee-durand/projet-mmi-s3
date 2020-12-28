<template>
  <div>
    <sidebar-admin></sidebar-admin>
    <div class="containerRightAdmin p-4">
      <b-card class="mx-auto w-75">
        <slot name="header">
          <div class="d-inline-flex w-25 justify-content-between ">
            <svg xmlns="http://www.w3.org/2000/svg" width="48.952" height="39.162"
                 viewBox="0 0 48.952 39.162">
              <path id="Icon_material-email" data-name="Icon material-email"
                    d="M47.057,6H7.9a4.889,4.889,0,0,0-4.871,4.9L3,40.267a4.91,4.91,0,0,0,4.9,4.9H47.057a4.91,4.91,0,0,0,4.9-4.9V10.9A4.91,4.91,0,0,0,47.057,6Zm0,9.79L27.476,28.029,7.9,15.79V10.9L27.476,23.133,47.057,10.9Z"
                    transform="translate(-3 -6)" fill="#81cb51"/>
            </svg>
            <h2>Mails</h2>
          </div>
        </slot>

        <b-form @submit.prevent="sendMail">
          <b-form-select v-model="mail.to_address" class="mt-3">
            <b-form-select-option value="" disabled>Choisir un destinataire</b-form-select-option>
            <b-form-select-option v-for="res in listeRes" :value="res.email" :key="res.id">{{ res.nom }} {{ res.prenom }}</b-form-select-option>
          </b-form-select>
          <b-form-input v-model="mail.subject" placeholder="Sujet du mail" class="mt-3"></b-form-input>
          <b-textarea placeholder="Entrez votre message" v-model="mail.content_mail" class="mt-3"
                      rows="10"></b-textarea>
          <b-button type="submit" variant="success" pill class="pr-3 pl-3 pt-2 pb-2 mt-3 mx-auto d-block">
            Envoyer
          </b-button>
          <b-alert :show="alertMessage !== ''">{{ alertMessage }}</b-alert>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import ajaxService from '@/services/ajaxService.js'
import param from '@/param/param.js'
import utilsServices from '@/services/utilsServices.js'

export default {
  name: 'Mail_Admin',

  components: {SidebarAdmin},
  data () {
    return {
      mail :{
        to_address: '',
        subject: '',
        content_mail: '',

        id_gestionnaire : ''
      },
      listeRes:[],
      alertMessage : '',

    }
  },
  methods: {
    sendMail () {
      let mail = utilsServices.getFormData(this.mail);

      this.alertMessage = param.messages.sending;
      ajaxService.postAPI("sendMailGest", mail).then(response => this.alertMessage = param.messages.success + response).catch(error => this.alertMessage = param.messages.problem + error);
    },

    setContacts(){
      ajaxService.getAllApi("reservations").then(result=> this.listeRes = result).catch(error => console.log(error));
    }
  },
  mounted () {
    this.setContacts();
    this.mail.id_gestionnaire = this.$store.state.user.user.id_univ;
  }
}
</script>

<style scoped>

</style>
ErrorException: Trying to get property 'email' of non-object in /var/www/https/vendor/laravel/framework/src/Illuminate/Mail/Mailable.php:612
Stack trace:
#0 /var/www/https/vendor/laravel/framework/src/Illuminate/Mail/Mailable.php(612): Illuminate\Foundation\Bootstrap\HandleExceptions->handleError(8, 'Trying to get p...', '/var/www/https/...', 612, Array)
#1 /var/www/https/vendor/laravel/framework/src/Illuminate/Mail/Mailable.php(484): Illuminate\Mail\Mailable->setAddress(NULL, NULL, 'from')
#2 /var/www/https/app/Mail/Personnalise.php(38): Illuminate\Mail\Mailable->from(NULL)
#3 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(36): App\Mail\Personnalise->build()
#4 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/Util.php(37): Illuminate\Container\BoundMethod::Illuminate\Container\{closure}()
#5 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(93): Illuminate\Container\Util::unwrapIfClosure(Object(Closure))
#6 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(37): Illuminate\Container\BoundMethod::callBoundMethod(Object(Illuminate\Foundation\Application), Array, Object(Closure))
#7 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/Container.php(596): Illuminate\Container\BoundMethod::call(Object(Illuminate\Foundation\Application), Array, Array, NULL)
#8 /var/www/https/vendor/laravel/framework/src/Illuminate/Mail/Mailable.php(165): Illuminate\Container\Container->call(Array)
#9 /var/www/https/vendor/laravel/framework/src/Illuminate/Support/Traits/Localizable.php(19): Illuminate\Mail\Mailable->Illuminate\Mail\{closure}()
#10 /var/www/https/vendor/laravel/framework/src/Illuminate/Mail/Mailable.php(178): Illuminate\Mail\Mailable->withLocale(NULL, Object(Closure))
#11 /var/www/https/vendor/laravel/framework/src/Illuminate/Mail/Mailer.php(304): Illuminate\Mail\Mailable->send(Object(Illuminate\Mail\Mailer))
#12 /var/www/https/vendor/laravel/framework/src/Illuminate/Mail/Mailer.php(258): Illuminate\Mail\Mailer->sendMailable(Object(App\Mail\Personnalise))
#13 /var/www/https/vendor/laravel/framework/src/Illuminate/Mail/PendingMail.php(122): Illuminate\Mail\Mailer->send(Object(App\Mail\Personnalise))
#14 /var/www/https/app/Jobs/SendMail.php(41): Illuminate\Mail\PendingMail->send(Object(App\Mail\Personnalise))
#15 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(36): App\Jobs\SendMail->handle()
#16 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/Util.php(37): Illuminate\Container\BoundMethod::Illuminate\Container\{closure}()
#17 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(93): Illuminate\Container\Util::unwrapIfClosure(Object(Closure))
#18 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(37): Illuminate\Container\BoundMethod::callBoundMethod(Object(Illuminate\Foundation\Application), Array, Object(Closure))
#19 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/Container.php(596): Illuminate\Container\BoundMethod::call(Object(Illuminate\Foundation\Application), Array, Array, NULL)
#20 /var/www/https/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(94): Illuminate\Container\Container->call(Array)
#21 /var/www/https/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(128): Illuminate\Bus\Dispatcher->Illuminate\Bus\{closure}(Object(App\Jobs\SendMail))
#22 /var/www/https/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(103): Illuminate\Pipeline\Pipeline->Illuminate\Pipeline\{closure}(Object(App\Jobs\SendMail))
#23 /var/www/https/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(98): Illuminate\Pipeline\Pipeline->then(Object(Closure))
#24 /var/www/https/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(83): Illuminate\Bus\Dispatcher->dispatchNow(Object(App\Jobs\SendMail), false)
#25 /var/www/https/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(128): Illuminate\Queue\CallQueuedHandler->Illuminate\Queue\{closure}(Object(App\Jobs\SendMail))
#26 /var/www/https/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(103): Illuminate\Pipeline\Pipeline->Illuminate\Pipeline\{closure}(Object(App\Jobs\SendMail))
#27 /var/www/https/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(85): Illuminate\Pipeline\Pipeline->then(Object(Closure))
#28 /var/www/https/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(59): Illuminate\Queue\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\Queue\Jobs\DatabaseJob), Object(App\Jobs\SendMail))
#29 /var/www/https/vendor/laravel/framework/src/Illuminate/Queue/Jobs/Job.php(98): Illuminate\Queue\CallQueuedHandler->call(Object(Illuminate\Queue\Jobs\DatabaseJob), Array)
#30 /var/www/https/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(356): Illuminate\Queue\Jobs\Job->fire()
#31 /var/www/https/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(306): Illuminate\Queue\Worker->process('database', Object(Illuminate\Queue\Jobs\DatabaseJob), Object(Illuminate\Queue\WorkerOptions))
#32 /var/www/https/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(265): Illuminate\Queue\Worker->runJob(Object(Illuminate\Queue\Jobs\DatabaseJob), 'database', Object(Illuminate\Queue\WorkerOptions))
#33 /var/www/https/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(112): Illuminate\Queue\Worker->runNextJob('database', 'default', Object(Illuminate\Queue\WorkerOptions))
#34 /var/www/https/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(96): Illuminate\Queue\Console\WorkCommand->runWorker('database', 'default')
#35 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(36): Illuminate\Queue\Console\WorkCommand->handle()
#36 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/Util.php(37): Illuminate\Container\BoundMethod::Illuminate\Container\{closure}()
#37 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(93): Illuminate\Container\Util::unwrapIfClosure(Object(Closure))
#38 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(37): Illuminate\Container\BoundMethod::callBoundMethod(Object(Illuminate\Foundation\Application), Array, Object(Closure))
#39 /var/www/https/vendor/laravel/framework/src/Illuminate/Container/Container.php(596): Illuminate\Container\BoundMethod::call(Object(Illuminate\Foundation\Application), Array, Array, NULL)
#40 /var/www/https/vendor/laravel/framework/src/Illuminate/Console/Command.php(134): Illuminate\Container\Container->call(Array)
#41 /var/www/https/vendor/symfony/console/Command/Command.php(255): Illuminate\Console\Command->execute(Object(Symfony\Component\Console\Input\ArgvInput), Object(Illuminate\Console\OutputStyle))
#42 /var/www/https/vendor/laravel/framework/src/Illuminate/Console/Command.php(121): Symfony\Component\Console\Command\Command->run(Object(Symfony\Component\Console\Input\ArgvInput), Object(Illuminate\Console\OutputStyle))
#43 /var/www/https/vendor/symfony/console/Application.php(971): Illuminate\Console\Command->run(Object(Symfony\Component\Console\Input\ArgvInput), Object(Symfony\Component\Console\Output\ConsoleOutput))
#44 /var/www/https/vendor/symfony/console/Application.php(290): Symfony\Component\Console\Application->doRunCommand(Object(Illuminate\Queue\Console\WorkCommand), Object(Symfony\Component\Console\Input\ArgvInput), Object(Symfony\Component\Console\Output\ConsoleOutput))
#45 /var/www/https/vendor/symfony/console/Application.php(166): Symfony\Component\Console\Application->doRun(Object(Symfony\Component\Console\Input\ArgvInput), Object(Symfony\Component\Console\Output\ConsoleOutput))
#46 /var/www/https/vendor/laravel/framework/src/Illuminate/Console/Application.php(93): Symfony\Component\Console\Application->run(Object(Symfony\Component\Console\Input\ArgvInput), Object(Symfony\Component\Console\Output\ConsoleOutput))
#47 /var/www/https/vendor/laravel/framework/src/Illuminate/Foundation/Console/Kernel.php(129): Illuminate\Console\Application->run(Object(Symfony\Component\Console\Input\ArgvInput), Object(Symfony\Component\Console\Output\ConsoleOutput))
#48 /var/www/https/artisan(37): Illuminate\Foundation\Console\Kernel->handle(Object(Symfony\Component\Console\Input\ArgvInput), Object(Symfony\Component\Console\Output\ConsoleOutput))
#49 {main}
