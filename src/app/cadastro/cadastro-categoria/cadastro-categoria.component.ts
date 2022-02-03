/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatabaseService } from 'src/shared/database.service';
import { LoadingService } from 'src/shared/loading.service';
import { NetworkService } from 'src/shared/network.service';
import { CadastroService } from '../cadastro.service';
import { Category } from '../interfaces/cadastro.dto';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.scss'],
})
export class CadastroCategoriaComponent implements OnInit, OnDestroy {
  public formulario: FormGroup;
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
  }
  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  private getNovoFormulario(): FormGroup {
    return this.formBuilder.group({
      Id: [null],
      Name: [null, [Validators.required]],
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
          .salvarCategoria(this.getCategoriaDto())
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
                message: 'Categoria salva com sucesso !',
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
        this.db.insertCategoria(this.getCategoriaDto());
        this.formulario.reset();
      }
    }
  }

  private getCategoriaDto(): Category {
    const dto: Category = {} as Category;

    const dados = this.formulario.getRawValue();
    dto.Name = dados.Name;
    dto.Id = null;

    return dto;
  }
}
