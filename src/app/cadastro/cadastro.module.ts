import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroPageComponent } from './cadastro-page/cadastro-page.component';
import { CadastroHeroiComponent } from './cadastro-heroi/cadastro-heroi.component';
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';

@NgModule({
  declarations: [
    CadastroPageComponent,
    CadastroHeroiComponent,
    CadastroCategoriaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CadastroRoutingModule,
  ],
})
export class CadastroModule {}
