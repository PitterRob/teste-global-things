/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatabaseService } from 'src/shared/database.service';
import { LoadingService } from 'src/shared/loading.service';
import { NetworkService } from 'src/shared/network.service';
import { CadastroService } from '../cadastro.service';
import { Category, Hero } from '../interfaces/cadastro.dto';

@Component({
  selector: 'app-cadastro-heroi',
  templateUrl: './cadastro-heroi.component.html',
  styleUrls: ['./cadastro-heroi.component.scss'],
})
export class CadastroHeroiComponent implements OnInit {
  public formulario: FormGroup;
  public categorias: Category[] = [];
  private subscription: Subscription;
  private conection: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public cadastroService: CadastroService,
    public loading: LoadingService,
    public db: DatabaseService,
    public netWorking: NetworkService
  ) {}

  ngOnInit() {
    this.formulario = this.getNovoFormulario();

    this.subscription = this.netWorking.networkStatus.subscribe((res) => {
      this.conection = res;
    });
    this.loading.present();
    this.cadastroService
      .listarCategoria()
      .pipe(
        catchError(async (err) => {
          const toast = await this.toastCtrl.create({
            message: err.message,
            duration: 4000,
            position: 'middle',
            color: 'danger',
          });
          toast.present();
          this.loading.dismiss();
          throw err;
        })
      )
      .subscribe((res) => {
        this.categorias = res;
        this.loading.dismiss();
      });
  }

  private getNovoFormulario(): FormGroup {
    return this.formBuilder.group({
      Id: [null],
      Name: [null, [Validators.required]],
      CategoryId: [null, [Validators.required]],
      Active: [true, [Validators.required]],
    });
  }

  public async salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      const toast = await this.toastCtrl.create({
        message: 'Preencher todos os campos obrigatórios',
        duration: 4000,
        icon: 'Warning',
        position: 'middle',
        color: 'danger',
      });
      toast.present();
    } else {
      if (this.conection) {
        this.loading.present();
        this.cadastroService
          .salvarHeroi(this.getHeroDto())
          .pipe(
            catchError(async (err) => {
              const toast = await this.toastCtrl.create({
                message: err.message,
                duration: 4000,
                position: 'middle',
                color: 'danger',
              });
              toast.present();
              this.loading.dismiss();
              throw err;
            })
          )
          .subscribe(async (resp) => {
            if (resp) {
              this.loading.dismiss();
              const toast = await this.toastCtrl.create({
                message: 'Herói salvo com sucesso !',
                duration: 4000,
                position: 'middle',
                color: 'success',
              });
              toast.present();
              this.formulario.reset();
            } else {
              this.loading.dismiss();
            }
          });
      } else {
        this.db.insertHero(this.getHeroDto());
        this.formulario.reset();
      }
    }
  }

  private getHeroDto(): Hero {
    const dto: Hero = {} as Hero;
    const dados = this.formulario.getRawValue();
    dto.Name = dados.Name;
    dto.Active = dados.Active;
    dto.CategoryId = parseInt(dados.CategoryId, 10);
    dto.Id = null;

    return dto;
  }
}
