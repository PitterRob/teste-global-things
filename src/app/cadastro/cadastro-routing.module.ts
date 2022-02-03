import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { CadastroHeroiComponent } from './cadastro-heroi/cadastro-heroi.component';
import { CadastroPageComponent } from './cadastro-page/cadastro-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CadastroPageComponent,
      },
      {
        path: 'heroi',
        component: CadastroHeroiComponent,
      },
      {
        path: 'categoria',
        component: CadastroCategoriaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroRoutingModule {}
