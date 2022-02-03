import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/shared/loading.service';
import { CadastroService } from '../cadastro/cadastro.service';
import { Category, Hero } from '../cadastro/interfaces/cadastro.dto';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public herois: Hero[] = [];
  public categorias: Category[] = [];

  constructor(
    public cadastroService: CadastroService,
    public loading: LoadingService
  ) {}

  ngOnInit() {
    this.cadastroService
      .listarCategoria()
      .pipe()
      .subscribe((res) => {
        this.categorias = res;
      });

    this.cadastroService
      .listarHerois()
      .pipe()
      .subscribe((res) => {
        this.herois = res;
      });
  }
  compareFn(e1: Category, e2: Category): boolean {
    return e1 && e2 ? e1.Id === e2.Id : e1 === e2;
  }
}
