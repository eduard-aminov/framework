import { Module } from '~/decorators/module';
import { AppComponent } from '~/components/app/app.component';
import { LogService } from '~/services/log';
import { HeaderComponent } from '~/components/header.component';
import { FooterComponent } from '~/components/footer.component';

@Module({
  declarations: [AppComponent, HeaderComponent, FooterComponent]
  // providers: [LogService]
})
export class AppModule {}
